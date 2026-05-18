# Task Packet: visual-evidence-gate

## Goal

Add a report-only Harness check for UI visual evidence plans and screenshot/browser evidence gaps.

## Primary Layer

platform

## Dependency Layers

- none

## Contract Anchors

- `docs/harness/VISUAL_QUALITY_PROTOCOL.md`
- `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
- `docs/harness/TASK_PACKET_SPEC.md`

## Scope

### In

- Add `scripts/harness/check-visual-evidence.mjs`.
- Wire the check into CI report artifact generation.
- Document the script in `scripts/harness/README.md`.
- Update `docs/harness/HARNESS_OPEN_TASKS.md`.
- Record verification evidence.

### Out

- Do not introduce a browser dependency.
- Do not make visual evidence warnings block CI.
- Do not require Percy, Chromatic, or another external visual diff service.

## Expected Files

### Create

- `scripts/harness/check-visual-evidence.mjs`
- `docs/harness/tasks/2026-05-13-visual-evidence-gate.task.md`
- `.harness/evidence/2026-05-13-visual-evidence-gate/summary.md`
- `.harness/evidence/2026-05-13-visual-evidence-gate/commands.json`

### Modify

- `.github/workflows/harness.yml`
- `scripts/harness/README.md`
- `docs/harness/HARNESS_OPEN_TASKS.md`

### Do Not Touch

- application source code
- package lock files
- Go modules

## Implementation Notes

- The first version is report-only and emits warnings only.
- The check reads task packets and matching `.harness/evidence/<task-id>/` directories.
- UI task packets are expected to declare desktop/mobile viewport plans and empty/loading/error/permission state plans.
- UI evidence is expected to contain screenshots, browser evidence, or a recorded reason why rendered evidence was not produced.

## Verification Plan

### Backend

- none

### Frontend

- none

### Harness

- `node --check scripts/harness/check-visual-evidence.mjs`
- `node scripts/harness/check-visual-evidence.mjs --strict`
- `node scripts/harness/check-visual-evidence.mjs --json`
- `node scripts/harness/check-task-packet.mjs`
- `node scripts/harness/check-evidence.mjs --strict`

## Linkage

- Task ID: 
2026-05-13-visual-evidence-gate
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-visual-evidence-gate
/
- Review File: .harness/evidence/
2026-05-13-visual-evidence-gate
/review.md

## Evidence Required
- command result summary
- report-only warning summary
- known gaps

## Human Gates

- none

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Tests or checks updated
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Docs updated if contracts changed
- [x] Review completed



