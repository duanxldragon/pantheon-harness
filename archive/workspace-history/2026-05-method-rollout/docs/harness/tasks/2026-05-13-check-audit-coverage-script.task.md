# Task Packet: check-audit-coverage-script

## Goal

Add a report-first Harness checker for backend operation audit coverage.

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
- `pantheon-base/AGENTS.md`
- `pantheon-ops/AGENTS.md`
- `pantheon-base/docs/acceptances/ACCEPTANCE_CHECKLIST.md`

## Scope

### In

- Create `scripts/harness/check-audit-coverage.mjs`.
- Verify server entrypoints register `OperationLogMiddleware`.
- Scan non-GET backend routes and warn when handlers rely only on global audit defaults.
- Keep default mode report-only and support `--strict`.
- Document usage in `scripts/harness/README.md`.
- Record verification evidence.

### Out

- Do not change backend handlers in this task.
- Do not require every write handler to call `common.SetAuditMetadata` yet.
- Do not add CI integration yet.

## Expected Files

### Create

- `scripts/harness/check-audit-coverage.mjs`
- `.harness/evidence/2026-05-13-check-audit-coverage-script/summary.md`
- `.harness/evidence/2026-05-13-check-audit-coverage-script/commands.json`

### Modify

- `scripts/harness/README.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/tasks/2026-05-13-check-audit-coverage-script.task.md`

### Do Not Touch

- application source code
- CI workflows
- package lock files
- Go modules

## Implementation Notes

- Missing `OperationLogMiddleware` is a finding.
- Missing semantic `common.SetAuditMetadata` in write handlers is a warning.
- Warnings do not fail strict mode.

## Verification Plan

### Backend

- none

### Frontend

- none

### Harness

- `node --check scripts/harness/check-audit-coverage.mjs`
- `node scripts/harness/check-audit-coverage.mjs`
- `node scripts/harness/check-audit-coverage.mjs --json`
- `node scripts/harness/check-audit-coverage.mjs --strict`
- `node scripts/harness/check-task-packet.mjs`

## Linkage

- Task ID: 
2026-05-13-check-audit-coverage-script
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-check-audit-coverage-script
/
- Review File: .harness/evidence/
2026-05-13-check-audit-coverage-script
/review.md

## Evidence Required
- command result summary
- audit findings and warnings summary
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



