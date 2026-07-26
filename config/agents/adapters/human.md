# Human Adapter

Chinese version: [human.zh.md](./human.zh.md)

Human engineers are first-class participants in the Pantheon Harness Engineering protocol.

## Required Reading

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. Current repository `AGENTS.md`

## Human Workflow

For non-trivial work:

1. Create or reference a task packet.
2. Declare primary layer and dependency layers.
3. Read contract anchors.
4. Make focused changes.
5. Run verification commands.
6. Save or summarize evidence.
7. Request review.

Human work is held to the same completion definition as agent work.

## Human Touchpoint Contract

When delegating to agents, the maintainer appears at exactly three touchpoints in the delivery loop; everything between them runs autonomously. Canonical definition: [workflow-routing — Human Touchpoints](../../../architecture/methodology/workflow-routing.md#human-touchpoints).

1. Requirement clarification — answer the batched clarifying questions once at intake and confirm In / Out / acceptance criteria.
2. Gate policy — decide on red gates, exemption approvals, and gate rule changes; gates themselves run mechanically.
3. Final acceptance — visual/functional sign-off against the touchpoint-1 criteria, using rendered evidence the agent prepared in advance.

Between touchpoints, do not expect mid-task confirmations for reversible in-scope actions; agents escalate only for destructive or irreversible operations, credential needs, or genuine scope changes.
