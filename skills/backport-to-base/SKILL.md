---
name: backport-to-base
description: Use when executing PR-1 of the drift consolidation plan in docs/DRIFT_AUDIT.md §5. Backports 5 generic IAM/permission files from pantheon-ops into pantheon-base, and introduces 2 extension API surfaces (menu.RegisterAdditionalComponents, contracts.RegisterAdditionalPolicies) so business repos can plug business-specific entries in without forking base files. Use only after triage-base-drift has confirmed audit accuracy. Never touches pantheon-ops in this skill — that is PR-2's job.
---

# Backport IAM to Base (PR-1)

This skill executes **PR-1** from `docs/DRIFT_AUDIT.md` §5. Output: a stack of local commits on `pantheon-base` that brings ops's generic IAM enhancements into base and adds 2 extension points. No PR is created; no push happens; pantheon-ops is not modified.

## When To Use

- After `triage-base-drift` has run in the current session and confirms `docs/DRIFT_AUDIT.md` matches reality
- When both `pantheon-base` and `pantheon-ops` are at clean git state
- Before any work on PR-2 (`workspace-cutover`)

## Preconditions

1. `docs/DRIFT_AUDIT.md` exists and Category D file list matches the current ops state (re-run `triage-base-drift` if uncertain)
2. `pantheon-base` git status: clean (no uncommitted changes, no untracked files in tracked dirs)
3. `pantheon-ops` git status: clean
4. The user is online to review at the human gates — this skill has multiple mandatory pauses

If any precondition fails: halt and ask the user.

## Workflow

The skill has 5 internal stages. **Stage 1 is the highest-stakes human gate** — the extension API shape is a design judgment the user owns.

### Stage 1: Propose Extension API Designs (HUMAN GATE — REQUIRED)

Do NOT write any code yet. Do NOT modify any files.

Read `references/api-design-options.md` and present the user with:

- 3 candidate designs for `menu.RegisterAdditionalComponents`
- 3 candidate designs for `contracts.RegisterAdditionalPolicies`

For each candidate, present: signature, concurrency model, error semantics, init pattern, pro/con.

Format the choice as `AskUserQuestion` (Claude) or interactive prompt (Codex). Wait for explicit selection of ONE variant per API. Do not proceed until both are chosen.

Once chosen, record the choice in a temp note (e.g. inline in the commit message of Stage 3).

### Stage 2: Backport Generic IAM Changes (5 files)

For each file below, read the **pantheon-ops** version, identify the added/changed code, and apply it to **pantheon-base**.

| File | What to copy from ops to base |
|---|---|
| `backend/modules/system/iam/role/role_service.go` | `roleMenuAuthorizationRow` struct, `resolveRoleAuthorization()`, `syncRoleManagedAPIPolicies()`, `reloadRolePolicies()`, call sites in CreateRole and UpdateRole |
| `backend/modules/system/iam/role/role_service_test.go` | All test functions added by ops |
| `backend/modules/system/iam/permission/permission_service.go` | `validatePolicyCreatePayload()`, `findExistingPolicy()`, and the idempotent-create branch in CreatePolicy |
| `backend/modules/system/iam/permission/permission_service_test.go` | All test functions added by ops |
| `backend/modules/system/iam/permission/permission_workbench.go` | Replace the giant `switch permissionKey` with a call to `contracts.RequiredAPIPoliciesByPermissionKey(permissionKey)` |

For each file, after editing, run `go build ./backend/...` to catch syntax errors before committing.

Commit one file at a time. Commit message format:
```
iam: <one-line summary of change> [PR-1]

<2-3 lines of context about why this was backported from pantheon-ops>
```

**Human gate**: review each commit message + diff before running `git commit`. Show the user the staged diff and the planned message; wait for approval.

### Stage 3: Implement Extension APIs

Per the design chosen in Stage 1:

**3.1 Create `backend/pkg/contracts/permission_policies.go`**

