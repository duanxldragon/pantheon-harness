# Cursor Adapter

Chinese version: [cursor.zh.md](./cursor.zh.md)

Cursor is an implementation adapter for the Pantheon Harness Engineering protocol.

## Required Reading

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. Current repository `AGENTS.md`

## Cursor-Specific Mapping

- Cursor rules should point to `docs/harness/*`; they should not duplicate the full protocol.
- Composer tasks should start from a task packet for non-trivial work.
- Before broad edits, inspect current diff and avoid user-owned changes.
- Verification commands must be run in the terminal or explicitly marked not run.

## Review

Cursor can implement or review, but review output must follow `docs/harness/review-loop-spec.md`.

## Capability Mapping

| Harness Concept | Cursor Capability |
|-----------------|-------------------|
| Task Packet | Agent mode with scoped instructions |
| Handoff Protocol | Structured output format |
| Verification Evidence | Inline diff, test panel, terminal output |
| Review Loop | Built-in review panel |

## Human Touchpoint Contract

The maintainer appears at exactly three touchpoints in the delivery loop; everything between them runs autonomously. Canonical definition: [workflow-routing — Human Touchpoints](../../../architecture/methodology/workflow-routing.md#human-touchpoints).

1. Requirement clarification — batch ALL clarifying questions once at intake; after In / Out / acceptance criteria are confirmed, ask no further scope or approach questions.
2. Gate policy — involve the maintainer only for red gates, exemption approvals, and gate rule changes; gates themselves run mechanically.
3. Final acceptance — visual/functional sign-off against the touchpoint-1 criteria, with rendered evidence prepared in advance.

Between touchpoints: no mid-task confirmations for reversible in-scope actions; drift is corrected by the Reviewer against the task packet's In / Out. Escalate only for destructive or irreversible operations, credential needs, or genuine scope changes.
