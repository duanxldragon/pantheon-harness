# Task Packet: tool-agnostic-harness-bootstrap

## Goal

Establish the first tool-agnostic Harness Engineering protocol layer for Pantheon without locking the workflow to Codex.

## Primary Layer

platform

## Dependency Layers

- none

## Contract Anchors

- `docs/WORKSPACE_INHERITANCE.md`
- `pantheon-base/AGENTS.md`
- `pantheon-ops/AGENTS.md`
- `pantheon-base/docs/designs/WORKFLOW.md`
- `pantheon-base/docs/acceptances/CODE_REVIEW_STANDARD.md`

## Scope

### In

- Add tool-agnostic harness protocol docs.
- Add cross-tool agent adapter docs.
- Add JSON schemas for task packet and verification evidence.
- Wire root README and base/ops AGENTS files to the new protocol.
- Add rollout plan for future implementation phases.

### Out

- Do not implement CI harness gates yet.
- Do not add mechanical check scripts yet.
- Do not modify application runtime code.
- Do not change base/ops inheritance behavior.

## Expected Files

### Create

- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/AGENT_INTERFACE_CONTRACT.md`
- `docs/harness/TASK_PACKET_SPEC.md`
- `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
- `docs/harness/REVIEW_LOOP_SPEC.md`
- `docs/harness/TOOL_ADAPTERS.md`
- `docs/harness/INHERITANCE_HARNESS_PROTOCOL.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `.agents/README.md`
- `.agents/adapters/codex.md`
- `.agents/adapters/claude-code.md`
- `.agents/adapters/cursor.md`
- `.agents/adapters/github-copilot.md`
- `.agents/adapters/openhands.md`
- `.agents/adapters/human.md`
- `.agents/schemas/task-packet.schema.json`
- `.agents/schemas/verification-evidence.schema.json`

### Modify

- `README.md`
- `pantheon-base/AGENTS.md`
- `pantheon-ops/AGENTS.md`

### Do Not Touch

- application source code
- CI workflows
- package lock files
- Go modules

## Implementation Notes

- `docs/harness/*` is the source of truth.
- `.agents/adapters/*` maps the source of truth to individual tools.
- `.codex/skills/*` remains useful but is Codex-specific.
- This task is documentation-only; verification should focus on discoverability and file presence.

## Verification Plan

### Backend

- none

### Frontend

- none

### Documentation

- `rg -n "HARNESS_ENGINEERING_CONTRACT|AGENT_INTERFACE_CONTRACT|TASK_PACKET_SPEC|VERIFICATION_EVIDENCE_SPEC|REVIEW_LOOP_SPEC|INHERITANCE_HARNESS_PROTOCOL" README.md pantheon-base/AGENTS.md pantheon-ops/AGENTS.md .agents docs/harness`
- `rg --files docs/harness .agents`

## Linkage

- Task ID: 
2026-05-13-tool-agnostic-harness-bootstrap
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-tool-agnostic-harness-bootstrap
/
- Review File: .harness/evidence/
2026-05-13-tool-agnostic-harness-bootstrap
/review.md

## Evidence Required
- command result summary
- changed file list
- known gaps

## Human Gates

- none

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Harness docs created
- [x] Adapter docs created
- [x] Entry points updated
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed



