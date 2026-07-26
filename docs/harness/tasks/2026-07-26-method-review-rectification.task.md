# Task Packet: method review rectification

## Goal

Close the six findings from the 2026-07-26 methodology review: activate the idle failure-registry/coverage-review loops, convert the playbook reading list into a tier-driven one-page entry, sink the three-touchpoint contract into agent adapters, add a gate-outcome line to closeout, fix playbook contract-name casing drift, and declare language canonicality plus scope the doc-projection consolidation as an open task.

## Priority

`high`

## Estimated Complexity

`moderate`

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

- `architecture/harness/harness-method-playbook.md`
- `architecture/harness/failure-registry.md`
- `architecture/methodology/workflow-routing.md`
- `architecture/methodology/solo-delivery-tiers.md`
- `patterns/templates/harness-coverage-review.template.md`

## Scope

### In

- Fix uppercase legacy contract references in `harness-method-playbook.md` / `.en.md` to actual lowercase file paths.
- Rewrite the playbook 15-step reading order into a tier-driven entry (L0/L1/L2/Proto -> 2-3 required docs each, rest by link).
- Add a compact three-touchpoint contract section to `config/agents/adapters/*.md` (en + zh) linking to the canonical definition in `workflow-routing.md`.
- Add a gate-outcome closeout line (which gate caught what / false-positived) to `solo-delivery-tiers.md` closeout requirements and reference it as a data source in the coverage-review template.
- Update `architecture/harness/failure-registry.md`: register FR-004 (playbook casing drift) and FR-005 (registry cadence lapse), refresh last-reviewed, update review notes.
- Complete one harness coverage review artifact from the template covering this review cycle.
- Declare Chinese as canonical documentation language with English as best-effort projection (recorded in playbook + coverage review).
- Register the architecture/harness vs patterns projection consolidation as a scoped item in `docs/harness/harness-open-tasks.md`.

### Out

- No mass consolidation of the ~196 markdown projections in this task (registered as open task instead).
- No changes to validation scripts (`scripts/harness/**`) or their fixtures.
- No changes to consumer repos (pantheon-base, pantheon-ops).
- No VERSION bump (no method semantics change; playbook restructure and registry activation only).

## Assumptions and Open Questions

- Confirmed Facts:
  - Playbook step 14 references uppercase contract names; actual files under `docs/harness/` are lowercase and exist.
  - Failure registry last-reviewed 2026-06-08 predates v1.3.0/v1.4.0 releases despite an after-each-release cadence.
  - No completed harness coverage review artifact exists in the repository.
  - Maintainer authorized completing all six rectification items in one pass (2026-07-26).
- Working Assumptions:
  - Chinese-canonical / English-best-effort matches the solo maintainer's working language (several load-bearing docs are already Chinese-only).
- Open Questions: none

## Structural Scope

### Scope Quantification

- Modules affected: method docs only
- Files: ~20 (create 2, modify ~18, delete 0)
- API endpoints: 0
- Database migrations: no

### Risk Nodes

1. Playbook rewrite could break links that check-doc-links validates — run gates after edit.
2. Registry/coverage artifacts must satisfy check-failure-registry / check-method-health strict modes — validate before closeout.

### Legacy Fields (for compatibility)

- Affected Subgraph: playbook entry -> tier routing -> adapters -> closeout spec -> registry/coverage loop
- Boundary Crossings: portable-method only
- Risk Nodes: none beyond above
- Graph Focus: none

## Expected Files

### Create

- `.harness/evidence/2026-07-26-method-review-rectification/` (commands.json, review.md, coverage-review artifact)

### Modify

- `architecture/harness/harness-method-playbook.md` / `.en.md`
- `architecture/harness/failure-registry.md`
- `architecture/methodology/solo-delivery-tiers.md`
- `config/agents/adapters/*.md` (en + zh)
- `config/agents/prompts/*.md` (en + zh, casing fix only)
- `patterns/templates/harness-coverage-review.template.md`
- `docs/harness/harness-open-tasks.md`

