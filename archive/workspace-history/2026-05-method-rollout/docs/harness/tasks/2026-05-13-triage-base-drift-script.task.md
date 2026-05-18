# Task Packet: triage-base-drift-script

## Goal

Extract base/business drift triage into a tool-agnostic harness script.

## Primary Layer

platform

## Dependency Layers

- business/*

## Contract Anchors

- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/INHERITANCE_HARNESS_PROTOCOL.md`
- `docs/DRIFT_AUDIT.md`
- `.codex/skills/triage-base-drift/SKILL.md`

## Scope

### In

- Create `scripts/harness/triage-base-drift.mjs`.
- Add Node test coverage for pseudo-drift, business mount, and noise classification.
- Update Codex `triage-base-drift` skill to call the shared script as an adapter.
- Document usage in `scripts/harness/README.md`.
- Add report-first CI artifact output.
- Record verification evidence.

### Out

- Do not edit business source code.
- Do not delete pseudo-drift files.
- Do not execute backport or workspace cutover tasks.

## Expected Files

### Create

- `scripts/harness/triage-base-drift.mjs`
- `scripts/harness/triage-base-drift.test.mjs`
- `.harness/evidence/2026-05-13-triage-base-drift-script/summary.md`
- `.harness/evidence/2026-05-13-triage-base-drift-script/commands.json`

### Modify

- `.codex/skills/triage-base-drift/SKILL.md`
- `scripts/harness/README.md`
- `.github/workflows/harness.yml`
- `docs/DRIFT_AUDIT.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/HARNESS_OPEN_TASKS.md`

### Do Not Touch

- `pantheon-base/**` application code
- `pantheon-ops/**` application code

## Implementation Notes

- The script must be dependency-free and runnable with Node.
- The script should default to `pantheon-base` and `pantheon-ops`.
- The script should support `--json`, `--root`, `--base`, and `--business`.
- Runtime/build directories should be excluded from drift decisions.
- Classification must include `pseudo-drift`, `business mount`, `generic drift`, `business-specific drift`, `noise`, `base-only`, and `business-only`.

## Verification Plan

### Backend

- none

### Frontend

- none

### Harness

- `node --check scripts/harness/triage-base-drift.mjs`
- `node --test scripts/harness/triage-base-drift.test.mjs`
- `node scripts/harness/triage-base-drift.mjs`
- `node scripts/harness/triage-base-drift.mjs --json`
- `node scripts/harness/check-task-packet.mjs`
- `node scripts/harness/check-evidence.mjs --strict`

## Linkage

- Task ID: 
2026-05-13-triage-base-drift-script
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-triage-base-drift-script
/
- Review File: .harness/evidence/
2026-05-13-triage-base-drift-script
/review.md

## Evidence Required
- command result summary
- category counts from real repository scan
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



