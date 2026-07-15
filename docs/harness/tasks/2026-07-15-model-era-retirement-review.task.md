# Task Packet: model-era retirement review and method simplification

## Goal

Execute a model-era retirement review per `harness-retirement-review.md`: remove retired OMX/codex-flow active routing from method docs, delete zero-reference skill directories, downgrade old-model-oriented mandatory routing rules to principles, and record keep/downgrade/replace/remove verdicts with rollback conditions.

## Primary Layer

method

## Dependency Layers

- pantheon-harness/architecture/harness/harness-retirement-review.md
- pantheon-harness/architecture/harness/task-packet-spec.md
- pantheon-harness/architecture/harness/verification-evidence-spec.md
- pantheon-harness/architecture/methodology/superpowers-migration.md

## Harness Profile

- Template: docs-governance
- Overlay: none
- Quality Profile: portable-method
- Owner Layer: portable-method
- Coverage Dimensions:
  - maintainability
  - method-health

## Contract Anchors

- `architecture/harness/harness-retirement-review.md`
- `architecture/methodology/harness-methodology.zh.md`
- `architecture/methodology/workflow-routing.md`

## Scope

### In

- Delete 46 zero-reference skill directories under `pantheon-harness/skills/` (gstack-*, openspec-*, ui-ux-pro-max, cutover/drift suite, pantheon-base-foundation, pantheon-workspace-routing).
- Rewrite `architecture/methodology/workflow-routing.md`: deduplicate repeated sections, replace OMX/codex-flow active routes with capability-based routing.
- Simplify `architecture/methodology/harness-methodology.zh.md`: fix duplicate section numbering, update doc map, downgrade subagent routing table to principle.
- Unbind tool names in `patterns/tool-adapter-matrix.md/.zh.md`, `task-delegation-template.md`; fix en/zh drift (grill-me row).
- Downgrade legacy plan-ref wording in task-packet and verification-evidence specs (behaviour unchanged).
- Remove `codex-workflow-quick-reference.md` and its inbound links.
- Append 2026-07-15 re-audit appendix to `superpowers-migration.md`.
- Record retirement review at `architecture/harness/retirement-reviews/2026-07-15-model-era-retirement-review.md`.
- Bump VERSION 1.3.0 → 1.4.0 and add CHANGELOG entry.

### Out

- Do not change validation scripts or their test fixtures (legacy plan refs must keep passing).
- Do not touch pantheon-base or pantheon-ops.
- Do not delete historical task packets, evidence, or `docs/superpowers/` artifacts.
- Do not edit AGENTS.md OMX-managed markers.

## Assumptions and Open Questions

- Confirmed Facts:
  - Human confirmed OMX and codex-flow are no longer in daily use (2026-07-15).
  - Repo-wide audit found zero references to the deleted skill directories from contracts, patterns, or consumer repos.
  - `grill-me` and `impeccable` are actively referenced and must be kept.
- Working Assumptions:
  - Git history is a sufficient rollback path for removed directories.
- Open Questions:
  - none

## Expected Files

### Create

- `architecture/harness/retirement-reviews/2026-07-15-model-era-retirement-review.md`
- `docs/harness/tasks/2026-07-15-model-era-retirement-review.task.md`
- `.harness/evidence/2026-07-15-model-era-retirement-review/commands.json`
- `.harness/evidence/2026-07-15-model-era-retirement-review/review.md`

### Modify

- `architecture/methodology/workflow-routing.md`
- `architecture/methodology/harness-methodology.zh.md`
- `architecture/methodology/superpowers-migration.md`
- `architecture/methodology/task-delegation-template.md`
- `architecture/methodology/agentic-best-practices-reference.md`
- `architecture/methodology/codex-development-process-improvement.md`
- `architecture/harness/task-packet-spec.md` / `.en.md`
- `architecture/harness/verification-evidence-spec.md` / `.en.md`
- `patterns/tool-adapter-matrix.md` / `.zh.md`
- `skills/impeccable/SKILL.md`
- `VERSION`
- `CHANGELOG.md`
- `README.md`

### Delete

- `architecture/methodology/codex-workflow-quick-reference.md`
- `skills/gstack-*` (37 directories)
- `skills/openspec-*` (4 directories)
- `skills/ui-ux-pro-max`
- `skills/backport-to-base`, `skills/docs-cutover`, `skills/workspace-cutover`, `skills/triage-base-drift`
- `skills/pantheon-base-foundation`, `skills/pantheon-workspace-routing`

### Do Not Touch

- `scripts/harness/**` and `verify/**` (validators and fixtures)
- `.harness/evidence/2026-07-13-*/**` and other historical evidence
- `docs/harness/tasks/2026-07-13-*.task.md` and other historical packets
- `skills/grill-me/**`, `skills/skills-lock.json`

## Implementation Notes

- Retirement criterion: retire constraints that compensated for old-model weakness; keep constraints that guard runtime probabilism and responsibility boundaries (evidence gates, Human Gate, role separation, impeccable).
- Wording downgrades must not change validator behaviour; legacy artifacts stay valid.

## Minimum Viable Approach

- Selected Rung: docs governance / method maintenance
- Why This Is Enough: no runtime application code changes; method docs and dead asset removal only
- Upgrade Trigger: none

## Success Criteria

- Behaviour Outcome:
  - `workflow-routing.md` routes by capability with no OMX/$-lane/codex-flow active routes and no duplicated sections.
  - `skills/` contains only `grill-me`, `impeccable`, and `skills-lock.json`.
  - Retirement review record exists with per-item verdicts and rollback conditions.
- Verification Signal:
  - `node --test scripts/harness/*.test.mjs` passes.
  - All README-listed check gates pass (`check-doc-frontmatter`, `check-doc-links`, `check-doc-inventory`, `check-task-packet`, `check-evidence --strict`, `check-review --strict`, `check-adoption --strict`, `check-method-health --strict`).
- Regression Watch:
  - Legacy plan references in old evidence keep validating.
  - Consumer references (`grill-me` from base, `impeccable` by name) remain resolvable.
- Economics Watch: none

## Context Strategy

- Entry Sources: harness-retirement-review.md, workflow-routing.md, superpowers-migration.md, repo-wide reference audit
- Retrieval Order: entry -> summary -> raw
- Retrieval Helpers: none
- Promotion Target: retirement review record + task packet + evidence
- Response Budget: standard
- Sensitive Context: none

## Method Readiness

- Consumer-Specific Controls: none
- Required Sensors: command | review
- Required Evidence: command summary | review summary
- Ratchet Decision: guide-updated
- Deferred Code Issues: none

## Delivery Governance

- Design Gate: retirement review record with rollback conditions
- Development Gate: expected files declared
- QA Acceptance Gate: command | human review
- GitHub Governance Gate: method-gate

## Structural Scope

- Affected Subgraph: workflow-routing -> tool-adapter-matrix -> task-delegation-template -> spec linkage wording -> skills registry
- Boundary Crossings: portable-method only (no consumer repos)
- Risk Nodes: verification-evidence-spec wording (must not break legacy validation)
- Graph Focus: none

## Visual Evidence

Visual evidence: not applicable — docs governance and skill directory removal only, no user-facing UI.

## Verification Plan

- `git status --short`
- `node --test scripts/harness/*.test.mjs`
- `node scripts/harness/check-doc-frontmatter.mjs --root . --strict`
- `node scripts/harness/check-doc-links.mjs --root . --strict`
- `node scripts/harness/check-doc-inventory.mjs --root . --strict`
- `node scripts/harness/check-task-packet.mjs --root .`
- `node scripts/harness/check-evidence.mjs --root . --strict`
- `node scripts/harness/check-review.mjs --root . --strict`
- `node scripts/harness/check-adoption.mjs --strict`
- `node scripts/harness/check-method-health.mjs --strict`

## Linkage

- Task ID: 2026-07-15-model-era-retirement-review
- OpenSpec Change: none
- Plan References: architecture/harness/retirement-reviews/2026-07-15-model-era-retirement-review.md
- Evidence Directory: .harness/evidence/2026-07-15-model-era-retirement-review/
- Review File: .harness/evidence/2026-07-15-model-era-retirement-review/review.md

## Evidence Required

- command result summary
- review summary
- explicit gap if any verification cannot be run

## Human Gates

- Human confirmed OMX/codex-flow retirement, orphan skill deletion, and substantive simplification scope (2026-07-15, pre-implementation interview).
- Human accepts git-history-only rollback for deleted skill directories.

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] 46 orphan skill directories deleted
- [x] workflow-routing.md deduplicated and tool-unbound
- [x] harness-methodology.zh.md numbering fixed and simplified
- [x] tool-adapter-matrix en/zh aligned
- [x] spec plan-ref wording downgraded without validator change
- [x] retirement review record written with rollback conditions
- [x] superpowers-migration appendix added
- [x] VERSION and CHANGELOG updated
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed
