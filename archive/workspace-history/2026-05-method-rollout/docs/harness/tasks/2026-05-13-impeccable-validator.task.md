# Task Packet: impeccable-validator

## Goal

Run the official validator for the global `impeccable` skill.

## Primary Layer

platform

## Dependency Layers

- none

## Contract Anchors

- `docs/harness/VISUAL_QUALITY_PROTOCOL.md`
- `docs/harness/HARNESS_OPEN_TASKS.md`

## Scope

### In

- Enable pip for the current Python if missing.
- Install PyYAML for the official skill validator.
- Run `quick_validate.py` against `C:\Users\xiaolong\.codex\skills\impeccable`.
- Record verification evidence.

### Out

- Do not modify the `impeccable` skill content.
- Do not change UI source code.

## Expected Files

### Create

- `.harness/evidence/2026-05-13-impeccable-validator/summary.md`
- `.harness/evidence/2026-05-13-impeccable-validator/commands.json`

### Modify

- `docs/harness/HARNESS_OPEN_TASKS.md`

### Do Not Touch

- application source code
- `C:\Users\xiaolong\.codex\skills\impeccable\SKILL.md`

## Implementation Notes

- `quick_validate.py` requires the Python `yaml` module.
- The dependency is environment-level and not a repository dependency.

## Verification Plan

### Backend

- none

### Frontend

- none

### Visual

- desktop viewport: not run; this task validates the global `impeccable` skill package and does not change rendered UI.
- mobile viewport: not run; this task validates the global `impeccable` skill package and does not change responsive UI.
- empty/loading/error/permission states: not applicable; no product page state is changed.
- screenshot evidence: not required; `.harness/evidence/2026-05-13-impeccable-validator/summary.md` records the no-UI reason.

### Harness

- `python -m pip show PyYAML`
- `python C:\Users\xiaolong\.codex\skills\.system\skill-creator\scripts\quick_validate.py C:\Users\xiaolong\.codex\skills\impeccable`
- `node scripts/harness/check-task-packet.mjs`
- `node scripts/harness/check-evidence.mjs --strict`

## Linkage

- Task ID: 
2026-05-13-impeccable-validator
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-impeccable-validator
/
- Review File: .harness/evidence/
2026-05-13-impeccable-validator
/review.md

## Evidence Required
- command result summary
- known gaps

## Human Gates

- Installing Python package dependency.

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Tests or checks updated
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Docs updated if contracts changed
- [x] Review completed



