# Task Packet: check-backend-response-contract-script

## Goal

Add a report-first Harness checker that detects direct Gin JSON responses outside the common response wrapper.

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

## Scope

### In

- Create `scripts/harness/check-backend-response-contract.mjs`.
- Detect direct `c.JSON(...)` style Gin responses outside `backend/pkg/common/response.go`.
- Keep default mode report-only and support `--strict`.
- Document usage in `scripts/harness/README.md`.
- Record verification evidence.

### Out

- Do not change backend handlers in this task.
- Do not add CI integration yet.
- Do not implement DTO or audit checks in this task.

## Expected Files

### Create

- `scripts/harness/check-backend-response-contract.mjs`
- `.harness/evidence/2026-05-13-check-backend-response-contract-script/summary.md`
- `.harness/evidence/2026-05-13-check-backend-response-contract-script/commands.json`

### Modify

- `scripts/harness/README.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/tasks/2026-05-13-check-backend-response-contract-script.task.md`

### Do Not Touch

- application source code
- CI workflows
- package lock files
- Go modules

## Implementation Notes

- `backend/pkg/common/response.go` is the allowed response wrapper.
- Test files are out of scope.
- Match Gin context direct JSON calls like `c.JSON(...)`, not data types such as `datatypes.JSON(...)`.
- Default mode exits 0 even with findings; `--strict` exits 1 when findings exist.

## Verification Plan

### Backend

- none

### Frontend

- none

### Harness

- `node --check scripts/harness/check-backend-response-contract.mjs`
- `node scripts/harness/check-backend-response-contract.mjs`
- `node scripts/harness/check-backend-response-contract.mjs --json`
- `node scripts/harness/check-backend-response-contract.mjs --strict`
- `node scripts/harness/check-task-packet.mjs`

## Linkage

- Task ID: 
2026-05-13-check-backend-response-contract-script
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-check-backend-response-contract-script
/
- Review File: .harness/evidence/
2026-05-13-check-backend-response-contract-script
/review.md

## Evidence Required
- command result summary
- response contract findings summary
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



