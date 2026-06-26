---
name: triage-base-drift
description: Use when starting any pantheon-platform session, when investigating "is ops out of sync with base", or after a base upgrade to detect what changed in derived business repos. Scans every shared file between pantheon-base and a business repo, distinguishes pseudo-drift (Go module name only) from real drift (functional changes), and classifies each real-drift file into one of six categories with a recommended action.
---

# Triage Base Drift

Use this skill to produce a current snapshot of code divergence between `pantheon-base` and a derived business repository (default: `pantheon-ops`).

## When To Use

- At session start, when working in `pantheon-platform` workspace
- After a `pantheon-base` upgrade, to find which business-repo files now drift
- Before running `upgrade-base-dependency` or any cross-repo PR work
- When debugging "this works in base but breaks in ops" or vice versa
- When deciding whether a fix belongs in base or business

Do **not** use this skill for:
- single-file diff inspection (use `diff` directly)
- generated code (`frontend/src/i18n/resources/generated/*`, etc.)
- runtime artifacts (`uploads/`, `.tmp/`, build outputs)

## Workflow

### 1. Verify Preconditions

- Workspace root contains `pantheon-base/` and the target business repo (e.g. `pantheon-ops/`) as submodules.
- Confirm the shared script exists at `scripts/harness/triage-base-drift.mjs`.

### 2. Run Shared Drift Script

The tool-agnostic harness script is the source of truth:

```bash
node scripts/harness/triage-base-drift.mjs --business pantheon-ops
node scripts/harness/triage-base-drift.mjs --business pantheon-ops --json
```

Codex may summarize and interpret the output, but must not duplicate drift scanning logic inside this skill.

### 3. Review Classifications

The script classifies drift into these categories:

| Category | Definition | Action |
|---|---|---|
| pseudo-drift | Backend files differ only by module import token normalization | Mark for deletion when shared ownership is ready |
| business mount | Base extension/mount files intentionally customized by business repos | Keep in business repo or replace with extension API |
| generic drift | Drift that appears reusable beyond one business domain | Review for backport to base |
| business-specific drift | True business-domain logic or repo-local product adaptation | Keep in business or expose base extension contract |
| noise | Generated, runtime, or low-signal files | Exclude from drift decisions |
| base-only | File exists only in base | Decide if business repo needs it |
| business-only | File exists only in business repo | Decide if this is intentional business extension |

### 4. Produce or Update DRIFT_AUDIT.md

Write/overwrite `docs/DRIFT_AUDIT.md` with the following sections:
1. TL;DR (counts and headline finding)
2. Methodology (commands used)
3. Backend classification table (by category, full file lists)
4. Frontend classification table
5. Execution plan (PR-1 + PR-2 skeleton, even if not yet executed)
6. Risk notes
7. Timestamp

If `docs/DRIFT_AUDIT.md` already exists, preserve its history section and append a new audit dated section.

### 5. Human Gate

Pause and present:
- Total counts per category
- The list of Category D and Category E files (the ones requiring human judgment)
- Recommended PR sequence

Wait for human to confirm before any execution.

## Required References

- `../../docs/DRIFT_AUDIT.md` — latest audit snapshot (this skill writes/updates it)
- `../../docs/BASE_UPGRADE_WORKFLOW.md` — the broader upgrade workflow this fits into
- `../../docs/WORKSPACE_INHERITANCE.md` — repo role definitions

## Hard Rules

- **Read-only by default**: this skill must not modify code files, only `docs/DRIFT_AUDIT.md`
- **Never delete files**: deletion is for downstream skills (`workspace-cutover`, `backport-to-base`)
- **Generated code is not drift**: anything under `*/generated/*` is excluded
- **Module-name normalization is mandatory**: never report pseudo-drift files as real drift
- **Each real-drift file needs a category**: no "unclassified" allowed in the final report
- **Output is the audit doc, not a verbal summary**: always write the file

## Skill Chain

This skill is a Stage 0 maintenance entry point. It does not auto-invoke a next skill.

After completion, the human typically chooses one of:
- **Codex**: `$backport-to-base` for Category D files
- **Codex**: `$workspace-cutover` for Category A deletion + `go.work` setup
- **Claude Code**: invoke the `Skill` tool with one of those names
- **Human gate**: this is always a stage boundary; never auto-chain

## Output Expectations

The audit doc must include:
- Counts per category
- Complete file list for Category A (so downstream skills can act on it)
- Per-file diff size and verdict for Categories D, E
- An execution plan with PR-level granularity
- Risk and rollback notes
