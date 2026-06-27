# Task Packet: known-issue-closure

## Goal

Close the known follow-up issues exposed after the frontmatter migration: stale hardening follow-up metadata, graph-review artifact drift, and visual-evidence false positives for method documentation tasks.

## Primary Layer

method

## Dependency Layers

- none

## Harness Profile

- Template: docs-governance
- Overlay: none
- Coverage Dimensions:
  - maintainability
  - method-health

## Contract Anchors

- `architecture/harness/review-loop-spec.md`
- `architecture/harness/verification-evidence-spec.md`
- `architecture/harness/visual-quality-protocol.md`
- `architecture/harness/handoff-protocol.md`

## Scope

### In

- Mark the hardening frontmatter follow-up as resolved by the frontmatter migration task.
- Add graph-review metadata to existing task evidence and align review structural metadata with task packets.
- Teach `check-visual-evidence` to honor explicit not-applicable declarations for non-UI method work that mentions visual docs.
- Add regression coverage for that visual-evidence opt-out path.
- Record evidence and review for this closure task.

### Out

- Promotion of long-running open tasks such as visual evidence or failure registry rollout.
- New dependencies.
- Product or sibling repository changes.

## Expected Files

### Create

- `docs/harness/tasks/2026-06-27-known-issue-closure.task.md`
- `.harness/evidence/2026-06-27-known-issue-closure/commands.json`
- `.harness/evidence/2026-06-27-known-issue-closure/review.md`

### Modify

- `scripts/harness/check-visual-evidence.mjs`
- `scripts/harness/check-visual-evidence.test.mjs`
- `docs/harness/tasks/2026-06-27-migration-hardening.task.md`
- `.harness/evidence/2026-06-27-migration-hardening/commands.json`
- `.harness/evidence/2026-06-27-migration-hardening/review.md`
- `.harness/evidence/2026-06-27-frontmatter-migration/commands.json`
- `.harness/evidence/2026-06-27-frontmatter-migration/review.md`

### Do Not Touch

- `../pantheon-base/**`
- `../pantheon-ops/**`
- `../pantheon-workbench/**`

## Implementation Notes

- Keep the visual opt-out explicit; do not globally weaken UI task detection.
- Preserve historical command evidence while removing stale current `knownGaps`.
- Make `graphChecks` and `structuralReview` mirror each task packet's `Structural Scope`.

## Structural Scope

- Affected Subgraph: `task packets -> evidence graphChecks -> review structuralReview -> visual/graph gates`
- Boundary Crossings: none
- Risk Nodes: visual-evidence classifier, graph-review consistency gate, evidence/review artifacts
- Graph Focus: none

## Visual Evidence Scope

- Applicability: not applicable
- Reason: method checker and artifact metadata changes only; no user-facing UI, desktop/mobile viewport, or empty/loading/error/permission UI state changed.

## Verification Plan

- `node --test scripts/harness/check-visual-evidence.test.mjs`
- `node --test scripts/harness/*.test.mjs`
- `node scripts/harness/check-visual-evidence.mjs --root . --strict`
- `node scripts/harness/check-graph-review.mjs --root . --strict`
- `node scripts/harness/check-task-packet.mjs --root .`
- `node scripts/harness/check-evidence.mjs --root . --strict`
- `node scripts/harness/check-review.mjs --root . --strict`
- `node scripts/harness/check-doc-frontmatter.mjs --root . --strict`

## Linkage

- Task ID: 2026-06-27-known-issue-closure
- OpenSpec Change: none
- Plan References: none
- Evidence Directory: .harness/evidence/2026-06-27-known-issue-closure/
- Review File: .harness/evidence/2026-06-27-known-issue-closure/review.md

## Evidence Required

- command result summary
- review summary
- known gaps if any strict gate cannot be run

## Human Gates

- none

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed
