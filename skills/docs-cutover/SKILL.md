---
name: docs-cutover
description: Use when executing Phase A of docs/DOCS_OPTIMIZATION_PLAN.md — treat documentation drift between pantheon-base and a derived business repo. Scans all of docs/ for drift, classifies each file into backport / pseudo / business / delete, applies the cleanup to bring derived repos into compliance with WORKSPACE_INHERITANCE.md. Mirrors triage-base-drift + workspace-cutover but for documentation instead of code.
---

# Docs Cutover (Phase A of DOCS_OPTIMIZATION_PLAN)

This skill executes the documentation-drift cleanup. Output: business repos retain ONLY the documents they own (business module designs, project inheritance file, local README pointer); all other docs come from pantheon-base.

Mirrors the code drift skills (`triage-base-drift` + `workspace-cutover`) but operates on `docs/` instead of source code. Lighter touch — no compile dependency.

## When To Use

- After `docs/DOCS_OPTIMIZATION_PLAN.md` Phase A is approved
- Before Phase B / C / D (which extend base docs); drift must be cleaned first
- When `pantheon-base` and target business repo are at clean git state

## Preconditions

1. `docs/DOCS_OPTIMIZATION_PLAN.md` exists and Phase A is approved
2. Both target repos are at clean git state
3. `pantheon-base/docs/` is the authoritative source; do not modify base in this skill
4. The user is online for the human gate flow (3-4 gates)

## Workflow

### Stage 1: Scan and Classify

For each file under `<business-repo>/docs/`:

| If | Then |
|---|---|
| Exists in `base/docs/` with same path AND content identical | Mark `pseudo` (delete from business; no information loss) |
| Exists in `base/docs/` with same path BUT content differs | Mark `drift` (needs per-file decision in Stage 2) |
| Does NOT exist in `base/docs/` AND filename matches `BUSINESS_*` OR `PROJECT_INHERITANCE*` | Mark `business` (keep in business repo) |
| Does NOT exist in `base/docs/` AND filename is generic (e.g. `FOO_DESIGN.md`) | Mark `orphan` (ask user: backport to base, or delete) |
| Is the business repo's own `README.md`, `AGENTS.md` | Mark `local` (keep, but verify it correctly references base) |

Produce a classification table inline (do NOT write a new audit doc — `DOCS_OPTIMIZATION_PLAN.md` is the authoritative plan; this skill just executes it).

### Stage 2: Per-File Drift Decision (HUMAN GATE)

For each `drift` file:

Show the user:
- File path
- Real diff line count (markdown diffs aren't subject to module-name normalization, so this is straightforward)
- A 1-paragraph summary of what the business repo added/changed
- Recommended action: `backport-to-base` / `delete-business-copy` / `keep-as-override`

Wait for explicit decision per file. Record decisions in the commit message of Stage 4.

### Stage 3: Backport Approved Changes to Base (Conditional Sub-Skill)

If any drift file is marked `backport-to-base`:

- Halt this skill
- Instruct user to run `$backport-to-base` for docs (different from the code version — write a content-merge PR instead of code commits)
- Resume this skill after the backport PR is merged into base

For MVP execution, simplest path: ask user to manually edit base docs to incorporate accepted drift changes, then resume here.

### Stage 4: Delete Pseudo Copies and Orphans (HUMAN GATE)

In the business repo, delete:
- All `pseudo` files (drift was 0)
- All `drift` files marked `delete-business-copy` (after Stage 3 reflected them in base)
- All `orphan` files marked for deletion

DO NOT delete:
- Anything marked `business`, `local`, or `keep-as-override`
- `docs/PROJECT_INHERITANCE.md`
- `docs/README.md` (will rewrite in Stage 5)

Stage the deletions but do NOT commit yet.

Human gate: show user the deletion list. Confirm.

### Stage 5: Rewrite business repo's docs/README.md

Replace the existing README with a pointer-style README:

```markdown
# pantheon-<business> Documentation

This repository inherits foundation documents from `pantheon-base`. See `docs/PROJECT_INHERITANCE.md` for the inheritance contract and base version pin.

## Documents Owned by This Repository

- `docs/PROJECT_INHERITANCE.md` — base version and inheritance scope
- `docs/designs/BUSINESS_<MODULE>_DESIGN.md` — business module designs (per module)
- `docs/acceptances/BUSINESS_*.md` — business-specific acceptance docs (if any)

## Documents Provided by pantheon-base

For everything else (architecture, contracts, frontend specs, backend rules, generic acceptance standards), see `pantheon-base/docs/`. Do NOT copy those documents into this repo; reference them in place.

## Modifying Base Documents

If a base document needs to change, open a PR against `pantheon-base`. This repo never holds its own copy.
```

### Stage 6: Update AGENTS.md Constraint

Add to `<business-repo>/AGENTS.md` (or the equivalent agents file):

```markdown
## Documentation Constraints

- This repository owns ONLY: `BUSINESS_*` design docs, `PROJECT_INHERITANCE.md`, local `README.md`, local `AGENTS.md`.
- Do NOT add other documentation to `docs/`; all foundation docs live in `pantheon-base/docs/`.
- If you need to change a base document, open a PR against `pantheon-base`.
- Skill `$triage-docs-drift` can re-verify compliance.
```

### Stage 7: Validate

- `diff -rq base/docs/ ops/docs/` should now show ONLY the legitimate exceptions (`BUSINESS_*`, `PROJECT_INHERITANCE.md`, the new minimal README)
- The 14 previously-drifted files are no longer in the diff (because they're deleted from ops)
- Business module docs still present and unchanged

### Stage 8: Commit and Stop (HUMAN GATE)

Commit pattern (in business repo):

```
docs: remove non-business doc copies, point to pantheon-base [Phase A]
docs: rewrite README as inheritance pointer [Phase A]
docs: add documentation ownership constraint to AGENTS.md [Phase A]
```

Or one bulk commit if user prefers.

**Never push or create PR**. Local commits only.

## Required References

- `../../docs/DOCS_OPTIMIZATION_PLAN.md` — authoritative plan; this skill executes Phase A
- `../../docs/WORKSPACE_INHERITANCE.md` — defines what business repos can own
- `references/docs-cleanup-list.md` — concrete file list expected to be deleted in pantheon-ops as of 2026-05-11

## Hard Rules

- **Never modify pantheon-base** in this skill. If a backport is needed, halt and instruct user.
- **Never delete `BUSINESS_*_MODULE_DESIGN.md`** or `PROJECT_INHERITANCE.md`. These are business-owned.
- **Never `git push` or `gh pr create`.** Local commits only.
- **Never bulk-delete without per-file confirmation in Stage 4**, except for `pseudo` files (where confirmation is by category).
- **Never silently drop drift content.** Every drift file must be either backported to base or explicitly deleted by user decision.
- Drift in `*_CONTRACT.md` or `PLATFORM_*.md` is HIGH RISK — these are foundation contracts. Halt and require user inspection.

## Skill Chain

After this skill:
- Phase B (UI doc supplementation) can proceed safely
- Phase C (business UI template abstraction) can proceed safely
- Phase D (business module UI doc completion) can proceed safely

No automatic next_skill. Each Phase is a separate user decision.

## Output Expectations

After successful execution:
- Business repo has ~3-5 docs total (PROJECT_INHERITANCE + 1-N BUSINESS_*_MODULE_DESIGN + README + maybe AGENTS additions)
- `diff -rq base/docs/ business/docs/` shows ONLY business-owned exceptions
- Any drifted content has been backported to base or explicitly discarded
- Business repo's AGENTS.md prevents future doc drift
