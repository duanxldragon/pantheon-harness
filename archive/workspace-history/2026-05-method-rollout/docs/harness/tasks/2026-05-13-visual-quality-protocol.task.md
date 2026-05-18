# Task Packet: visual-quality-protocol

## Goal

Add an Impeccable-first visual quality gate to the tool-agnostic Harness process.

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
- `docs/harness/AGENT_INTERFACE_CONTRACT.md`
- `docs/harness/REVIEW_LOOP_SPEC.md`
- `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
- `docs/harness/VISUAL_QUALITY_PROTOCOL.md`

## Scope

### In

- Install or create global `impeccable` skill for Codex.
- Add global Claude Code instruction pointing to the same skill.
- Add visual quality protocol to Harness docs.
- Update cross-tool prompts and PR checklist to require visual quality evidence for UI work.
- Record verification evidence.

### Out

- Do not redesign application pages in this task.
- Do not make visual checks blocking CI yet.
- Do not require one specific visual QA tool.

## Expected Files

### Create

- `docs/harness/VISUAL_QUALITY_PROTOCOL.md`
- `.harness/evidence/2026-05-13-visual-quality-protocol/summary.md`
- `.harness/evidence/2026-05-13-visual-quality-protocol/commands.json`

### Modify

- `.agents/prompts/implementation.md`
- `.agents/prompts/review.md`
- `.agents/prompts/qa.md`
- `.github/pull_request_template.md`
- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/HARNESS_ROLLOUT_PLAN.md`
- `docs/harness/tasks/2026-05-13-visual-quality-protocol.task.md`

### Do Not Touch

- application source code
- CI workflows
- package lock files
- Go modules

## Implementation Notes

- `impeccable` is the visual quality gate, not a replacement for project design systems.
- If a tool cannot load Codex skills, it must still follow `VISUAL_QUALITY_PROTOCOL.md`.
- UI work should prefer rendered evidence over code-only review.

## Verification Plan

### Backend

- none

### Frontend

- none

### Visual

- desktop viewport: not run; this task adds the visual quality protocol and does not change rendered application UI.
- mobile viewport: not run; this task adds the visual quality protocol and does not change responsive application UI.
- empty/loading/error/permission states: not applicable; no application page state is changed.
- screenshot evidence: not required; `.harness/evidence/2026-05-13-visual-quality-protocol/summary.md` records the no-UI reason and known CI visual-diff gap.

### Harness

- `node scripts/harness/check-task-packet.mjs`
- `node scripts/harness/check-evidence.mjs --strict`

## Linkage

- Task ID: 
2026-05-13-visual-quality-protocol
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-visual-quality-protocol
/
- Review File: .harness/evidence/
2026-05-13-visual-quality-protocol
/review.md

## Evidence Required
- global skill install summary
- command result summary
- known gaps

## Human Gates

- none

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Global Codex skill installed or created
- [x] Claude Code global instruction added
- [x] Visual quality protocol added
- [x] Prompts and PR checklist updated
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed



