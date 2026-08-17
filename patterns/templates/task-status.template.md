# Task Status: <task-id>

## Current State

- state: `Pending | InProgress | ReviewPending | ChangesRequested | Approved | HumanGatePending | Escalated | Cancelled`
- updatedAt: `<ISO8601>`
- updatedBy: `<agent/tool or role>`

## State History

| Timestamp | From | To | Reason | Owner |
|---|---|---|---|---|
| `<ISO8601>` | `Pending` | `InProgress` | `<reason>` | `<owner>` |

## Next Expected Action

- Owner: `<agent/tool or role>`
- Action: `<exact action>`
- Command: `<exact command or none>`
- Stop Point: `<release/lock/migration/human gate or none>`

## Resume Artifacts

- Task Packet: `docs/harness/tasks/<task-id>.task.md`
- Evidence: `.harness/evidence/<task-id>/`
- Handoff: `.harness/evidence/<task-id>/handoff.md`
