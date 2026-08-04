# Claude Code Adapter

Chinese version: [claude-code.zh.md](./claude-code.zh.md)

Claude Code is an execution and review adapter for the Pantheon Harness Engineering protocol.

## Required Reading

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. `docs/harness/verification-evidence-spec.md`
5. `docs/harness/review-loop-spec.md`
6. Current repository `CLAUDE.md` and `AGENTS.md`

## Claude-Specific Mapping

- Use TodoWrite or an equivalent checklist for multi-step tasks.
- Use Skill tool workflows only as adapters.
- Prefer task packets for non-trivial work.
- When reviewing, use findings-first format from `review-loop-spec.md`.
- Store or summarize verification evidence using `verification-evidence-spec.md`.

## Guardrail

Claude-specific prompt files must not become the only source for architecture, permission, i18n, audit, or inheritance rules.

## Capability Mapping

| Harness Concept | Claude Code Capability |
|-----------------|------------------------|
| Task Packet | Scoped session instructions (`CLAUDE.md` + task packet file) |
| Handoff Protocol | Structured final output |
| Verification Evidence | Command output and file artifacts per evidence spec |
| Review Loop | Findings-first review mode |

## Human Touchpoint Contract

The maintainer appears at exactly three touchpoints in the delivery loop; everything between them runs autonomously. Canonical definition: [workflow-routing — Human Touchpoints](../../../architecture/methodology/workflow-routing.md#human-touchpoints).

1. Requirement clarification — batch ALL clarifying questions once at intake; after In / Out / acceptance criteria are confirmed, ask no further scope or approach questions.
2. Gate policy — involve the maintainer only for red gates, exemption approvals, and gate rule changes; gates themselves run mechanically.
3. Final acceptance — visual/functional sign-off against the touchpoint-1 criteria, with rendered evidence prepared in advance.

Between touchpoints: no mid-task confirmations for reversible in-scope actions; drift is corrected by the Reviewer against the task packet's In / Out. Escalate only for destructive or irreversible operations, credential needs, or genuine scope changes.
