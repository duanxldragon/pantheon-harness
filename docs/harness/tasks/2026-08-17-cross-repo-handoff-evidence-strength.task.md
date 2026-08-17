---
title: Add cross-repository handoff context and evidence strength
doc_type: Remediation
layer: method
status: Active
updated_at: 2026-08-17
linked_contracts:
  - architecture/harness/task-packet-spec.md
  - architecture/harness/verification-evidence-spec.md
  - architecture/harness/handoff-protocol.md
---

# Task Packet: 2026-08-17-cross-repo-handoff-evidence-strength

## Goal

Make cross-repository ownership, release/sync obligations, and evidence strength portable and mechanically checkable so a stateless tool can resume work without chat memory.

## Priority

`high`

## Estimated Complexity

`complex`

## Primary Layer

method

## Dependency Layers

- none

## Dependencies

- blockedBy: none
- blocks: 2026-08-17-foundation-cross-repo-handoff-adoption

## Harness Profile

- Template: docs-governance
- Overlay: none
- Quality Profile: portable-method
- Portable Failure Class: task-boundary-gap
- Owner Layer: portable-method
- Coverage Dimensions:
  - maintainability
  - architecture-fitness
  - method-health

## Workspace Context

- Target Repository: pantheon-harness
- Repository Role: method-source
- Upstream Dependencies: none
- Downstream Consumers: pantheon-base, pantheon-ops
- Sync Expectation: required
- Release Requirement: method-release

## Contract Anchors

- `architecture/harness/task-packet-spec.md`
- `architecture/harness/verification-evidence-spec.md`
- `architecture/harness/handoff-protocol.md`
- `patterns/templates/task-packet.template.md`
- `verify/schemas/task-packet.schema.json`
- `verify/schemas/verification-evidence.schema.json`

## Scope

### In

- Add a portable `Workspace Context` contract for cross-repository tasks.
- Validate the context when present and require it for explicit `inheritance-sync` or `cross-repository` primary layers.
- Add an optional evidence-strength state using a fixed six-state vocabulary.
- Keep the repository-local and portable checker implementations semantically aligned without overwriting their distinct behavior.
- Add small stateless handoff and task-status templates.

### Out

- No product or business code changes.
- No workflow engine, distributed state service, or new dependency.
- No automatic network release or downstream repository mutation.
- No modification of `research/better-harness-analysis.md`.

## Assumptions and Open Questions

- Confirmed Facts: existing task/evidence contracts lack machine-validated repository ownership and evidence-strength fields; the two checker trees are intentionally not byte-identical.
- Working Assumptions: conditional validation preserves historical packets while making new cross-repository packets fail closed.
- Open Questions: none

## Structural Scope

- Affected Subgraph: task template -> task packet checker/schema -> handoff artifact -> evidence checker/schema -> consumer adoption
- Boundary Crossings: method-source -> foundation-source -> business-consumer
- Risk Nodes: historical task compatibility, duplicated portable checker surfaces, release compatibility
- Graph Focus: none

## Expected Files

### Create

- `patterns/templates/handoff.template.md`
- `patterns/templates/task-status.template.md`
- `.harness/state/2026-08-17-cross-repo-handoff-evidence-strength/status.md`
- `.harness/evidence/2026-08-17-cross-repo-handoff-evidence-strength/summary.md`
- `.harness/evidence/2026-08-17-cross-repo-handoff-evidence-strength/commands.json`
- `.harness/evidence/2026-08-17-cross-repo-handoff-evidence-strength/review.md`
- `.harness/evidence/2026-08-17-cross-repo-handoff-evidence-strength/handoff.md`

### Modify

- `architecture/harness/task-packet-spec.md`
- `architecture/harness/task-packet-spec.en.md`
- `architecture/harness/verification-evidence-spec.md`
- `architecture/harness/verification-evidence-spec.en.md`
- `architecture/harness/handoff-protocol.md`
- `patterns/templates/task-packet.template.md`
- `scripts/harness/check-task-packet.mjs`
- `scripts/harness/check-task-packet.test.mjs`
- `scripts/harness/check-evidence.mjs`
- `scripts/harness/check-evidence.test.mjs`
- `verify/scripts/check-task-packet.mjs`
- `verify/scripts/check-task-packet.test.mjs`
- `verify/scripts/check-evidence.mjs`
- `verify/scripts/check-evidence.test.mjs`
- `verify/schemas/task-packet.schema.json`
- `verify/schemas/verification-evidence.schema.json`
- `CHANGELOG.md`
- `patterns/changelog.md`

