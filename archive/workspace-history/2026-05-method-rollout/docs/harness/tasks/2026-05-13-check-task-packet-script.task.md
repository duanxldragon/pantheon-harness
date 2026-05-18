# Task Packet: check-task-packet-script

## Goal

Add the first tool-agnostic mechanical Harness check for validating task packet structure.

## Primary Layer

platform

## Dependency Layers

- none

## Contract Anchors

- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/TASK_PACKET_SPEC.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`

## Scope

### In

- Create `scripts/harness/check-task-packet.mjs`.
- Add local usage documentation for harness scripts.
- Verify existing task packets pass the checker.
- Record verification evidence.

### Out

- Do not add CI workflow integration yet.
- Do not make the checker block PRs yet.
- Do not implement boundary, response, permission, or audit checks in this task.

## Expected Files

### Create

- `scripts/harness/check-task-packet.mjs`
- `scripts/harness/README.md`
- `.harness/evidence/2026-05-13-check-task-packet-script/summary.md`
- `.harness/evidence/2026-05-13-check-task-packet-script/commands.json`

### Modify

- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/tasks/2026-05-13-check-task-packet-script.task.md`

### Do Not Touch

- application source code
- CI workflows
- package lock files
- Go modules

## Implementation Notes

- The checker must be dependency-free and runnable with Node.
- The checker should default to `docs/harness/tasks/*.task.md`.
- The checker should support explicit file paths as arguments.
- The checker should support a machine-readable `--json` mode.
- The checker should fail on structural errors and report warnings for softer issues.

## Verification Plan

### Backend

- none

### Frontend

- none

### Harness

- `node scripts/harness/check-task-packet.mjs`
- `node scripts/harness/check-task-packet.mjs --json`
- `node scripts/harness/check-task-packet.mjs docs/harness/tasks/2026-05-13-check-task-packet-script.task.md`

## Linkage

- Task ID: 
2026-05-13-check-task-packet-script
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-check-task-packet-script
/
- Review File: .harness/evidence/
2026-05-13-check-task-packet-script
/review.md

## Evidence Required
- command result summary
- machine-readable command output path or summary
- known gaps

## Human Gates

- none

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Script created
- [x] Usage documented
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed



