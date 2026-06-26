# Docs Cleanup List (pantheon-ops, as of 2026-05-11)

Concrete expected outcome when this skill runs against `pantheon-ops`. Re-verify with a fresh scan at execution time, as drift may have changed.

---

## Category P (Pseudo - identical, safe to delete)

These files are byte-identical between base and ops, and shouldn't exist in ops per WORKSPACE_INHERITANCE.md.

To enumerate at runtime:
```bash
diff -rq pantheon-base/docs/ pantheon-ops/docs/ 2>/dev/null \
  | grep -v "^Files\|^Only in" | wc -l
```

As of 2026-05-11, the diff output explicitly listed **18 differing files** (Category D below) and **2 ops-only** legitimate business files. The rest (~17 files) are byte-identical and constitute Category P.

Expected file count when listing identical pairs:
- `docs/contracts/`: ~2 files (CONTRACT_TEMPLATE, DOCUMENT_GOVERNANCE_CONTRACT)
- `docs/designs/`: ~26 files (the ones NOT in the differing list)
- `docs/acceptances/`: ~7 files (the ones NOT in the differing list)
- Plus archive/, assessments/, remediations/ subdirs if present

All Category P files: **delete from ops** without per-file confirmation; category-level confirmation only.

---

## Category D (Drifted - per-file decision required)

As of 2026-05-11 scan:

| # | File | Action recommended |
|---|---|---|
| D1 | `docs/README.md` | rewrite as inheritance pointer (Stage 5) |
| D2 | `docs/acceptances/ACCEPTANCE_CHECKLIST.md` | diff inspection → likely backport to base |
| D3 | `docs/acceptances/BUSINESS_MODULE_ACCEPTANCE_MATRIX.md` | diff inspection → backport if generic; this is about HOW to accept business modules, generic by nature |
| D4 | `docs/contracts/DOCUMENT_METADATA_AND_STATUS.md` | foundation contract → must backport or accept base version |
| D5 | `docs/contracts/PLATFORM_CONTRACT.md` | foundation contract → high risk; require user inspection |
| D6 | `docs/contracts/SYSTEM_AUTH_CONTRACT.md` | foundation contract → high risk; require user inspection |
| D7 | `docs/contracts/SYSTEM_CONFIG_CONTRACT.md` | foundation contract → high risk |
| D8 | `docs/contracts/SYSTEM_IAM_CONTRACT.md` | foundation contract → high risk |
| D9 | `docs/contracts/SYSTEM_ORG_CONTRACT.md` | foundation contract → high risk |
| D10 | `docs/designs/BACKEND.md` | foundation design → diff inspection |
| D11 | `docs/designs/BUSINESS_DICT_INTEGRATION_GUIDE.md` | named BUSINESS_* but content is generic guide → likely move to non-BUSINESS prefix in base |
| D12 | `docs/designs/DATA_PERMISSION_HOOK.md` | foundation design → diff inspection |
| D13 | `docs/designs/FRONTEND.md` | foundation design → diff inspection |
| D14 | `docs/designs/NAVIGATION_IA_STRATEGY.md` | foundation design → diff inspection (Phase B will expand this anyway) |
| D15 | `docs/designs/PERMISSION_MODEL.md` | foundation design → diff inspection |

For each: present the diff to user, ask:
- (a) base version is correct → delete ops version
- (b) ops version has improvements → backport to base, then delete ops version
- (c) ops has business-specific addition → carve out a new business-domain doc and delete the generic doc from ops

### Diff inspection commands

```bash
for f in \
  docs/acceptances/ACCEPTANCE_CHECKLIST.md \
  docs/acceptances/BUSINESS_MODULE_ACCEPTANCE_MATRIX.md \
  docs/contracts/DOCUMENT_METADATA_AND_STATUS.md \
  docs/contracts/PLATFORM_CONTRACT.md \
  docs/contracts/SYSTEM_AUTH_CONTRACT.md \
  docs/contracts/SYSTEM_CONFIG_CONTRACT.md \
  docs/contracts/SYSTEM_IAM_CONTRACT.md \
  docs/contracts/SYSTEM_ORG_CONTRACT.md \
  docs/designs/BACKEND.md \
  docs/designs/BUSINESS_DICT_INTEGRATION_GUIDE.md \
  docs/designs/DATA_PERMISSION_HOOK.md \
  docs/designs/FRONTEND.md \
  docs/designs/NAVIGATION_IA_STRATEGY.md \
  docs/designs/PERMISSION_MODEL.md
do
  echo "=== $f ==="
  diff "pantheon-base/$f" "pantheon-ops/$f" | head -30
  echo
done
```

---

## Category B (Business-owned - keep)

As of 2026-05-11:

- `docs/PROJECT_INHERITANCE.md`
- `docs/designs/BUSINESS_CMDB_MODULE_DESIGN.md`
- `docs/designs/BUSINESS_DEPLOY_MODULE_DESIGN.md`

These stay. Future BUSINESS_*_MODULE_DESIGN.md additions also stay.

---

## Final State Target

After this skill runs, `pantheon-ops/docs/` should contain:

```
pantheon-ops/docs/
├── README.md                                 # rewritten as inheritance pointer
├── PROJECT_INHERITANCE.md                    # kept
└── designs/
    ├── BUSINESS_CMDB_MODULE_DESIGN.md        # kept
    └── BUSINESS_DEPLOY_MODULE_DESIGN.md      # kept
```

Total: 4 files. Down from ~50 currently.

`diff -rq pantheon-base/docs/ pantheon-ops/docs/` should output:
```
Only in pantheon-ops/docs/: PROJECT_INHERITANCE.md
Files .../docs/README.md and .../docs/README.md differ          # by design (inheritance pointer)
Only in pantheon-ops/docs/designs: BUSINESS_CMDB_MODULE_DESIGN.md
Only in pantheon-ops/docs/designs: BUSINESS_DEPLOY_MODULE_DESIGN.md
```

That's the success criterion.

---

## Why 6 Contract Files Are High Risk

`*_CONTRACT.md` documents define API surface and semantic contracts. If ops drifted these:
- ops might have ADDED endpoints or schema that ops's code uses but base doesn't know about
- ops might have CHANGED contract semantics in ways that affect business code on ops
- ops might have FORKED type definitions

Forcefully accepting base version could silently break ops's business code that relies on ops's contract variant.

Halt at Stage 2 for every contract file and present a full diff to user. Recommend:
- ops's additions → backport to base (most contracts are platform-level, not business-level)
- ops's modifications → discuss whether the change is generally correct
- ops's deletions → very suspicious; deep investigation before discarding
