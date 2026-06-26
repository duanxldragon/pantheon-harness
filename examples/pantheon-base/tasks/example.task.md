# Task Packet: example

## Goal

Demonstrate the minimum valid task packet.

## Primary Layer

platform

## Dependency Layers

- none

## Harness Profile

- Template: custom
- Overlay: none
- Quality Profile: none
- Portable Failure Class: method-health-gap
- Owner Layer: portable-method
- Coverage Dimensions:
  - method-health

## Contract Anchors

- `docs/contracts/example.md`

## Scope

### In

- validate the portable method kit fixture

### Out

- any real implementation work

## Assumptions and Open Questions

- Confirmed Facts: `example.task.md` is a fixture consumed by method checks
- Working Assumptions: no repository-specific runtime behavior is needed for this fixture
- Open Questions: none

## Expected Files

### Create

- `.harness/evidence/example/commands.json`
- `.harness/evidence/example/review.md`

### Modify

- none

### Do Not Touch

- `src/`

## Implementation Notes

- fixture only

## Minimum Viable Approach

- Selected Rung: `small local code`
- Why This Is Enough: the fixture only needs enough structure to exercise the checker
- Upgrade Trigger: `none`

## Success Criteria

- Behaviour Outcome: the sample task packet passes the mechanical checker
- Verification Signal: `node agentic-method-kit/scripts/check-task-packet.mjs --root agentic-method-kit/examples/minimal-repo`
- Regression Watch: required linkage and checklist fields stay present

## Method Readiness

- Consumer-Specific Controls: none
- Required Sensors: command | review
- Required Evidence: command summary | review summary
- Ratchet Decision: template-updated
- Deferred Code Issues: none

## Delivery Governance

- Design Gate: short boundary note
- Development Gate: expected files declared | do-not-touch declared
- QA Acceptance Gate: command | human review
- GitHub Governance Gate: method-gate

## Execution Roles

- Implementer Posture: `fixture-author`
- Reviewer Posture: `mechanical`

## Stop Points

- `none`

## State Plan

- Checkpoint Expectation: `none`
- Resume Artifacts: `none`

## Structural Scope

- Affected Subgraph: `task packet -> evidence -> review`
- Boundary Crossings: `none`
- Risk Nodes: `none`
- Graph Focus: `cycle-check | hub-check`

## Verification Plan

- `node agentic-method-kit/scripts/check-task-packet.mjs --root agentic-method-kit/examples/minimal-repo`

## Linkage

- Task ID: example
- OpenSpec Change: openspec/changes/example-change/
- Plan References: docs/superpowers/plans/example-plan.md
- Evidence Directory: .harness/evidence/example/
- Review File: .harness/evidence/example/review.md

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
