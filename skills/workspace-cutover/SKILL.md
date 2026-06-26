---
name: workspace-cutover
description: Use when executing PR-2 of the drift consolidation plan in docs/DRIFT_AUDIT.md §5. Atomically enables Go workspace + replace directive, deletes 94 redundant files (88 Category A + 6 IAM overrides) from pantheon-ops, rewrites imports in remaining files, slims business contracts to business-only entries, and wires business mount points into cmd/server/main.go. Only run after PR-1 (backport-to-base) has been merged to pantheon-base.
---

# Workspace Cutover (PR-2)

This skill executes **PR-2** from `docs/DRIFT_AUDIT.md` §5. Output: pantheon-ops becomes a thin business overlay on pantheon-base via Go workspace + replace; 94 redundant files are deleted; remaining files import from base; business entries are registered at startup. All changes happen on a single branch in pantheon-ops in one atomic PR.

**This skill is destructive and large**. Run only after PR-1 is merged to pantheon-base. The intermediate states are not viable — never partial-execute.

## When To Use

- AFTER PR-1 (backport-to-base) has been merged into pantheon-base
- AFTER `triage-base-drift` has confirmed audit accuracy
- When pantheon-ops is at clean git state
- When the user is online for the multi-stage human gate flow

## Preconditions

1. PR-1 is merged to pantheon-base's main branch. Verify by:
   - `cd pantheon-base && git log --oneline -20 | grep "PR-1"` shows the 7 expected commits
   - `cd pantheon-base && git status` is clean
   - `cd pantheon-base && go build ./...` passes
2. `docs/DRIFT_AUDIT.md` is current (re-run `triage-base-drift` to confirm)
3. `pantheon-ops` git status: clean
4. `pantheon-ops` is on its main branch (or the user has explicitly chosen a different base branch)
5. The 2 extension APIs from PR-1 exist in pantheon-base:
   - `menu.RegisterAdditionalComponents` (signature per the PR-1 decision)
   - `contracts.RegisterAdditionalPolicies` (signature per the PR-1 decision)

If any precondition fails: halt and ask the user.

## Workflow

The skill has 7 stages on a single branch (`workspace-cutover` or similar). Each stage produces one commit. **No stage commits before its human gate passes**.

### Stage 0: Set Up Branch and Verify

In `pantheon-ops/`:
```bash
git checkout -b workspace-cutover
git status   # must be clean
```

Cache for later:
- Resolve `pantheon-base` HEAD commit (the merge commit of PR-1)
- Read `pantheon-ops/go.mod` to know the current require list
- Read PR-1's chosen API signatures (from the commits in pantheon-base)

### Stage 1: Add go.work and modify go.mod (HUMAN GATE)

**Create** `D:/workspace/go/pantheon-platform/go.work`:
```
go 1.25.9

use ./pantheon-base
use ./pantheon-ops
```

**Modify** `pantheon-ops/go.mod`:
- Add `require pantheon-platform v0.0.0` (or appropriate pseudo-version)
- Add `replace pantheon-platform => ../pantheon-base`

After applying, run `cd pantheon-ops && go work sync` from the workspace root. If sync fails (e.g. mismatched go versions), halt and ask.

**Test build at this stage**: `cd pantheon-ops && go build ./...` — this **WILL fail** because ops still has its own copies of base files with `pantheon-ops/...` imports. That's expected; the failure proves the diamond. Do NOT commit yet.

**Human gate**: show user the `go.work` content, `go.mod` diff, and the expected build failure. Confirm before proceeding.

Commit message (NOT YET committed at this stage; commit happens after Stage 2 in one combined commit because the intermediate state doesn't build):
```
chore(workspace): enable Go workspace + replace to share pantheon-base [PR-2]
```

### Stage 2: Delete the 94 Redundant Files (HUMAN GATE)

Delete in this exact order:

**2a. Test files first (safe, no compile dependency)**
- Delete `backend/modules/system/iam/role/role_service_test.go`
- Delete `backend/modules/system/iam/permission/permission_service_test.go`
- Delete every other `*_test.go` in the 88 Category A list

**2b. Non-test IAM override files**
- Delete `backend/modules/system/iam/role/role_service.go`
- Delete `backend/modules/system/iam/permission/permission_service.go`
- Delete `backend/modules/system/iam/permission/permission_workbench.go`
- Delete `backend/modules/system/iam/menu/component_registry.go`

**2c. Non-test Category A files**
- Delete all non-test files in the Category A list, in the order specified by `references/deletion-order.md`

Full list source: `docs/DRIFT_AUDIT.md` §3 Category A (88 files) + the 6 IAM files above = **94 files total**.

**Exclude from deletion**:
- `backend/cmd/server/main.go` — modify in Stage 5
- `backend/modules/platform/health.go` — 4-line drift, keep as override
- `backend/modules/system/dynamicmodule/dynamic_module_service_test.go` — 4-line fixture drift, keep
- `backend/modules/business/business.go` — business mount, keep
- `backend/modules/business/retired_modules.go` — history divergence, keep
- `backend/modules/business/cmdb/*`, `backend/modules/business/deploy/*` — ops business modules
- `backend/pkg/contracts/permission_policies.go` — slim in Stage 4

**Delete empty directories** after file deletion. Use `find backend -type d -empty -delete` cautiously, but verify each empty directory is actually fully empty (no hidden files).

**Test build at this stage**: still `go build` will fail until Stage 3 rewrites imports. That's fine, do not commit yet.

**Human gate**: show user the list of files about to be deleted (94 files + empty directories). Confirm.

### Stage 3: Rewrite Imports in Remaining ops Files (HUMAN GATE)

Run the import rewrite. See `references/cutover-script.md` for the canonical script.

```bash
cd pantheon-ops
find backend -name "*.go" -exec sed -i \
  's|pantheon-ops/backend/\(modules/auth\|modules/dashboard\|modules/system\|modules/platform\|pkg/\(common\|database\|contracts\|cache\|config\|impexp\|testmysql\|authsession\|capability\|upload\)\|internal/\(middleware\|scaffold\)\)|pantheon-platform/backend/\1|g' {} \;
```

**Path discrimination**:
- Paths that should be rewritten (now provided by base via workspace): `modules/auth`, `modules/dashboard`, `modules/system/*` (except business-related), `modules/platform`, `pkg/*`, `internal/middleware`, `internal/scaffold`
- Paths that should STAY as `pantheon-ops/...` (ops-owned): `modules/business/*`

After rewrite, verify by:
```bash
grep -rn "pantheon-ops/backend/modules/system" backend/modules/business/ | head -5
# These should all be empty — business code shouldn't import via the ops module name
grep -rn "pantheon-platform/backend" backend/modules/business/ | head -5
# These should show the rewritten imports
```

**Test build at this stage**: should be close to passing but may still fail because `pkg/contracts/permission_policies.go` and `cmd/server/main.go` are not yet updated.

**Human gate**: show user a sample of rewritten files (3-5) and the grep verification output. Confirm.

### Stage 4: Slim pkg/contracts/permission_policies.go (HUMAN GATE)

In `pantheon-ops/backend/pkg/contracts/permission_policies.go`:

- Remove all `system:*` entries (PR-1 added these in base)
- Keep only `business:cmdb:*`, `business:deploy:*` etc.
- Convert from a switch statement (or whatever current shape) to a `map[string][]PermissionAPIPolicy` literal
- This file is no longer a contracts implementation — it's a business data file. Consider renaming the function to `BusinessPermissionPolicies()` returning the map

Reference: see ops's current content of this file; remove ~50% of entries (the base ones).

**Test build**: should now be much closer to passing; remaining failure is `cmd/server/main.go` not registering business entries.

**Human gate**: show diff. Confirm.

### Stage 5: Update cmd/server/main.go (HUMAN GATE)

In `pantheon-ops/backend/cmd/server/main.go`:

1. Rewrite imports: change `pantheon-ops/backend/<base-paths>` to `pantheon-platform/backend/<base-paths>` (the sed from Stage 3 should have already done this; verify)
2. Add import for `pantheon-ops/backend/pkg/contracts` (ops-owned, for business policies)
3. Add import for `pantheon-platform/backend/pkg/contracts` (base, for `RegisterAdditionalPolicies`)
4. Add import for `pantheon-platform/backend/modules/system/iam/menu` (base, for `RegisterAdditionalComponents`)
5. In the startup sequence (before any HTTP route registration), call:
   ```go
   // Wire business components into base's component registry
   menu.RegisterAdditionalComponents(<per PR-1 API signature>)
   // Wire business permission policies into base's contracts package
   contracts.RegisterAdditionalPolicies(<per PR-1 API signature>)
   ```
   Read PR-1's commit for the exact signature; the calling convention depends on whether PR-1 chose variadic/map/provider design.

**Test build**: `cd pantheon-ops && go build ./...` MUST now pass. If not, halt and diagnose.

**Human gate**: show full diff of main.go. Confirm.

### Stage 6: Run Full Validation

```bash
cd pantheon-platform && go work sync
cd pantheon-ops && go build ./...
cd pantheon-ops && go test ./backend/...
cd pantheon-base && go build ./...
cd pantheon-base && go test ./backend/...
```

All must pass. If any fail:
- Show failure output
- Diagnose root cause
- Propose fix as a new commit (NEVER amend)
- Re-run validation

### Stage 7: Commit and Stop (HUMAN GATE)

Once all builds and tests pass, commit the staged changes as **a small number of commits** for revertibility:

```
chore(workspace): enable Go workspace + delete redundant base copies [PR-2]
chore(iam): remove IAM overrides now provided by base [PR-2]
refactor(imports): rewrite ops imports to pantheon-platform base [PR-2]
feat(business): register business components and policies via base extension APIs [PR-2]
chore(contracts): slim pkg/contracts to business-only entries [PR-2]
```

Or one bulk commit if user prefers (less revertible but simpler diff to read).

**Do NOT**:
- `git push`
- `gh pr create`
- Modify pantheon-base in any way

Tell the user:
- Branch name
- Commits created
- Lines deleted (~thousands due to 94 file deletion)
- Tests passing
- Ready for human review and manual PR creation

## Required References

- `../../docs/DRIFT_AUDIT.md` — §3 Category A full file list, §5 PR-2 step-by-step
- `../backport-to-base/SKILL.md` — the upstream skill; this skill depends on PR-1 being merged
- `references/cutover-script.md` — the sed command, deletion order, edge case notes

## Hard Rules

- **Never modify pantheon-base** in this skill. PR-1 already did its job; do not touch base.
- **Never `git push` or `gh pr create`**. Local commits only.
- **Never commit between Stages 1-5**. The intermediate state doesn't build; commits at intermediate stages would be unbisectable.
- **Never use `git commit --no-verify`.** Fix hook failures properly.
- **Never amend prior commits** during this skill. Always new commits.
- **Never skip a human gate**. Each stage has a confirmation point because each stage's diff is large.
- **Never delete a file not on the approved list** in §3 Category A or the 6 IAM overrides. If a file looks deletable but isn't on the list, halt and ask.
- **Build failures halt the skill.** Do not "force through" by deleting more or hand-editing.

## Skill Chain

After this skill completes:
- No next skill. PR-2 is the end of the drift consolidation arc.
- Future drift will be caught by re-running `triage-base-drift` at session start.
- The next major work in pantheon-ops will be **new business features** (not drift cleanup), which routes into the 7-stage business module workflow (`docs/WORKFLOWS.md` when written).

## Output Expectations

At end of skill execution:
- pantheon-ops is on branch `workspace-cutover` with 1-5 commits
- 94 files are deleted from ops
- Remaining ops files have rewritten imports
- `go work sync && go build ./...` passes in both repos
- `go test ./...` passes in both repos
- pantheon-base is untouched (no commits, no working tree changes)
- User receives a summary and creates the PR manually
