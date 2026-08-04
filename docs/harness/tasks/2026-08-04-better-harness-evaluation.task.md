# Task Packet: better-harness evaluation

## Goal

Evaluate Better Harness against Pantheon Harness using pinned upstream evidence, executable checks, and explicit adopt/adapt/experiment/reject decisions without implementing method changes.

## Priority

`medium`

## Estimated Complexity

`moderate`

## Primary Layer

method

## Dependency Layers

- none

## Dependencies

- blockedBy: none
- blocks: future maintainer-approved improvement task packets

## Harness Profile

- Template: docs-governance
- Overlay: none
- Quality Profile: portable-method
- Owner Layer: portable-method
- Coverage Dimensions:
  - maintainability
  - method-health
  - architecture-fitness

## Contract Anchors

- `patterns/harness-core-model.md`
- `architecture/harness/task-packet-spec.md`
- `architecture/harness/verification-evidence-spec.md`
- `architecture/harness/failure-registry.md`
- `architecture/methodology/harness-methodology.zh.md`
- `architecture/methodology/evolution.md`

## Scope

### In

- Compare Better Harness commit `4cd2fdb340631ebc726d1f7b617f997511aca9e8` with Pantheon Harness v1.4.0.
- Map upstream capabilities into Pantheon's six control planes.
- Verify claimed gaps against Pantheon's current contracts, scripts, schemas, adapters, and tests.
- Run local and upstream validation that is compatible with the current environment.
- Classify candidates as adopt, adapt, experiment, or reject.
- Produce an evidence-backed report, prioritized recommendations, explicit non-goals, and future task-packet outlines.

### Out

- No changes to Pantheon method contracts, schemas, scripts, adapters, or runtime behavior.
- No implementation of Better Harness features.
- No changes to `pantheon-base` or `pantheon-ops`.
- No overwrite of `research/better-harness-analysis.md`.
- No maturity score presented as an observed outcome without comparable Task Episodes.

## Assumptions and Open Questions

- Confirmed Facts:
  - Better Harness is pinned to commit `4cd2fdb` and declares MIT licensing.
  - Pantheon already has Failure Registry, graph review, runtime evidence, Task Packet linkage, host adapter documents, and method-health checks.
  - WorkBuddy is adapter support in Better Harness, not a shipped install shell or verified Quickstart.
  - The maintainer authorized CodeGraph initialization only inside the `pantheon-harness` project directory.
- Working Assumptions:
  - Evaluation results should prefer extension of existing Pantheon owners over new parallel taxonomies.
  - A report and backlog recommendation are sufficient for this task; implementation remains separately gated.
- Open Questions: none

## Structural Scope

### Scope Quantification

- Modules affected: research documentation and task evidence only
- Files: create 4, modify 0, delete 0
- API endpoints: 0
- Database migrations: no

### Risk Nodes

1. Upstream documentation can overstate exercised behavior; executable claims require tests or an explicit evidence limit.
2. Existing local draft contains claims contradicted by current Pantheon and upstream artifacts; the final report must distinguish corrections from new findings.
3. Session-evidence recommendations can create privacy and runtime-lock-in risk if treated as default gates.

### Legacy Fields (for compatibility)

- Affected Subgraph: upstream evidence -> capability mapping -> evaluation report -> future maintainer decision
- Boundary Crossings: external upstream -> portable-method
- Risk Nodes: evidence accuracy, taxonomy duplication, privacy, maintenance cost
- Graph Focus: none

## Expected Files

### Create

- `research/better-harness-evaluation-2026-08-04.md`
- `.harness/evidence/2026-08-04-better-harness-evaluation/commands.json`
- `.harness/evidence/2026-08-04-better-harness-evaluation/review.md`
- `.harness/evidence/2026-08-04-better-harness-evaluation/upstream-validation.md`

### Modify

- none

### Do Not Touch

- `research/better-harness-analysis.md`
- `architecture/**`, `patterns/**`, `scripts/**`, `verify/**`, `config/**`
- downstream repositories

## Implementation Notes

- Use pinned GitHub permalinks for upstream citations.
- Label each material statement as evidence, inference, or unknown when the distinction matters.
- Treat configured assets and static collectors as weaker evidence than exercised routes.
- Keep mechanism-effectiveness assessment separate from transactional command evidence.

## Minimum Viable Approach

- Selected Rung: L1 evidence-backed documentation evaluation
- Why This Is Enough: the task decides what deserves implementation; it does not change method semantics or runtime behavior
- Upgrade Trigger: any accepted recommendation that changes shared contracts, schemas, gates, adapters, privacy boundaries, or dependencies becomes a separate L2 task

## Success Criteria

- Behaviour Outcome:
  - The report identifies where Better Harness is stronger, where Pantheon is stronger, and where the approaches are orthogonal.
  - Every candidate has a disposition, confidence, rationale, owner, verification path, and non-goals.
  - Unsupported claims from the prior draft are explicitly corrected.
- Verification Signal:
  - Pantheon test and strict governance gates pass.
  - Better Harness tests/package verification pass, or exact blockers and confidence impact are recorded.
  - CodeGraph status is healthy for `pantheon-harness` and structural claims use its evidence where applicable.
- Regression Watch: no existing source or research draft is modified.
- Economics Watch: avoid cloning Better Harness product surface into Pantheon without a named consumer and owner.

## Context Strategy

- Entry Sources: accepted evaluation plan, Pantheon canonical method docs, Better Harness pinned source and tests
- Retrieval Order: contracts -> executable code/tests -> supporting docs -> prior draft
- Retrieval Helpers: CodeGraph for Pantheon structure; pinned local clone for upstream evidence
- Promotion Target: final research report and maintainer-prioritized future backlog
- Response Budget: detailed
- Sensitive Context: no user-home or raw session transcripts are read

## Method Readiness

- Consumer-Specific Controls: none
- Required Sensors: command | review | graph
- Required Evidence: command summary | upstream validation summary | review summary
- Ratchet Decision: no-repeat-observed; evaluation only
- Deferred Code Issues: all implementation candidates remain deferred pending maintainer prioritization

## Execution Roles

- Implementer Posture: research/evaluation author
- Reviewer Posture: evidence-first self-review against the accepted plan

## Stop Points

- Stop after the assessment, evidence, and review artifacts pass gates.
- Do not implement recommendations without a new maintainer-approved task packet.

## Technical Debt

- technicalDebtFlag: no
- technicalDebtNote: none created by the evaluation; recommendations must state their own maintenance cost.

## Rollback Plan

- Trigger Condition: report cannot be supported by pinned evidence or governance gates fail due to the new artifacts
- Rollback Steps:
  1. Remove only the new task packet, report, and matching evidence directory.
- Rollback Verification:
  - [ ] `git status --short` shows only pre-existing user changes and local CodeGraph state

## State Plan

- Checkpoint Expectation: accepted plan + task packet + evidence directory
- Resume Artifacts: this task packet, final report, upstream validation summary, commands.json, review.md

## Verification Plan

### Backend

- `node --test scripts/harness/*.test.mjs`
- `node --test verify/scripts/*.test.mjs`
- `node scripts/harness/check-doc-frontmatter.mjs --root . --strict`
- `node scripts/harness/check-doc-links.mjs --root . --strict`
- `node scripts/harness/check-doc-inventory.mjs --root . --strict`
- `node scripts/harness/check-task-packet.mjs --root .`
- `node scripts/harness/check-evidence.mjs --root . --strict`
- `node scripts/harness/check-review.mjs --root . --strict`
- `node scripts/harness/check-adoption.mjs --strict`
- `node scripts/harness/check-method-health.mjs --strict`
- Better Harness: `npm ci`, `npm test`, `npm run pack:verify`

### Frontend

- none

### Browser / Smoke

- none

## Linkage

- Task ID: 2026-08-04-better-harness-evaluation
- OpenSpec Change: none
- Plan References: ../.omx/plans/2026-08-04-pantheon-harness-better-harness-evaluation.md
- Evidence Directory: .harness/evidence/2026-08-04-better-harness-evaluation/
- Review File: .harness/evidence/2026-08-04-better-harness-evaluation/review.md

## Evidence Required

- command result summary
- upstream validation summary
- review summary
- exact evidence gaps for skipped or unavailable checks

## Human Gates

- Maintainer approved the evaluation plan and authorized project-local CodeGraph initialization.
- Recommendation prioritization and all implementation decisions remain a later maintainer gate.

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Upstream baseline pinned
- [x] Capability map completed
- [x] Contradiction pass completed
- [x] Verification run or exception recorded
- [x] Report completed
- [x] Evidence saved or summarized
- [x] Review completed
