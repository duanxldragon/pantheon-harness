# Task Packet: phase-7-full-adoption

## Goal

Make Harness adoption the default development path for non-trivial PRs across agents and humans.

## Primary Layer

platform

## Dependency Layers

- none

## Contract Anchors

- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/AGENT_INTERFACE_CONTRACT.md`
- `docs/harness/TASK_PACKET_SPEC.md`
- `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
- `docs/harness/REVIEW_LOOP_SPEC.md`
- `docs/harness/TOOL_ADAPTERS.md`

## Scope

### In

- Add `scripts/harness/check-adoption.mjs`.
- Update the PR template so every PR declares a task packet or trivial marker.
- Ensure the PR template lists verification evidence and all current harness reports.
- Wire adoption reporting into `.github/workflows/harness.yml`.
- Mark Phase 7 local adoption complete in rollout/open-task docs.
- Record verification evidence.

### Out

- Do not verify remote GitHub Actions artifact upload from this local workspace.
- Do not make report-first checks block CI beyond their current strict behavior.
- Do not change product runtime code.

## Expected Files

### Create

- `scripts/harness/check-adoption.mjs`
- `docs/harness/tasks/2026-05-13-phase-7-full-adoption.task.md`
- `.harness/evidence/2026-05-13-phase-7-full-adoption/summary.md`
- `.harness/evidence/2026-05-13-phase-7-full-adoption/commands.json`

### Modify

- `.github/pull_request_template.md`
- `.github/workflows/harness.yml`
- `scripts/harness/README.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/HARNESS_OPEN_TASKS.md`

### Do Not Touch

- application source code
- package lock files
- Go modules

## Implementation Notes

- The adoption checker is a structural gate for default workflow entrypoints.
- It verifies shared contracts, tool adapters, PR template task/evidence markers, and implementation prompt evidence rules.
- GitHub Actions artifact upload still needs remote verification because this workspace has no remote and no `gh` CLI.

## Verification Plan

### Backend

- none

### Frontend

- none

### Visual

- desktop viewport: not run; this task changes workflow documentation and harness scripts only.
- mobile viewport: not run; this task changes workflow documentation and harness scripts only.
- empty/loading/error/permission states: not applicable; no product UI state changes.
- screenshot evidence: not required; evidence records the no-UI reason.

### Harness

- `node --check scripts/harness/check-adoption.mjs`
- `node scripts/harness/check-adoption.mjs --strict`
- `node scripts/harness/check-adoption.mjs --json`
- `node scripts/harness/check-task-packet.mjs`
- `node scripts/harness/check-evidence.mjs --strict`

## Linkage

- Task ID: 
2026-05-13-phase-7-full-adoption
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-phase-7-full-adoption
/
- Review File: .harness/evidence/
2026-05-13-phase-7-full-adoption
/review.md

## Evidence Required
- command result summary
- adoption checker result
- known gaps

## Human Gates

- Remote GitHub Actions artifact verification remains external.

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Tests or checks updated
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Docs updated if contracts changed
- [x] Review completed



