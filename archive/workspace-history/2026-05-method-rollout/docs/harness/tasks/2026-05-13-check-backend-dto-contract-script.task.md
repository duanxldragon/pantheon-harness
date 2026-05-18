# Task Packet: check-backend-dto-contract-script

## Goal

Add a report-first backend DTO contract checker for handler response DTO risks.

## Primary Layer

platform

## Dependency Layers

- system/*

## Contract Anchors

- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`

## Scope

### In

- Create `scripts/harness/check-backend-dto-contract.mjs`.
- Add Node test coverage for warning and pass cases.
- Document usage in `scripts/harness/README.md`.
- Add report-first CI artifact output.
- Record verification evidence.

### Out

- Do not change backend application handlers or DTOs.
- Do not turn DTO warnings into blocking findings.
- Do not address business boundary, permission, or audit debt.

## Expected Files

### Create

- `scripts/harness/check-backend-dto-contract.mjs`
- `scripts/harness/check-backend-dto-contract.test.mjs`
- `.harness/evidence/2026-05-13-check-backend-dto-contract-script/summary.md`
- `.harness/evidence/2026-05-13-check-backend-dto-contract-script/commands.json`

### Modify

- `scripts/harness/README.md`
- `.github/workflows/harness.yml`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/HARNESS_OPEN_TASKS.md`

### Do Not Touch

- `pantheon-base/backend/**`
- `pantheon-ops/backend/**`
- frontend application source

## Implementation Notes

- The checker must be dependency-free and runnable with Node.
- The checker should support `--json`, `--strict`, and `--root`.
- The checker should report conservative DTO risks as warnings.
- Strict mode should fail only on findings so existing DTO debt can be triaged before becoming blocking.

## Verification Plan

### Backend

- none

### Frontend

- none

### Harness

- `node --check scripts/harness/check-backend-dto-contract.mjs`
- `node --test scripts/harness/check-backend-dto-contract.test.mjs`
- `node scripts/harness/check-backend-dto-contract.mjs`
- `node scripts/harness/check-backend-dto-contract.mjs --json`
- `node scripts/harness/check-backend-dto-contract.mjs --strict`
- `node scripts/harness/check-task-packet.mjs`
- `node scripts/harness/check-evidence.mjs --strict`

## Linkage

- Task ID: 
2026-05-13-check-backend-dto-contract-script
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-check-backend-dto-contract-script
/
- Review File: .harness/evidence/
2026-05-13-check-backend-dto-contract-script
/review.md

## Evidence Required
- command result summary
- warning count from real repository scan
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



