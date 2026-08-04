# Task Packet: HOT-005 adapter layer consolidation

## Goal

Close HOT-005 with the maintainer's scoping decisions: merge the `.agents/adapters` capability-mapping content into `config/agents/adapters` (canonical), convert the six `.agents/adapters` files to pointers, keep the docs/harness pointer layer and en/zh dual maintenance unchanged, and record all three decisions in the open-task closure.

## Priority

`medium`

## Estimated Complexity

`simple`

## Primary Layer

method

## Dependency Layers

- none

## Dependencies

- blockedBy: none
- blocks: none

## Harness Profile

- Template: docs-governance
- Overlay: none
- Quality Profile: portable-method
- Owner Layer: portable-method
- Coverage Dimensions:
  - maintainability
  - method-health

## Contract Anchors

- `architecture/harness/harness-open-tasks.md`
- `architecture/harness/tool-adapter-matrix.md`
- `config/agents/adapters/claude-code.md`
- `scripts/harness/check-adoption.mjs`

## Scope

### In

- Add a compact Capability Mapping section (from `.agents/adapters/*`) to each of the 12 `config/agents/adapters/*.md` (en + zh).
- Replace the six `.agents/adapters/*.md` with pointer files to the config canonical versions (paths preserved for check-adoption).
- Update `.agents/README.md` to state that `config/agents/adapters/` is canonical.
- Update the `AGENTS.md` layout description for `.agents/`.
- Move HOT-005 to Recently Closed in `harness-open-tasks.md`, recording the maintainer decisions: adapter layer merged (config canonical), en/zh dual maintenance retained, docs/harness pointer layer retained.

### Out

- No checker/gate rule changes (pointerization keeps all REQUIRED_FILES paths alive).
- No language-projection changes (maintainer decision 2026-07-26: keep en/zh dual maintenance).
- No docs/harness pointer removals (maintainer decision 2026-07-26: keep all).
- Stale `.agents` stub content (outdated tool flags, superseded Evidence Format JSON) is not carried over; superseded by config adapter bodies and `verification-evidence-spec.md`.

## Assumptions and Open Questions

- Confirmed Facts:
  - check-adoption/check-method-health require `.agents/README.md` and the six `.agents/adapters/*.md` to exist (existence check only, content-agnostic).
  - Maintainer chose: config canonical + `.agents` pointers; keep en/zh; keep docs/harness pointers (2026-07-26 intake).
- Working Assumptions:
  - Capability tables are current enough to merge as descriptive reference; stale flags (for example codex `--apply`) are dropped rather than propagated.
- Open Questions: none

## Structural Scope

### Scope Quantification

- Modules affected: agent adapter layer only
- Files: ~21 (create 1 evidence dir, modify ~20, delete 0)
- API endpoints: 0
- Database migrations: no

### Risk Nodes

1. check-adoption REQUIRED_FILES must keep passing — pointers preserve every required path.
2. check-doc-links strict must pass — pointer link targets verified to exist before writing.

### Legacy Fields (for compatibility)

- Affected Subgraph: .agents/adapters -> config/agents/adapters -> harness-open-tasks
- Boundary Crossings: portable-method only
- Risk Nodes: none beyond above
- Graph Focus: none

## Expected Files

### Create

- `.harness/evidence/2026-07-26-hot-005-adapter-layer-consolidation/` (commands.json, review.md)

### Modify

- `config/agents/adapters/*.md` (12 files, en + zh)
- `.agents/adapters/*.md` (6 files, become pointers)
- `.agents/README.md`
- `AGENTS.md`
- `architecture/harness/harness-open-tasks.md`

### Do Not Touch

- `scripts/harness/**`, `verify/**`
- `patterns/**` and `architecture/harness/*` contract bodies
- `docs/harness/*` pointers and historical tasks/evidence

## Implementation Notes

- Pointer files keep a title line plus a single See link so they stay valid markdown and satisfy existence checks.
- Capability Mapping sections are inserted before the Human Touchpoint Contract section in each config adapter.

## Minimum Viable Approach

- Selected Rung: docs governance / method maintenance
- Why This Is Enough: pure content merge + pointerization; no gate or language changes needed
- Upgrade Trigger: if `.agents` pointer layer proves useless over time, a future retirement review may delete it together with a checker update

## Success Criteria

- Behaviour Outcome: one canonical adapter layer (config/agents/adapters) containing required reading, tool mapping, capability mapping, and the touchpoint contract; `.agents/adapters` reduced to pointers; HOT-005 closed with recorded decisions.
- Verification Signal: all README-listed check gates pass, including check-adoption --strict and check-method-health --strict with unchanged REQUIRED_FILES.
- Regression Watch: check-adoption and check-doc-links keep passing; no orphan links into `.agents/adapters`.
- Economics Watch: none

## Execution Roles

- Implementer Posture: method maintainer agent
- Reviewer Posture: self-review, findings-first (solo maintainer stage)

## Stop Points

- none

## Technical Debt

- technicalDebtFlag: no
- technicalDebtNote: none

## Rollback Plan

- Trigger Condition: gates fail irrecoverably
- Rollback Steps:
  1. `git checkout -- <modified files>`
- Rollback Verification:
  - [ ] check gates green on restored tree

## State Plan

- Checkpoint Expectation: evidence directory artifacts
- Resume Artifacts: this task packet + evidence directory

## Verification Plan

### Backend

- `node --test scripts/harness/*.test.mjs`
- `node scripts/harness/check-doc-frontmatter.mjs --root . --strict`
- `node scripts/harness/check-doc-links.mjs --root . --strict`
- `node scripts/harness/check-doc-inventory.mjs --root . --strict`
- `node scripts/harness/check-task-packet.mjs --root .`
- `node scripts/harness/check-evidence.mjs --root . --strict`
- `node scripts/harness/check-review.mjs --root . --strict`
- `node scripts/harness/check-adoption.mjs --strict`
- `node scripts/harness/check-method-health.mjs --strict`

### Frontend

- none
- Visual Evidence: not applicable; no user-facing UI.

### Browser / Smoke

- none

## Linkage

- Task ID: 2026-07-26-hot-005-adapter-layer-consolidation
- OpenSpec Change: none
- Plan References: none
- Evidence Directory: .harness/evidence/2026-07-26-hot-005-adapter-layer-consolidation/
- Review File: .harness/evidence/2026-07-26-hot-005-adapter-layer-consolidation/review.md

## Evidence Required

- command result summary
- review summary

## Human Gates

- Maintainer scoped HOT-005 at intake (2026-07-26): config canonical + pointers, keep en/zh, keep docs/harness pointers.

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Capability mapping merged into 12 config adapters
- [x] Six .agents adapters converted to pointers
- [x] .agents/README.md and AGENTS.md updated
- [x] HOT-005 closed with recorded decisions
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed
