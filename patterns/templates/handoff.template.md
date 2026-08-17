# Handoff Report: <task-id>

## Basic Info

- Sender: `<agent/tool>`
- Receiver: `<agent/tool or role>`
- Generated At: `<ISO8601>`
- Task Packet: `docs/harness/tasks/<task-id>.task.md`
- Evidence: `.harness/evidence/<task-id>/summary.md`
- Review: `.harness/evidence/<task-id>/review.md`

## Current State

- State: `Pending | InProgress | ReviewPending | ChangesRequested | Approved | HumanGatePending | Escalated | Cancelled`
- Completed Scope: `<short list>`
- Remaining Scope: `<short list or none>`
- Blockers: `<none or explicit blocker>`

## Workspace Handoff

- Target Repository: `<repository>`
- Repository Role: `method-source | foundation-source | business-consumer | standalone`
- Upstream Dependencies: `<list or none>`
- Downstream Consumers: `<list or none>`
- Sync Expectation: `none | not-required | deferred | required | completed`
- Release Requirement: `none | method-release | foundation-release | consumer-lock-update`
- Current Release/Sync State: `<facts only>`

## Verification

| Command | Status | Notes |
|---|---|---|
| `<command>` | `passed | failed | not-run` | `<notes>` |

- Evidence State: `present | wired | exercised | outcome-supported | missing | unobserved`
- Known Gaps: `<none or explicit gap>`

## Next Action

- Owner: `<tool or role>`
- Command: `<exact next command>`
- Stop Point: `<release/lock/migration/human gate or none>`

## Acceptance

- Ready for next stage: `yes | no`
- Human decision required: `yes | no`
