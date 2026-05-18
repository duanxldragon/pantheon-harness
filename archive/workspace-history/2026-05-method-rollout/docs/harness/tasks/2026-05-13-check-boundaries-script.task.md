# Task Packet: check-boundaries-script

## Goal

Add a report-first Harness boundary checker that identifies business modules importing platform or system internals.

## Primary Layer

platform

## Dependency Layers

- business/*

## Contract Anchors

- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/INHERITANCE_HARNESS_PROTOCOL.md`
- `pantheon-base/AGENTS.md`
- `pantheon-ops/AGENTS.md`

## Scope

### In

- Create `scripts/harness/check-boundaries.mjs`.
- Detect Go business modules importing backend internal, platform, auth, dashboard, or system modules.
- Detect frontend business modules importing system/auth/platform modules.
- Make default mode report-only and add `--strict` for failing on findings.
- Document usage in `scripts/harness/README.md`.
- Record verification evidence.

### Out

- Do not change existing business module imports in this task.
- Do not add CI integration yet.
- Do not implement all architecture checks; this is the first report-first boundary pass.

## Expected Files

### Create

- `scripts/harness/check-boundaries.mjs`
- `.harness/evidence/2026-05-13-check-boundaries-script/summary.md`
- `.harness/evidence/2026-05-13-check-boundaries-script/commands.json`

### Modify

- `scripts/harness/README.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/tasks/2026-05-13-check-boundaries-script.task.md`

### Do Not Touch

- application source code
- CI workflows
- package lock files
- Go modules

## Implementation Notes

- Default mode reports findings and exits 0.
- `--strict` exits 1 when findings are present.
- The first run is expected to find existing `pantheon-ops` middleware imports; record them as current drift, not as regressions caused by this task.

## Verification Plan

### Backend

- none

### Frontend

- none

### Visual

- desktop viewport: not run; this task creates a Node harness script and does not change rendered UI.
- mobile viewport: not run; this task creates a Node harness script and does not change responsive UI.
- empty/loading/error/permission states: not applicable; no page, form, table, or browser state is changed.
- screenshot evidence: not required; `.harness/evidence/2026-05-13-check-boundaries-script/summary.md` records the no-UI reason.

### Harness

- `node scripts/harness/check-boundaries.mjs`
- `node scripts/harness/check-boundaries.mjs --json`
- `node scripts/harness/check-boundaries.mjs --strict`
- `node scripts/harness/check-task-packet.mjs`

## Linkage

- Task ID: 
2026-05-13-check-boundaries-script
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-check-boundaries-script
/
- Review File: .harness/evidence/
2026-05-13-check-boundaries-script
/review.md

## Evidence Required
- command result summary
- boundary findings summary
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



