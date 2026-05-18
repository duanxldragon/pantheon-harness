# Task Packet: cross-tool-review-loop

## Goal

Add reusable implementation, review, and QA prompts plus a PR checklist for the tool-agnostic Harness loop.

## Primary Layer

platform

## Dependency Layers

- system/auth
- system/iam
- system/org
- system/config
- business/*

## Contract Anchors

- `docs/harness/AGENT_INTERFACE_CONTRACT.md`
- `docs/harness/REVIEW_LOOP_SPEC.md`
- `docs/harness/TASK_PACKET_SPEC.md`
- `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`

## Scope

### In

- Create `.agents/prompts/implementation.md`.
- Create `.agents/prompts/review.md`.
- Create `.agents/prompts/qa.md`.
- Create `.github/pull_request_template.md`.
- Update rollout status.
- Record verification evidence.

### Out

- Do not create tool-specific prompt variants.
- Do not change application source code.
- Do not change CI behavior in this task.

## Expected Files

### Create

- `.agents/prompts/implementation.md`
- `.agents/prompts/review.md`
- `.agents/prompts/qa.md`
- `.github/pull_request_template.md`
- `.harness/evidence/2026-05-13-cross-tool-review-loop/summary.md`
- `.harness/evidence/2026-05-13-cross-tool-review-loop/commands.json`

### Modify

- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/tasks/2026-05-13-cross-tool-review-loop.task.md`

### Do Not Touch

- application source code
- CI workflows
- package lock files
- Go modules

## Implementation Notes

- Prompts must reference task packets and evidence, not Codex-only skills.
- Review output must stay findings-first.
- PR checklist must make Harness reports visible without making report-first findings blocking yet.

## Verification Plan

### Backend

- none

### Frontend

- none

### Harness

- `node scripts/harness/check-task-packet.mjs`
- `node scripts/harness/check-evidence.mjs --strict`

## Linkage

- Task ID: 
2026-05-13-cross-tool-review-loop
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-cross-tool-review-loop
/
- Review File: .harness/evidence/
2026-05-13-cross-tool-review-loop
/review.md

## Evidence Required
- command result summary
- known gaps

## Human Gates

- none

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Implementation prompt added
- [x] Review prompt added
- [x] QA prompt added
- [x] PR checklist added
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed



