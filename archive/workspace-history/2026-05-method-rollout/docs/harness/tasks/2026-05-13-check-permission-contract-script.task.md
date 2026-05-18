# Task Packet: check-permission-contract-script

## Goal

Add a conservative report-first Harness checker for obvious permission contract drift.

## Primary Layer

platform

## Dependency Layers

- system/iam
- business/*

## Contract Anchors

- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `pantheon-base/AGENTS.md`
- `pantheon-ops/AGENTS.md`
- `pantheon-base/docs/designs/PERMISSION_MODEL.md`

## Scope

### In

- Create `scripts/harness/check-permission-contract.mjs`.
- Detect action menu seeds using `*:list` permissions.
- Detect direct frontend permission checks using `*:list` near action wording.
- Report softer list-permission action-adjacent cases as warnings.
- Document usage in `scripts/harness/README.md`.
- Record verification evidence.

### Out

- Do not change permission seeds or frontend module declarations in this task.
- Do not add CI integration yet.
- Do not attempt full semantic permission graph validation.

## Expected Files

### Create

- `scripts/harness/check-permission-contract.mjs`
- `.harness/evidence/2026-05-13-check-permission-contract-script/summary.md`
- `.harness/evidence/2026-05-13-check-permission-contract-script/commands.json`

### Modify

- `scripts/harness/README.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/tasks/2026-05-13-check-permission-contract-script.task.md`

### Do Not Touch

- application source code
- CI workflows
- package lock files
- Go modules

## Implementation Notes

- This first checker is intentionally conservative to avoid treating page/navigation `*:list` permissions as action violations.
- Default mode exits 0 even with findings; `--strict` exits 1 when findings exist.
- Warnings do not fail strict mode.

## Verification Plan

### Backend

- none

### Frontend

- none

### Visual

- desktop viewport: not run; this task creates a static permission contract checker and does not change rendered UI.
- mobile viewport: not run; this task creates a static permission contract checker and does not change responsive UI.
- empty/loading/error/permission states: not applicable to rendered pages; permission state semantics are checked statically by the harness script.
- screenshot evidence: not required; `.harness/evidence/2026-05-13-check-permission-contract-script/summary.md` records the no-UI reason.

### Harness

- `node --check scripts/harness/check-permission-contract.mjs`
- `node scripts/harness/check-permission-contract.mjs`
- `node scripts/harness/check-permission-contract.mjs --json`
- `node scripts/harness/check-permission-contract.mjs --strict`
- `node scripts/harness/check-task-packet.mjs`

## Linkage

- Task ID: 
2026-05-13-check-permission-contract-script
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-check-permission-contract-script
/
- Review File: .harness/evidence/
2026-05-13-check-permission-contract-script
/review.md

## Evidence Required
- command result summary
- permission findings and warnings summary
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