### Do Not Touch

- `scripts/harness/**`, `verify/**`
- Historical task packets and evidence directories
- `patterns/*.md` core model documents (no semantics change this round)

## Implementation Notes

- Playbook must keep its frontmatter shape (check-doc-frontmatter strict).
- Adapter additions stay short: 3-5 lines plus a link; the canonical contract remains in workflow-routing.md — no double-write of the full rule text.
- Gate-outcome line is advisory (guide-level), not a new mechanical sensor: per sensor-placement policy, false-positive risk of enforcing it mechanically is high until the habit produces data.

## Minimum Viable Approach

- Selected Rung: docs governance / method maintenance
- Why This Is Enough: all six findings are guide/state-layer fixes; no new sensors or code needed
- Upgrade Trigger: if gate-outcome records accumulate and prove useful, promote to a mechanical closeout check in a future cycle

## Success Criteria

- Behaviour Outcome:
  - Playbook opens with a tier-driven entry; no uppercase phantom references remain.
  - Every agent adapter surfaces the three-touchpoint contract.
  - Failure registry has FR-004/FR-005 with fresh review date; one completed coverage review artifact exists.
  - Language canonicality is declared; consolidation is a scoped open task.
- Verification Signal:
  - `node --test scripts/harness/*.test.mjs` passes.
  - All README-listed check gates pass (frontmatter, links, inventory, task-packet, evidence --strict, review --strict, adoption --strict, method-health --strict, failure-registry via method-health).
- Regression Watch: existing doc links and historical artifacts keep validating.
- Economics Watch: none

## Context Strategy

- Entry Sources: 2026-07-26 methodology review findings (this session), playbook, failure-registry, workflow-routing
- Retrieval Order: entry -> summary -> raw
- Retrieval Helpers: none
- Promotion Target: failure registry entries + coverage review artifact + open task
- Response Budget: standard
- Sensitive Context: none

## Method Readiness

- Consumer-Specific Controls: none
- Required Sensors: command | review
- Required Evidence: command summary | review summary
- Ratchet Decision: guide-updated (FR-004), state-updated (FR-005); sensor extension for backtick paths considered and rejected for false-positive risk
- Deferred Code Issues: none

## Execution Roles

- Implementer Posture: method maintainer agent
- Reviewer Posture: self-review, findings-first (solo maintainer; recorded in review.md)

## Stop Points

- none

## Technical Debt

- technicalDebtFlag: yes
- technicalDebtNote: doc projection duplication (architecture/harness vs patterns vs docs/harness, en/zh) remains; consolidation registered in harness-open-tasks.md with scope and owner.

## Rollback Plan

- Trigger Condition: gates fail irrecoverably or playbook restructure loses required content
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

### Browser / Smoke

- none

## Linkage

- Task ID: 2026-07-26-method-review-rectification
- OpenSpec Change: none
- Plan References: .harness/evidence/2026-07-26-method-review-rectification/coverage-review-2026-07-26.md
- Evidence Directory: .harness/evidence/2026-07-26-method-review-rectification/
- Review File: .harness/evidence/2026-07-26-method-review-rectification/review.md

## Evidence Required

- command result summary
- review summary
- coverage review artifact

## Human Gates

- Maintainer authorized full rectification pass and sequencing (2026-07-26).
- Language canonicality choice (Chinese canonical / English best-effort) surfaced for maintainer confirmation at final acceptance; reversible if overruled.

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Playbook casing drift fixed
- [x] Playbook converted to tier-driven entry
- [x] Three-touchpoint contract in all adapters
- [x] Gate-outcome closeout line added
- [x] FR-004/FR-005 registered, registry review refreshed
- [x] Coverage review artifact completed
- [x] Language canonicality declared; consolidation open task registered
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed
