# OpenHands Adapter

Chinese version: [openhands.zh.md](./openhands.zh.md)

OpenHands is an execution adapter for the Pantheon Harness Engineering protocol.

## Required Reading

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. `docs/harness/verification-evidence-spec.md`
5. Current repository `AGENTS.md`

## OpenHands-Specific Mapping

- Use task packets as issue-level instructions for non-trivial work.
- Run verification commands inside the workspace when possible.
- Persist command summaries and artifacts using the evidence spec.
- Do not bypass human gates for deletion, schema, base contract, permission, i18n, audit, or inheritance changes.

## Human Touchpoint Contract

The maintainer appears at exactly three touchpoints in the delivery loop; everything between them runs autonomously. Canonical definition: [workflow-routing — Human Touchpoints](../../../architecture/methodology/workflow-routing.md#human-touchpoints).

1. Requirement clarification — batch ALL clarifying questions once at intake; after In / Out / acceptance criteria are confirmed, ask no further scope or approach questions.
2. Gate policy — involve the maintainer only for red gates, exemption approvals, and gate rule changes; gates themselves run mechanically.
3. Final acceptance — visual/functional sign-off against the touchpoint-1 criteria, with rendered evidence prepared in advance.

Between touchpoints: no mid-task confirmations for reversible in-scope actions; drift is corrected by the Reviewer against the task packet's In / Out. Escalate only for destructive or irreversible operations, credential needs, or genuine scope changes.
