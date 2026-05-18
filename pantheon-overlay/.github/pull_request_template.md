## Summary

- 

## Harness

- OpenSpec change:
- Task packet:
- Trivial change: no | yes, reason:
- Verification evidence:
- [ ] Task packet linked, or trivial-change justification recorded
- [ ] Verification evidence linked or committed under `.harness/evidence/`
- [ ] UI changes include screenshots or an explicit visual gap record
- Harness reports reviewed:
  - [ ] task packet
  - [ ] evidence
  - [ ] boundaries
  - [ ] backend response contract
  - [ ] backend DTO contract
  - [ ] permission contract
  - [ ] audit coverage
  - [ ] visual evidence
  - [ ] method health
  - [ ] inheritance contract
  - [ ] base drift

## Layer

- Primary layer: platform | system/auth | system/iam | system/org | system/config | business/*
- Dependency layers:

## Base/ops inheritance

- [ ] Base version checked in `pantheon-ops/docs/PROJECT_INHERITANCE.md`
- [ ] If this touches `platform` or `system/*`, the change belongs in `pantheon-base` or includes a reason it cannot
- [ ] `generic drift` reviewed for base backport
- [ ] `pseudo-drift` not expanded with local ops-only edits
- [ ] `business-only` changes are limited to `business/*`, business docs, or explicit local integration points

## Verification

- [ ] Commands recorded in `.harness/evidence/<task-id>/commands.json`
- [ ] Known gaps recorded
- [ ] UI/browser evidence attached when applicable
- [ ] `impeccable` or `VISUAL_QUALITY_PROTOCOL.md` applied when UI is touched

## Linkage

- OpenSpec change:
- Task packet:
- Evidence:
- Review:

## Review Checklist

- [ ] Scope matches task packet
- [ ] `Do Not Touch` paths respected
- [ ] P0/P1 findings resolved or explicitly blocked
- [ ] Tool-specific assumptions are not used as source of truth