Contains:
- `type PermissionAPIPolicy struct { Path string; Method string }`
- `RequiredAPIPoliciesByPermissionKey(key string) []PermissionAPIPolicy` — implementation containing all `system:*` entries (the base-level keys). Source these from the ops version of `pkg/contracts/permission_policies.go`, taking only the non-business entries.
- The extension API surface chosen in Stage 1 (e.g. `RegisterAdditionalPolicies(policies map[string][]PermissionAPIPolicy)`)
- Internal storage and concurrency guard per the chosen design

**3.2 Create `backend/pkg/contracts/permission_policies_test.go`**

Tests covering:
- Lookup of base-level key returns expected policy
- Lookup of unknown key returns nil
- Registration of additional keys is observable in subsequent lookups
- Duplicate registration behavior matches the chosen design (panic / error / overwrite — pick per design)
- Concurrent registration is safe if the chosen design promises concurrency safety

**3.3 Refactor `backend/modules/system/iam/menu/component_registry.go`**

- Change `validComponentKeys` from a package-level static map to a managed internal set
- Add the extension API surface chosen in Stage 1
- Provide a `IsValidComponentKey(key string) bool` accessor (if not already present) that consults both the static base set and the registered additions
- Update any existing callers in base to use the accessor

**3.4 Add tests in `backend/modules/system/iam/menu/component_registry_test.go`**

Same test categories as 3.2.

Commit pattern: one commit per API surface.
- `iam: introduce menu.RegisterAdditionalComponents extension point [PR-1]`
- `iam: introduce contracts.RegisterAdditionalPolicies extension point [PR-1]`

**Human gate**: show diffs and commit messages, wait for approval.

### Stage 4: Validate

Run in `pantheon-base` directory:

```bash
go build ./...
go test ./backend/modules/system/iam/...
go test ./backend/pkg/contracts/...
```

All must pass. If any fail:
- Show the user the failure output
- Diagnose the root cause (do NOT just rerun or skip)
- Propose a fix as a new commit (NEVER amend prior commits)
- Re-run validation after the fix

### Stage 5: Stop (HUMAN GATE)

Do NOT:
- `git push`
- `gh pr create`
- Touch pantheon-ops in any way
- Run PR-2 actions

Tell the user:
- Number of commits made (typically 7: 5 backports + 2 extension APIs)
- Files touched
- Test summary (test count + duration)
- That base is ready for human review and manual `gh pr create`

This is the boundary between PR-1 and PR-2. The user must explicitly decide to proceed to PR-2.

## Required References

- `../../docs/DRIFT_AUDIT.md` — §3 (Category D file list) and §5 (PR-1 plan)
- `references/api-design-options.md` — extension API design choices
- `../triage-base-drift/SKILL.md` — the upstream skill that produces the audit

## Hard Rules

- **Never modify pantheon-ops** in this skill. Even fixing a typo in ops belongs to a separate session.
- **Never `git push`, `gh pr create`, `gh pr merge`**. Local commits only.
- **Never skip the Stage 1 API design human gate.** This is the highest-leverage decision and must be user-owned.
- **Never use `git commit --no-verify`.** If a pre-commit hook fails, fix the underlying issue.
- **Never amend prior commits to fix issues.** Always new commits.
- **Never bundle multiple files into one commit** during Stage 2. One file per commit for atomic revertibility.
- **Test failures halt the skill.** Do not "skip a failing test" or use `-run` to filter — diagnose and fix.

## Skill Chain

This skill is a Stage 0 maintenance task (one-shot drift consolidation).

After completion:
- **Codex**: human invokes `$workspace-cutover` next (PR-2). That skill is defined under `.codex/skills/workspace-cutover/`.
- **Claude Code**: invoke `Skill` tool with `name: workspace-cutover` (when written).
- **Human gate**: always required between PR-1 and PR-2. Never auto-chain.

## Output Expectations

At end of skill execution, the user receives:
- A clean stack of 7 commits on a feature branch in pantheon-base
- All tests green
- A 1-paragraph summary: what changed, what API was introduced, what's next

The user then independently creates the PR via `gh pr create` or whatever ship workflow they use.
