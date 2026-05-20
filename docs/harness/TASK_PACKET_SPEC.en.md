# Task Packet Spec

Chinese version: [TASK_PACKET_SPEC.md](./TASK_PACKET_SPEC.md)

Type: Contract
Layer: platform
Status: Active

A task packet is the tool-agnostic input format for non-trivial work. It lets Codex, Claude Code, Cursor, Copilot, OpenHands, Aider, and human engineers share the same task boundary.

## 1. Location

Task packets should live by default at:

```text
docs/harness/tasks/YYYY-MM-DD-<task-name>.task.md
```

If the task comes from an existing superpowers plan, the task packet may reference that plan instead of repeating it in full.

## 2. Required Template

```md
# Task Packet: <task-name>

## Goal

<one sentence>

## Primary Layer

platform | system/auth | system/iam | system/org | system/config | business/*

## Dependency Layers

- none

## Harness Profile

- Template: admin-platform | api-service | event-processor | dashboard | ui-heavy-product | custom
- Overlay: none
- Coverage Dimensions:
  - behaviour
  - maintainability
  - architecture-fitness
  - runtime-quality
  - method-health

## Contract Anchors

- `path/to/contract.md`
- `path/to/design.md`
- `path/to/acceptance.md`

## Scope

### In

- <explicit work>

### Out

- <explicit non-goals>

## Expected Files

### Create

- `path`

### Modify

- `path`

### Do Not Touch

- `path`

## Implementation Notes

- <boundary or sequencing notes>

## Verification Plan

### Backend

- `command`

### Frontend

- `command`

### Browser / Smoke

- `command or none`

## Linkage

- Task ID: `YYYY-MM-DD-task-name`
- OpenSpec Change: `openspec/changes/<name>/` | none
- Superpowers Plan: `docs/superpowers/plans/<file>.md` | none
- Evidence Directory: `.harness/evidence/<task-id>/`
- Review File: `.harness/evidence/<task-id>/review.md` | none

## Evidence Required

- command result summary
- screenshots if UI changed
- smoke JSON if browser flow changed
- review summary

## Human Gates

- <gate or none>

## Completion Checklist

- [ ] Layer and boundary declared
- [ ] Contract anchors read
- [ ] Tests or checks updated
- [ ] Verification run or exception recorded
- [ ] Evidence saved or summarized
- [ ] Docs updated if contracts changed
- [ ] Review completed
```

## 3. Trivial Tasks

The following tasks may skip task-packet creation:

- typo fixes
- documentation additions that do not change behavior
- read-only diagnosis
- narrow single-file formatting fixes

But if a trivial task touches permissions, menus, schema, i18n, audit, or base/ops inheritance, it must be upgraded into a task packet.

## 4. Human Gate Rules

Task packets must list human gates explicitly. If none exist, write `none`.

The following must be listed as gates:

- schema or migration changes
- deleting files or directories
- base contract changes
- overriding base behavior in a business repository
- new dependencies or external services
- model changes affecting permission, menu, audit, or i18n

## 5. Tool Usage

Tool adapters may translate a task packet into their execution format, but they must not lose:

- layer
- harness template and coverage dimensions
- scope
- contract anchors
- verification plan
- evidence required
- human gates

## 6. Machine-Readable Linkage

The following fields are the minimum closed-loop keys linking a task packet to later artifacts:

- `Task ID`: primary key; must match the `<task-id>.task.md` filename
- `Evidence Directory`: must point to `.harness/evidence/<task-id>/`
- `Review File`: if a review artifact is retained, it must point to a file under the evidence directory
- `OpenSpec Change`: if the task comes from OpenSpec, the change path must be recorded explicitly; otherwise use `none`
- `Superpowers Plan`: if the task comes from `docs/superpowers/plans/*`, it must be recorded explicitly; otherwise use `none`

These linkage fields connect `OpenSpec change / superpowers plan / task packet / evidence / review` into a traceable chain.
