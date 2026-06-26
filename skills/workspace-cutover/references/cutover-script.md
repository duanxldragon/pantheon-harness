# Cutover Script Reference

Canonical commands and edge-case notes for PR-2 execution.

---

## 1. Workspace File

### `pantheon-platform/go.work`

```
go 1.25.9

use ./pantheon-base
use ./pantheon-ops
```

Notes:
- Use exact Go version from `pantheon-base/go.mod` and `pantheon-ops/go.mod` (they should match; if not, halt and ask user which version to standardize on)
- Do NOT add `toolchain` directive unless both repos already require it

---

## 2. `pantheon-ops/go.mod` Patch

```diff
 module pantheon-ops

 go 1.25.9

 require (
+    pantheon-platform v0.0.0
     github.com/casbin/casbin/v2 v2.135.0
     ...
 )

+replace pantheon-platform => ../pantheon-base
```

The pseudo-version `v0.0.0` is the convention for `replace` to a local path. After `go work sync`, the actual resolution comes from the replaced path.

---

## 3. Deletion Order

Delete in this order to minimize intermediate breakage windows:

### Phase A: Test files (always safe to delete)

```bash
cd pantheon-ops
git rm \
  backend/modules/system/iam/role/role_service_test.go \
  backend/modules/system/iam/permission/permission_service_test.go
```

Plus every `*_test.go` listed in DRIFT_AUDIT.md §3 Category A (~25 test files).

### Phase B: 6 IAM override files

```bash
git rm \
  backend/modules/system/iam/role/role_service.go \
  backend/modules/system/iam/permission/permission_service.go \
  backend/modules/system/iam/permission/permission_workbench.go \
  backend/modules/system/iam/menu/component_registry.go
```

Note: the 2 test files for role_service and permission_service were already removed in Phase A.

### Phase C: Non-test Category A files

By directory, alphabetical:

```bash
# Middleware (10 files, cors_middleware.go is NOT in differing list — keep)
git rm backend/internal/middleware/{casbin,csrf,data_scope,jwt,operation_log,request_context,secure_action}_middleware.go

# Scaffold (2 non-test files; if scaffold has *_test.go also delete those)
git rm backend/internal/scaffold/{engine,workspace}.go

# Auth (full module wholesale; 8 files)
git rm backend/modules/auth/{auth_dto,auth_handler,auth_service,mfa_crypto,module}.go

# Dashboard (full module wholesale; 4 files)
git rm backend/modules/dashboard/{dashboard_handler,dashboard_service,module}.go

# System/audit
git rm backend/modules/system/audit/{audit_filters,audit_handler,audit_service}.go

# System/config/dict (full subdir)
git rm backend/modules/system/config/dict/{dict_dto,dict_handler,dict_model,dict_service}.go

# System/config/setting (full subdir)
git rm backend/modules/system/config/setting/{setting_audit_model,setting_crypto,setting_dto,setting_handler,setting_model,setting_service}.go

# System/dynamicmodule (7 non-test files; keep dynamic_module_service_test.go as 4-line drift)
git rm backend/modules/system/dynamicmodule/{dynamic_module_handler,dynamic_module_lifecycle,dynamic_module_registry,dynamic_module_service,dynamic_module_summary,dynamic_module_sync,module}.go

# System/generator (3 files)
git rm backend/modules/system/generator/{generator_crypto,generator_handler,module}.go

# System/i18n (2 non-test files)
git rm backend/modules/system/i18n/{i18n_handler,i18n_service}.go

# System/iam/menu (5 non-test files, component_registry.go already removed in Phase B)
git rm backend/modules/system/iam/menu/{menu_dto,menu_handler,menu_model,menu_service}.go

# System/iam/permission (2 non-test files, service/workbench already removed in Phase B)
git rm backend/modules/system/iam/permission/{permission_data_scope,permission_handler}.go

# System/iam/role (5 non-test files, service already removed in Phase B)
git rm backend/modules/system/iam/role/{role_dto,role_handler,role_menu_model,role_model,role_permission_model}.go

# System/iam/user (5 non-test files)
git rm backend/modules/system/iam/user/{user_handler,user_preferences,user_role_model,user_service}.go

# System/org/dept (4 non-test files)
git rm backend/modules/system/org/dept/{dept_dto,dept_handler,dept_model,dept_service}.go

# System/org/post (4 non-test files)
git rm backend/modules/system/org/post/{post_dto,post_handler,post_model,post_service}.go

# System root (3 files)
git rm backend/modules/system/{refresh_sync.go,system.go}

# Business retired tests
git rm backend/modules/business/retired_modules_test.go

# Platform (only the test file; health.go stays as 4-line drift)
git rm backend/modules/platform/health_test.go

# Pkg (5 non-test files)
git rm backend/pkg/common/location.go
git rm backend/pkg/contracts/module_test.go
git rm backend/pkg/database/{redis,scope}.go
```

