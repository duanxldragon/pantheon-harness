# GitHub Copilot Adapter

Chinese version: [github-copilot.zh.md](./github-copilot.zh.md)

GitHub Copilot is a local assist and PR assist adapter for the Pantheon Harness Engineering protocol.

## Required Reading

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. Current repository `AGENTS.md`

## Copilot-Specific Mapping

- Copilot suggestions must be checked against contracts and task scope.
- PR summaries must include layer, verification, evidence, and known gaps.
- Copilot-generated code is not accepted unless repository checks pass.
- Copilot review comments should use P0/P1/P2 severity where applicable.

## Human Touchpoint Contract

The maintainer appears at exactly three touchpoints in the delivery loop; everything between them runs autonomously. Canonical definition: [workflow-routing — Human Touchpoints](../../../architecture/methodology/workflow-routing.md#human-touchpoints).

1. Requirement clarification — batch ALL clarifying questions once at intake; after In / Out / acceptance criteria are confirmed, ask no further scope or approach questions.
2. Gate policy — involve the maintainer only for red gates, exemption approvals, and gate rule changes; gates themselves run mechanically.
3. Final acceptance — visual/functional sign-off against the touchpoint-1 criteria, with rendered evidence prepared in advance.

Between touchpoints: no mid-task confirmations for reversible in-scope actions; drift is corrected by the Reviewer against the task packet's In / Out. Escalate only for destructive or irreversible operations, credential needs, or genuine scope changes.
