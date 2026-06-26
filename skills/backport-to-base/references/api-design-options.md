# Extension API Design Options

Two extension API surfaces must be added to `pantheon-base` so that derived business repos can register additional entries without forking the base files. The user picks one variant per API before any code is written.

---

## 1. `menu.RegisterAdditionalComponents`

**Purpose**: let business repos register additional frontend component-key strings into the validation set currently hard-coded in `backend/modules/system/iam/menu/component_registry.go`.

**Current state** (base):
```go
var validComponentKeys = map[string]struct{}{
    "dashboard": {},
    "auth/SecurityCenter": {},
    "auth/LoginLogList": {},
    // ... 17 more entries
}
```

**Ops's current override** (in ops's component_registry.go): same map literal but with 7 additional `business/cmdb/*` and `business/deploy/*` entries hard-coded.

**What we want**: base keeps its 17 entries; ops registers its 7 entries at startup via an API instead of forking the file.

### Candidate A — Variadic register, package-level mutex

```go
// In base
var (
    componentKeyMu  sync.RWMutex
    additionalKeys  = make(map[string]struct{})
)

func RegisterAdditionalComponents(keys ...string) {
    componentKeyMu.Lock()
    defer componentKeyMu.Unlock()
    for _, k := range keys {
        additionalKeys[k] = struct{}{}
    }
}

func IsValidComponentKey(key string) bool {
    if _, ok := validComponentKeys[key]; ok {
        return true
    }
    componentKeyMu.RLock()
    defer componentKeyMu.RUnlock()
    _, ok := additionalKeys[key]
    return ok
}
```

**Caller pattern** (ops side, in `cmd/server/main.go` or business module init):
```go
menu.RegisterAdditionalComponents(
    "business/cmdb/host/CmdbHostList",
    "business/cmdb/host/CmdbHostDetail",
    // ... 5 more
)
```

| Pro | Con |
|---|---|
| Simplest signature | Caller must pass each key individually |
| Standard Go idiom | Repeated calls overwrite nothing (additive only) |
| Easy to test | Cannot remove a key once added |
| Thread-safe via RWMutex | Init order matters; calls must happen before any HTTP request |

### Candidate B — Map register, batch atomic

```go
func RegisterAdditionalComponents(keys map[string]struct{}) {
    componentKeyMu.Lock()
    defer componentKeyMu.Unlock()
    for k := range keys {
        additionalKeys[k] = struct{}{}
    }
}
```

**Caller pattern**:
```go
menu.RegisterAdditionalComponents(business.AllComponentKeys)
// where business.AllComponentKeys is a map declared in pantheon-ops
```

| Pro | Con |
|---|---|
| Batch registration is atomic | Slightly more boilerplate (caller must build the map) |
| Caller can hold the source of truth as a typed map | Same overwrite semantics as A |
| Encourages business repos to centralize their key list |   |

### Candidate C — Provider pattern, lazy

```go
type ComponentKeyProvider interface {
    AdditionalComponentKeys() []string
}

var providers []ComponentKeyProvider

func RegisterComponentKeyProvider(p ComponentKeyProvider) {
    componentKeyMu.Lock()
    providers = append(providers, p)
    componentKeyMu.Unlock()
}

func IsValidComponentKey(key string) bool {
    if _, ok := validComponentKeys[key]; ok {
        return true
    }
    componentKeyMu.RLock()
    defer componentKeyMu.RUnlock()
    for _, p := range providers {
        for _, k := range p.AdditionalComponentKeys() {
            if k == key {
                return true
            }
        }
    }
    return false
}
```

**Caller pattern**: business repo defines a struct implementing the interface and registers it at startup. Provider can return dynamic data (e.g. from DB).

| Pro | Con |
|---|---|
| Most flexible — providers can be dynamic | Linear lookup cost; needs memoization for large sets |
| No "frozen at startup" assumption | Interface dance is heavier for a simple use case |
| Easy to mock for testing |   |

### Recommendation matrix

| Concern | A | B | C |
|---|---|---|---|
| Solo-dev simplicity | ✅ best | 🟡 good | ❌ heavy |
| Aligns with how ops already structures the data | ❌ | ✅ best | 🟡 |
| Future dynamic registration (DB-driven) | ❌ | ❌ | ✅ best |
| Test ergonomics | 🟡 | 🟡 | ✅ best |
| Performance (constant-time lookup) | ✅ | ✅ | ❌ unless memoized |

**My default suggestion**: **Candidate B** (map register). Matches how ops already structures its component key list, atomic, simple. Upgrade to C only if/when business repos need dynamic registration.

---

## 2. `contracts.RegisterAdditionalPolicies`

**Purpose**: let business repos register additional permission-key → required-API mappings, without forking the giant switch statement currently in `backend/modules/system/iam/permission/permission_workbench.go` (or the new `pkg/contracts/permission_policies.go`).

