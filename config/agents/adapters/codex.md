# Codex Adapter

Chinese version: [codex.zh.md](./codex.zh.md)

Codex is an execution adapter for the Pantheon Harness Engineering protocol.

## Required Reading

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. `docs/harness/verification-evidence-spec.md`
5. `docs/harness/review-loop-spec.md`
6. Current repository `AGENTS.md`

## Codex-Specific Mapping

- Use `.codex/skills/*` only as helper workflows.
- If a skill conflicts with `docs/harness/*` or repository contracts, follow the repository contracts.
- Use shell commands for verification and report command results.
- Use `apply_patch` for manual file edits.
- Respect sandbox approval rules.
- Do not treat chat history as verification evidence.

## Output Requirements

Final responses must include:

- changed files
- commands run
- verification result
- evidence path or summary
- known gaps

## Human Touchpoint Contract

The maintainer appears at exactly three touchpoints in the delivery loop; everything between them runs autonomously. Canonical definition: [workflow-routing — Human Touchpoints](../../../architecture/methodology/workflow-routing.md#human-touchpoints).

1. Requirement clarification — batch ALL clarifying questions once at intake; after In / Out / acceptance criteria are confirmed, ask no further scope or approach questions.
2. Gate policy — involve the maintainer only for red gates, exemption approvals, and gate rule changes; gates themselves run mechanically.
3. Final acceptance — visual/functional sign-off against the touchpoint-1 criteria, with rendered evidence prepared in advance.

Between touchpoints: no mid-task confirmations for reversible in-scope actions; drift is corrected by the Reviewer against the task packet's In / Out. Escalate only for destructive or irreversible operations, credential needs, or genuine scope changes.
