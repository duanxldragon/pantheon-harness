# Pantheon Workspace Inheritance

Chinese version: [WORKSPACE_INHERITANCE.zh.md](./WORKSPACE_INHERITANCE.zh.md)

## 1. Canonical Repository Roles

- `pantheon-harness`: portable methods, workflows and reusable collaboration tools.
- `pantheon-base`: the only authority for foundation architecture, `platform`, `system/*`, shared UI/backend rules and acceptance contracts; publishes immutable foundation releases.
- `pantheon-ops`: a derived business repository consuming a locked official Base release plus a declared business overlay.
- Future `pantheon-xx` repositories follow the same release-consumer boundary.

## 2. Current Facts and Reading

Read the target repository's `AGENTS.md`, current `.harness/STATUS.md` and task index first. Then load only the matching contract, design and acceptance references from its docs index. L0 needs the local rule and relevant check; L1 uses a short goal/In/Out/verification record; L2 needs a task packet and durable review/evidence.

- Base: `pantheon-base/AGENTS.md` -> current task -> `pantheon-base/docs/README.md` task route. Read relevant `DESIGN.md` sections for architecture or UI decisions.
- Ops: `pantheon-ops/AGENTS.md` -> `pantheon-ops/docs/PROJECT_INHERITANCE.md` -> current business task/design. Use the locked snapshot's inherited contracts for compatibility; sibling Base HEAD documents are evolution references whose differences must be recorded.
- Harness: `pantheon-harness/AGENTS.md` -> `pantheon-harness/README.md` -> relevant policy/script. The methodology overview is `pantheon-harness/architecture/methodology/harness-methodology.zh.md`.

Product version, official publication and consumer adoption are separate facts. Read `VERSION`, official release evidence and `foundation-release.lock.json`, respectively. A dated checkpoint or archived completed task does not establish today's release or product acceptance. Current task status comes from `.harness/tasks/*/manifest.json`; retrieve the latest task summary before raw logs.

## 3. Minimum Task Input

```text
Target repo and layer:
User scenario / desired outcome:
In / Out:
Acceptance criteria:
Existing task-id / candidate:
Sync expectation:
```

Use the existing task packet when one exists. Batch intake questions; progress autonomously within scope. Maintainer touchpoints remain scope clarification, gate-policy decisions and final functional/visual acceptance.

## 4. Base-First Sync via Foundation Releases

Change base rules in `pantheon-base`, then let business repositories upgrade. Validate and publish a formal Base release before consumer product changes. `pantheon-ops/docs/PROJECT_INHERITANCE.md` owns the current upgrade runbook; the following commands run from the Ops root:

```powershell
# Fetch/verify a deliberately selected official release and record the lock.
npm run fetch:base-release -- --release <official-release-tag>
# Assemble a temporary tree; keep the current worktree until acceptance.
npm run rebuild:from-base -- --target .tmp/clean-base-overlay
npm run check:business-overlay -- --root .tmp/clean-base-overlay
npm run check:shared-drift -- --root .tmp/clean-base-overlay
```

Run the required CGO/race, frontend and business-runtime verification before an authorized baseline replacement. The lock and verified official release bytes are the comparison baseline. Do not copy, cherry-pick or hand-merge shared files from Base HEAD.

Method consumption is independent of product versions. Consumer `.harness/method-consumption.json` records the seven reviewed policy hashes and the full Harness `sourceCommit` used by CI. Checkout that commit at the declared sibling source path; normal validation never updates the receipt. Select a new pin only after review. Unreleased helper/checker changes require their own publication; do not imply that a policy receipt has published them.

## 5. Change Ownership

Fix shared platform/system/UI/permission/i18n/audit behavior in Base. Keep business models, business workflows and their acceptance in Ops. `business-overlay.json` is the machine-readable asset owner list. Use contracts and capability interfaces to cross domains.

## 6. Shared Completion Gate

- Correct repository and risk tier; authorized scope respected.
- Code, tests, menu, permission, i18n, docs and fixtures updated when affected.
- Verification tied to the current candidate; required runtime or visual evidence present, or the gap explicitly open.
- Shared behavior follows through a formal release/rebuild, or the downstream work is explicitly deferred with an owner.
- CI configuration, observed job results and merge-required checks are reported separately; manual utility availability is not CI coverage.
- Current task/index updated without changing historical evidence or inferring acceptance from archive status.

Keep this portable workspace document with the three repositories. A standalone clone must provide the declared Harness source snapshot before method validation.