### Do Not Touch

- `research/better-harness-analysis.md`
- downstream repositories until this task passes its own method gates
- product implementation directories

## Implementation Notes

- A normal single-repository task remains valid without `Workspace Context`.
- A task using primary layer `inheritance-sync` or `cross-repository` must include all six workspace fields.
- Evidence strength records what a claim supports, not task progress or command status.
- Keep network release and downstream lock updates explicit; do not infer they happened from local source changes.

## Minimum Viable Approach

- Selected Rung: small local code
- Why This Is Enough: existing Markdown/JSON contracts and validators can express the new semantics without dependencies or a workflow engine.
- Upgrade Trigger: repeated ambiguity that cannot be represented by the six fields or six evidence states.

## Success Criteria

- Behaviour Outcome: a new cross-repository packet missing workspace context fails, historical ordinary packets remain valid, and invalid evidence-strength values fail.
- Verification Signal: both checker test suites and strict Harness governance gates pass.
- Regression Watch: existing linkage, runtime, graph, and session-economics validation behavior remains unchanged.
- Economics Watch: a stateless successor can identify owner, dependencies, next action, and release/sync stop condition from repository artifacts alone.

## Context Strategy

- Entry Sources: AGENTS.md, current task packet, canonical contracts, checker tests
- Retrieval Order: contract -> checker/schema -> tests -> evidence
- Retrieval Helpers: literal file reads for Markdown/JSON contracts; CodeGraph is not required for isolated validator scripts
- Promotion Target: portable templates and contracts
- Response Budget: standard
- Sensitive Context: none

## Method Readiness

- Consumer-Specific Controls: none
- Required Sensors: command | review
- Required Evidence: command summary | review summary | downstream gap
- Ratchet Decision: gate-updated
- Deferred Code Issues: method release and consumer upgrades remain explicit follow-up gates

## Delivery Governance

- Design Gate: canonical contract changes remain backward compatible for ordinary historical tasks
- Development Gate: both checker surfaces and both test surfaces are updated
- QA Acceptance Gate: strict method-health/adoption plus targeted tests
- GitHub Governance Gate: method-gate

## Execution Roles

- Implementer Posture: method contract implementer
- Reviewer Posture: compatibility and handoff reviewer

## Stop Points

- Stop before publishing a method release or mutating downstream repository locks.
- Stop if historical ordinary packets become invalid because they omit `Workspace Context` or `evidenceState`.

## Technical Debt

- technicalDebtFlag: no
- technicalDebtNote: existing checker trees remain separate because they have distinct repository and kit responsibilities.

## Rollback Plan

- Trigger Condition: strict gates show historical compatibility regression or consumer adoption cannot represent its release boundary.
- Rollback Steps:
  1. Revert only the workspace-context/evidence-state contract, templates, validators, and task artifacts.
- Rollback Verification:
  - [ ] Existing task-packet tests pass
  - [ ] Existing evidence tests pass
  - [ ] Method health passes

## State Plan

- Checkpoint Expectation: `.harness/state/2026-08-17-cross-repo-handoff-evidence-strength/status.md`
- Resume Artifacts: this task packet, status file, evidence summary, handoff report

## Verification Plan

### Backend

- `node --test scripts/harness/*.test.mjs`
- `node --test verify/scripts/*.test.mjs`
- `node scripts/harness/check-task-packet.mjs --root .`
- `node scripts/harness/check-evidence.mjs --root . --strict`
- `node scripts/harness/check-method-health.mjs --strict`
- `node scripts/harness/check-adoption.mjs --strict`

### Frontend

- none

### Browser / Smoke

- none

## Linkage

- Task ID: 2026-08-17-cross-repo-handoff-evidence-strength
- OpenSpec Change: none
- Plan References: none
- Evidence Directory: .harness/evidence/2026-08-17-cross-repo-handoff-evidence-strength/
- Review File: .harness/evidence/2026-08-17-cross-repo-handoff-evidence-strength/review.md

## Evidence Required

- targeted and broad checker command results
- compatibility review
- explicit method-release and downstream-adoption gap
- stateless handoff summary

## Human Gates

- Publishing the next Pantheon Harness method release.
- Accepting the downstream Base and Ops version/lock upgrade sequence.

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [ ] Tests or checks updated
- [ ] Verification run or exception recorded
- [ ] Evidence saved or summarized
- [ ] Docs updated if contracts changed
- [ ] Review completed