### Phase D: Empty directory cleanup

```bash
find backend -type d -empty -print     # preview first
find backend -type d -empty -delete    # then delete
```

Be cautious: verify no hidden files (`.gitkeep`, `.DS_Store`, etc.) remain. Empty directories should NOT be committed by git anyway, but a manual rm is cleaner.

---

## 4. Import Rewrite

### The sed command

```bash
cd pantheon-ops
find backend -name "*.go" -exec sed -i \
  's|pantheon-ops/backend/\(modules/auth\|modules/dashboard\|modules/system\|modules/platform\|pkg/\(common\|database\|contracts\|cache\|config\|impexp\|testmysql\|authsession\|capability\|upload\)\|internal/\(middleware\|scaffold\)\)|pantheon-platform/backend/\1|g' {} \;
```

### What it rewrites

`pantheon-ops/backend/X` → `pantheon-platform/backend/X` for these X values:
- `modules/auth/*`
- `modules/dashboard/*`
- `modules/system/*` (the WHOLE system tree, including base-owned `modules/system/iam/*` after the 6 overrides are gone)
- `modules/platform/*`
- `pkg/common/*`, `pkg/database/*`, `pkg/contracts/*`, `pkg/cache/*`, `pkg/config/*`, `pkg/impexp/*`, `pkg/testmysql/*`, `pkg/authsession/*`, `pkg/capability/*`, `pkg/upload/*`
- `internal/middleware/*`
- `internal/scaffold/*`

### What it does NOT rewrite (must stay ops-owned)

- `modules/business/*` — ops's own code
- Anything inside `pantheon-base/` — that repo is not touched

### Verification commands

```bash
# Should output nothing (no ops-pointing system/auth/etc. imports remain in business code)
grep -rn "pantheon-ops/backend/modules/auth\|pantheon-ops/backend/modules/system\|pantheon-ops/backend/modules/platform\|pantheon-ops/backend/internal\|pantheon-ops/backend/pkg/\(common\|database\|contracts\|cache\|config\)" backend/

# Should output many lines (business code now correctly imports base via platform)
grep -rn "pantheon-platform/backend" backend/modules/business/ | head -20

# Business imports of ops-owned business packages should remain unchanged
grep -rn "pantheon-ops/backend/modules/business" backend/modules/business/ | head -5
```

---

## 5. permission_policies.go Slimming

### Input (ops current state)

`pantheon-ops/backend/pkg/contracts/permission_policies.go` has a function `RequiredAPIPoliciesByPermissionKey()` with a switch covering BOTH `system:*` keys AND `business:*` keys.

### Target state after slimming

- Remove all `case "system:..."` branches (PR-1 added these to base)
- Keep only `case "business:cmdb:*"`, `case "business:deploy:*"` branches
- Rename the function to make its scope explicit:
  ```go
  package contracts

  import platformcontracts "pantheon-platform/backend/pkg/contracts"

  func BusinessPermissionPolicies() map[string][]platformcontracts.PermissionAPIPolicy {
      return map[string][]platformcontracts.PermissionAPIPolicy{
          "business:cmdb:host:list": {
              {Path: "/api/v1/business/cmdb/hosts", Method: "GET"},
          },
          // ... other business entries
      }
  }
  ```

- The struct type `PermissionAPIPolicy` is now provided by base; alias or just use the base import directly

### Why a function returning a map vs. init() registration

Both work. Using a function gives `main.go` explicit control of when registration happens (after config load, before HTTP). Init-time registration is implicit but harder to reason about during testing.

---

## 6. cmd/server/main.go Modification

### Imports section after rewrite

```go
import (
    // base via workspace
    "pantheon-platform/backend/internal/middleware"
    "pantheon-platform/backend/modules/auth"
    "pantheon-platform/backend/modules/dashboard"
    "pantheon-platform/backend/modules/platform"
    "pantheon-platform/backend/modules/system"
    "pantheon-platform/backend/modules/system/iam/menu"          // for RegisterAdditionalComponents
    "pantheon-platform/backend/pkg/common"
    "pantheon-platform/backend/pkg/database"
    platformcontracts "pantheon-platform/backend/pkg/contracts"  // for RegisterAdditionalPolicies

    // ops-owned
    "pantheon-ops/backend/modules/business"
    "pantheon-ops/backend/pkg/contracts" // business permission policies
)
```

### Registration block

Place BEFORE any route registration or HTTP listener start:

```go
// Wire business components into base's frontend-component validator
menu.RegisterAdditionalComponents(business.AllComponentKeys)  // signature per PR-1 design choice

// Wire business permission policies into base's contracts lookup
platformcontracts.RegisterAdditionalPolicies(contracts.BusinessPermissionPolicies())  // signature per PR-1 design choice
```

If PR-1 chose the **Provider** variant instead of map register, the calls look different:
```go
menu.RegisterComponentKeyProvider(business.ComponentProvider{})
platformcontracts.RegisterPolicyProvider("ops-business", contracts.BusinessPolicyProvider)
```

Read the actual PR-1 commits to determine which signature applies.

### Optional: business.AllComponentKeys

If `business.AllComponentKeys` doesn't exist yet in `pantheon-ops/backend/modules/business/`, create a small file:

```go
// pantheon-ops/backend/modules/business/registry.go
package business

var AllComponentKeys = map[string]struct{}{
    "business/cmdb/host/CmdbHostList":           {},
    "business/cmdb/host/CmdbHostDetail":         {},
    "business/cmdb/group/CmdbGroupList":         {},
    "business/cmdb/label/CmdbLabelSchemaList":   {},
    "business/deploy/package/DeployPackageList": {},
    "business/deploy/task/DeployTaskList":       {},
    "business/deploy/task/DeployTaskDetail":     {},
}
```

This is the single source of truth for ops's frontend component keys.

---

## 7. Validation Commands

Run from `pantheon-platform/` workspace root:

```bash
# Workspace sync (must succeed before anything else)
go work sync

# Build both repos
(cd pantheon-base && go build ./...)
(cd pantheon-ops && go build ./...)

# Test both repos
(cd pantheon-base && go test ./backend/...)
(cd pantheon-ops && go test ./backend/...)

# Verify base is untouched
(cd pantheon-base && git status)    # must show clean working tree

# Verify ops branch state
(cd pantheon-ops && git status)     # must show modifications staged or committed on workspace-cutover branch
(cd pantheon-ops && git log --oneline -10)
```

All must succeed before Stage 7 commit.

---

## 8. Edge Cases

### 8.1 If `pkg/cache` and `pkg/config` were missing from ops

After workspace setup, base's `pkg/cache` and `pkg/config` become resolvable via the platform module. Any ops code that needs them imports `pantheon-platform/backend/pkg/cache`. No ops changes needed.

### 8.2 If a Category A file has uncommitted local changes

Should not happen if preconditions are met (clean git). If it does happen mid-skill, halt and ask. Local uncommitted changes to files about to be deleted indicate the user is mid-work; do not silently lose them.

### 8.3 If PR-1 chose a variadic API and main.go can't pass a single map

Build will fail at Stage 6 with a type-mismatch error. Fix by either:
- Restructuring `business.AllComponentKeys` to a slice
- Or calling `menu.RegisterAdditionalComponents(keys...)` with map iteration

Both are simple fixes; halt at the failure and propose the fix to user.

### 8.4 If `pantheon-base` had unrelated commits between PR-1 merge and PR-2 start

Those commits could introduce new files in base that ops's code accidentally collides with. Run a quick `triage-base-drift` snapshot at Stage 0 to catch this.

### 8.5 Hidden generated files

If `backend/modules/system/generator/` contained any `generated_*.go` not in Category A, they should be preserved. Audit the deletion list against actual file system state before running `git rm`.
