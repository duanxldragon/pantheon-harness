# Base Upgrade Workflow

Use this workflow when a derived repository needs to adopt a newer `pantheon-base` version.

## 1. Pick The Target Base Version

- Prefer an explicit tag.
- If no tag exists yet, pin the target commit hash.

## 2. Review Upstream Base Changes

Read the changed files in `pantheon-base`, especially:

- `AGENTS.md`
- `DESIGN.md`
- `docs/contracts/*`
- `docs/designs/*`
- `docs/acceptances/*`

## 3. Update The Business Repository Inheritance File

In `docs/PROJECT_INHERITANCE.md`, update:

- base version
- any changed required reading docs
- any changed local business impacts

## 3.1 Enforce Base/Ops Code Sync

`pantheon-ops` is a business extension of the standard backoffice in `pantheon-base`.
The rule is:

- platform and `system/*` fixes belong in `pantheon-base`
- `pantheon-ops` may add `business/*` modules and explicit integration points
- generic drift must be reviewed for backport before it is accepted as an ops change
- pseudo-drift must not grow new ops-only edits

Run before and after every base upgrade.

If these checks are maintained in the standalone method repository, execute them from that repository against the target workspace. If the target business repository vendors the relevant check scripts locally, run the local copies there instead.

```powershell
node scripts/harness/check-inheritance-contract.mjs --strict
node scripts/harness/triage-base-drift.mjs --business pantheon-ops --json
```

Use the drift categories this way:

| Category | Meaning | Required action |
|---|---|---|
| `generic drift` | reusable platform/system change found in ops | backport to `pantheon-base` or record why not |
| `pseudo-drift` | same code after module-name normalization | do not edit locally; collapse when workspace sharing is ready |
| `business mount` | explicit business integration seam | keep only if it is the narrow mount point |
| `business-specific drift` | local product behavior | keep in ops only with business docs/evidence |
| `business-only` | ops-only business file | keep if under business scope |
| `base-only` | base file missing from ops | decide if inherited indirectly or needs upgrade |

## 4. Apply Local Adjustments

- update only the business modules affected by the base change
- keep platform and system-domain fixes in `pantheon-base` whenever possible

## 5. Re-Verify

Run the validation set that matches the touched surface:

- backend tests for touched backend modules
- frontend build and checks for touched frontend modules
- gstack browse or QA for browser-path changes

## 6. Record The Upgrade

Capture:

- previous base version
- new base version
- affected business modules
- known follow-up gaps
