# Task Packet: method-standalone-ci

## Goal

Make the portable method repository validate its own CI, evidence, review, and registry controls from a standalone checkout.

## Primary Layer

method

## Dependency Layers

- none

## Harness Profile

- Template: custom
- Overlay: none
- Quality Profile: repository-defined profile
- Portable Failure Class: method-health-gap
- Owner Layer: portable-method
- Coverage Dimensions:
  - maintainability
  - method-health

## Contract Anchors

- `agentic-method-kit/HARNESS_CORE_MODEL.md`
- `agentic-method-kit/HARNESS_COVERAGE_MODEL.md`
- `agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.md`

## Scope

### In

- Validate standalone CI paths for the method repository.
- Require at least one evidence and review artifact in strict method gates.
- Keep project-specific example overlay checks outside the required portable gate.

### Out

- Business-system code changes.
- Project-specific overlay inheritance rule changes.

## Expected Files

### Create

- `.harness/evidence/2026-06-08-method-standalone-ci/commands.json`
- `.harness/evidence/2026-06-08-method-standalone-ci/review.md`

### Modify

- `.github/workflows/harness.yml`
- `scripts/harness/check-evidence.mjs`
- `scripts/harness/check-review.mjs`
- `scripts/harness/check-failure-registry.mjs`
- `scripts/harness/*.test.mjs`

### Do Not Touch

- downstream product repositories
- project-specific foundation repositories

## Implementation Notes

- The portable gate must run with `--root .` from the repository root.
- Example overlay checks may remain as non-blocking reports when overlay directories exist.

## Method Readiness

- Consumer-Specific Controls: none
- Required Sensors: command
- Required Evidence: command summary | review summary
- Ratchet Decision: sensor-added
- Deferred Code Issues: none

## Delivery Governance

- Design Gate: short boundary note
- Development Gate: expected files declared | do-not-touch declared
- QA Acceptance Gate: command
- GitHub Governance Gate: method-gate

## Structural Scope

- Affected Subgraph: `workflow -> harness script -> evidence/review artifact -> report upload`
- Boundary Crossings: `none`
- Risk Nodes: `harness workflow`, `strict evidence gate`, `strict review gate`
- Graph Focus: `none`

## Verification Plan

- `node --test scripts/harness/check-evidence.test.mjs scripts/harness/check-review.test.mjs scripts/harness/check-failure-registry.test.mjs`
- `node scripts/harness/check-task-packet.mjs --root .`
- `node scripts/harness/check-evidence.mjs --strict --root .`
- `node scripts/harness/check-review.mjs --strict --root .`

## Linkage

- Task ID: 2026-06-08-method-standalone-ci
- OpenSpec Change: none
- Plan References: none
- Evidence Directory: .harness/evidence/2026-06-08-method-standalone-ci/
- Review File: .harness/evidence/2026-06-08-method-standalone-ci/review.md

## Evidence Required

- command result summary
- review summary

## Human Gates

- none

## Completion Checklist

- [ ] Layer and boundary declared
- [ ] Quality profile or explicit `none` declared
- [ ] Ratchet decision declared for repeated failures
- [ ] Delivery governance gates declared
- [ ] Contract anchors read
- [ ] Verification run or exception recorded
- [ ] Evidence saved or summarized
- [ ] Review completed
