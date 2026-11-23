# Agentic Best Practices Reference

Reviewed 2026-11-23. The source-backed execution contract is [Capability-Adaptive Delivery](../../patterns/capability-adaptive-delivery.md), with dated official links in its evidence section. This page maps those facts to Pantheon; it does not define client commands or claim benchmark gains.

## Capability and Method Mapping

| Observed capability / constraint | Pantheon rule |
|---|---|
| Current agents combine context gathering, action, and verification | One primary agent may plan, implement, verify, and fix; roles describe responsibilities |
| Model capability differs from installed client/tools/authorization | Record actual runtime/model/effort and required available tools; preserve current settings |
| Subagents isolate noisy context but add tokens, latency, and coordination | Delegate self-contained branches with ownership, budget, evidence, and integration owner |
| Coupled planning, implementation, and tests share substantial context | Keep them in the primary session; do not use file count as a delegation rule |
| Compaction can lose detailed instructions | Checkpoint task scope, decisions, edits, evidence, gaps, and next action; resume from repository state |
| A confident implementation can still fail acceptance | Risk-matched tests/runtime evidence and independent high-risk review remain required |

## Delivery and Context

- L0: direct execution and minimum relevant verification.
- Ordinary L1: short plan, In/Out, checks, findings-first self-review, and gaps.
- L2: durable task/evidence/review; security, permissions, audit, schema, trust boundaries, release, and gate changes retain independent review or an explicit gap and acceptance gate.
- Plan before implementation; a written plan satisfies the method. Client Plan Mode is optional unless requested or required by the active runtime.
- Load entry -> focused source -> raw evidence. Entry-file length is a maintenance heuristic, not a model limit.
- Use actual context pressure signals, not a universal compaction percentage. Large context does not require loading broad history.
- Perform authorized reversible work autonomously. Escalation follows actual authority and gate-policy boundaries, not tool names.

## Evaluating a New Model or Workflow

Use the same representative tasks and acceptance checks for old and candidate workflows. Capture actual model/provider/client/effort, snapshot, correctness, regressions, retries, wall time, handoffs, and available token/cost metrics. Unknown metrics remain unknown. Do not translate vendor descriptions into measured local productivity gains.

## Canonical Guidance

- [Workflow routing](./workflow-routing.md)
- [Solo delivery tiers](./solo-delivery-tiers.md)
- [Context engineering guide](./context-engineering-guide.md)
- [Context engineering protocol](../../patterns/context-engineering-protocol.md)
- [Risk-based review](../harness/review-loop-spec.md)
- [Method upgrade and consumption](../../patterns/upgrade.md)

The previous fixed client/version mapping, mandatory Plan Mode table, and universal 40-50% compaction advice have been replaced by runtime capability checks. Historical task artifacts remain historical; current routing follows the linked canonical policy.