**Current state** (base): hardcoded `switch permissionKey { case "system:security-event:list": ... }` returning `[]permissionRequiredAPIPolicy`.

**Ops's current override**: extracted the switch into `pkg/contracts/permission_policies.go`, added `business:cmdb:*` and `business:deploy:*` cases.

**What we want**: base owns the `system:*` cases in `pkg/contracts/permission_policies.go`; ops registers its `business:*` cases via API.

### Candidate A — Map register, mutex-guarded

```go
// In base: pkg/contracts/permission_policies.go
type PermissionAPIPolicy struct {
    Path   string
    Method string
}

var (
    additionalMu       sync.RWMutex
    additionalPolicies = make(map[string][]PermissionAPIPolicy)
)

func RegisterAdditionalPolicies(policies map[string][]PermissionAPIPolicy) {
    additionalMu.Lock()
    defer additionalMu.Unlock()
    for k, v := range policies {
        additionalPolicies[k] = append(additionalPolicies[k], v...)
    }
}

func RequiredAPIPoliciesByPermissionKey(key string) []PermissionAPIPolicy {
    key = strings.TrimSpace(key)
    // base-level switch first
    switch key {
    case "system:security-event:list":
        return []PermissionAPIPolicy{{Path: "/api/v1/system/security-event/list", Method: "GET"}}
    // ... other system:* cases
    }
    // then check registered additions
    additionalMu.RLock()
    defer additionalMu.RUnlock()
    return additionalPolicies[key]
}
```

**Caller** (ops `cmd/server/main.go`):
```go
contracts.RegisterAdditionalPolicies(map[string][]contracts.PermissionAPIPolicy{
    "business:cmdb:host:list": {{Path: "/api/v1/business/cmdb/hosts", Method: "GET"}},
    // ...
})
```

| Pro | Con |
|---|---|
| Simple, mirrors Candidate B for components | Mixes static switch + dynamic map — two code paths |
| Append semantics (same key from multiple business modules accumulates) | Caller can't override base-level entries |
| Predictable lookup performance |   |

### Candidate B — Single unified map, no switch

Convert base's `system:*` entries into the same map storage; both base and ops register at init time.

```go
var (
    policiesMu       sync.RWMutex
    allPolicies      = make(map[string][]PermissionAPIPolicy)
)

// In base init():
func init() {
    RegisterAdditionalPolicies(map[string][]PermissionAPIPolicy{
        "system:security-event:list": {{Path: "...", Method: "GET"}},
        // ... all base-level entries
    })
}

func RequiredAPIPoliciesByPermissionKey(key string) []PermissionAPIPolicy {
    policiesMu.RLock()
    defer policiesMu.RUnlock()
    return allPolicies[strings.TrimSpace(key)]
}
```

| Pro | Con |
|---|---|
| One code path; easier to reason about | Base uses its own extension API on itself (slightly cyclic-feeling) |
| Tests can compare base entries to a known map | Init order matters slightly more (but still deterministic in Go) |
| Append semantics work naturally |   |

### Candidate C — Provider pattern

```go
type PolicyProvider interface {
    PoliciesForKey(key string) []PermissionAPIPolicy
}

var providers []PolicyProvider
```

Same shape as Component Candidate C.

| Pro | Con |
|---|---|
| Most flexible — could read from DB or config | Overkill for a static lookup table |
| Easy to mock | Linear lookup unless memoized |

### Recommendation matrix

| Concern | A | B | C |
|---|---|---|---|
| Code path simplicity | 🟡 (two paths) | ✅ (one path) | ❌ (interface) |
| Performance | ✅ (map after switch miss) | ✅ (single map) | ❌ |
| Base entries are obvious in source | ✅ (switch is grep-able) | 🟡 (in init()) | 🟡 |
| Plays well with future hot-reload | ❌ | 🟡 | ✅ |

**My default suggestion**: **Candidate B** (unified map). Single code path is the long-term-correct choice; base just happens to be the first registrant. Avoids the "two ways to do it" anti-pattern.

---

## How To Present These To The User

When this Skill runs Stage 1, present the choices like:

```
Pick a design for menu.RegisterAdditionalComponents (3 options):
  A. Variadic register — simplest signature
  B. Map register — matches how ops structures its data    ← recommended
  C. Provider pattern — flexible but heavier

Pick a design for contracts.RegisterAdditionalPolicies (3 options):
  A. Map register + base switch — mixed approach
  B. Unified map (base also registers via init()) — single code path    ← recommended
  C. Provider pattern — overkill for now
```

Wait for explicit selection of one variant per API before any code is written.

If the user chooses both "B + B" (the recommendations), the resulting code is the cleanest and easiest to maintain. If the user picks differently, document the rationale in the relevant commit message so future readers understand the choice.
