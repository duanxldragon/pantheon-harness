# Task Packet: ci-harness-gate

## Goal

Add a report-first CI workflow for tool-agnostic Harness checks.

## Primary Layer

platform

## Dependency Layers

- system/auth
- system/iam
- system/org
- system/config
- business/*

## Contract Anchors

- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `scripts/harness/README.md`

## Scope

### In

- Create `.github/workflows/harness.yml`.
- Add `scripts/harness/check-evidence.mjs`.
- Run task packet and evidence checks as blocking structural checks.
- Run boundary, backend response, permission, and audit checks in report-only mode.
- Upload JSON reports as CI artifacts.
- Record verification evidence.

### Out

- Do not make boundary findings block CI yet.
- Do not remediate existing backend warnings in this task.
- Do not change application source code.
- Do not add external Node dependencies.

## Expected Files

### Create

- `.github/workflows/harness.yml`
- `scripts/harness/check-evidence.mjs`
- `.harness/evidence/2026-05-13-ci-harness-gate/summary.md`
- `.harness/evidence/2026-05-13-ci-harness-gate/commands.json`

### Modify

- `scripts/harness/README.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/tasks/2026-05-13-ci-harness-gate.task.md`
- `.harness/evidence/2026-05-13-check-audit-coverage-script/commands.json`

### Do Not Touch

- application source code
- Go modules
- package lock files

## Implementation Notes

- Keep CI tool-agnostic: the workflow calls shared scripts, not Codex skills.
- Structural invalid task packets or evidence should fail CI.
- Contract reports should be uploaded while the rollout is still report-first.

## Verification Plan

### Backend

- none

### Frontend

- none

### Harness

- `node --check scripts/harness/check-evidence.mjs`
- `node scripts/harness/check-evidence.mjs --strict`
- `node scripts/harness/check-task-packet.mjs`
- `node scripts/harness/check-boundaries.mjs`
- `node scripts/harness/check-backend-response-contract.mjs`
- `node scripts/harness/check-permission-contract.mjs`
- `node scripts/harness/check-audit-coverage.mjs`

## Linkage

- Task ID: 
2026-05-13-ci-harness-gate
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-ci-harness-gate
/
- Review File: .harness/evidence/
2026-05-13-ci-harness-gate
/review.md

## Evidence Required
- command result summary
- report-only finding and warning summary
- known gaps

## Human Gates

- none

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Evidence checker added
- [x] CI workflow added
- [x] Usage documented
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed



