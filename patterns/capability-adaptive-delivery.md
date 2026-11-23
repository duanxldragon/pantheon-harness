# Capability-Adaptive Delivery

This is the portable execution policy for current coding agents. Apply [solo delivery tiers](../architecture/methodology/solo-delivery-tiers.md) first: capability changes the execution path, while risk determines the evidence and approval requirements.

## 1. Default: One Agent, One Delivery Loop

The primary agent gathers context, plans, implements, verifies, and fixes findings in one session. Planner, Generator, and Evaluator describe responsibilities; they do not require separate models or processes. A planning-only assignment remains read-only until implementation is authorized. A review-only assignment reports findings before any separately authorized repair.

- L0: direct action and the minimum relevant check.
- L1: a short goal, In/Out, plan, verification set, and findings-first self-review. Do not manufacture separate design documents, task packets, or agents for a clear local task.
- L2: task packet, durable evidence, risk-matched checks, and review. Security, permission, audit, schema, trust-boundary, release, and gate-policy changes require independent review or an explicit review gap and acceptance gate; self-review cannot be presented as independent approval.
- Keep repository contracts, UI quality gates, runtime evidence, and downstream compatibility checks. A stronger model does not reduce the task's risk tier.
- Complete authorized, reversible work without repeated confirmation. Stop only for missing authority, material scope change, an unapproved destructive/external action, or a gate-policy decision. A red gate starts a bounded diagnose/fix/reverify loop; the agent cannot waive it.

## 2. Capability Check at Intake

Record only the capabilities relevant to this task, in the plan or existing task packet:

```text
Runtime / provider / client version: known values or unknown
Actual model / reasoning effort: current selection or unknown
Available tools: required retrieval, shell, browser, and verification tools
Delegation: available and authorized entry, or unavailable
Authority: current sandbox, allowed writes, external-action boundaries
Recovery: current task/evidence paths and supported compaction/checkpoint facilities
Execution decision: single-agent or bounded delegation; reason for escalation
```

Distinguish model reasoning ability, client features, tool availability, and authorization. API documentation does not establish a feature in the installed client. Preserve the user's model, provider, reasoning effort, and global settings. Record unknowns instead of inventing a model identity. Prefer current defaults; suggest a supported higher effort or another model only when uncertainty or observed failures justify it and the session permits that choice.

## 3. Delegate Only a Self-Contained Branch

Delegate when independent review is required, a bounded noisy investigation would displace useful context, or independent work offers a concrete benefit. A file count, L2 label, or large context window alone is insufficient. Query an available structural index directly before creating an exploration agent.

Every delegated task states goal, relevant context and source paths, exclusive write ownership or read-only scope, prohibited changes, expected output and evidence, budget, stop condition, and integration owner. Workers are not alone in the repository and must preserve others' edits. Prefer read-only branches; isolate overlapping writes or run them sequentially. The primary agent integrates and verifies the combined result.

Use only delegation exposed and permitted by the current runtime. Bound concurrency and nesting explicitly; do not assume universal subagent support or a fixed vendor nesting limit. Child agents inherit authority and cannot approve or evade a parent restriction. Return compact findings and evidence paths rather than full transcripts. Keep tightly coupled planning, implementation, and testing in the primary context.

## 4. Long Tasks and Recovery

Use [progressive retrieval](./context-engineering-protocol.md): entry -> focused context -> evidence detail. Long context is capacity, not durable memory. Do not compact at a universal percentage or infer pressure from response latency alone; use actual runtime signals and loss of task focus.

Before compaction, handoff, or session end, checkpoint the goal, In/Out, accepted decisions, owned files and existing edits, verification commands/results, remaining work, known gaps, and next action in the existing task/evidence summary. On resume, read that checkpoint and inspect current files before acting. Prior passing evidence must still match the current code/configuration. Record relevant source/runtime changes and rerun affected checks, rather than replaying every historical test.

After repeated failures, change the hypothesis, narrow the reproduction, or request a bounded independent diagnosis. Stop repeating an unchanged attempt. Tool unavailability may use a documented equivalent; missing required evidence remains a gap, never a pass.

## 5. Evaluate a Workflow Change

Before declaring an improvement in model or orchestration performance, compare the same representative tasks and acceptance checks against the previous workflow. Record actual model/client/effort, task snapshot, verification result, regressions, retries, wall time, delegation count, and token/cost data when exposed. Mark unavailable metrics as unknown. Official recommendations support a candidate workflow, not a measured speedup.

| Representative case | Required behavior |
|---|---|
| Clear local non-sensitive bug fix | L1 single-agent plan/implement/test/self-review; no forced CLI handoff |
| Permission, tenancy, or shared contract change | L2 evidence and independent review; no risk downgrade |
| Independent read-only research plus implementation | bounded authorized research branch; primary integration |
| Coupled edits to the same module | single owner or isolated/sequential writes |
| Mid-task compaction or unavailable browser | resume from checkpoint; missing runtime/visual proof stays a gap |
| Base shared behavior needed by Ops | Base-first release/rebuild; never copy shared source from Base HEAD |

## 6. Consumer Adoption

Consumers link this policy from their active `AGENTS.md` and tool entrypoints. They retain repository-specific boundaries instead of copying the method. `.harness/method-consumption.json` records the method version and SHA256 of the consumed canonical policy, routing, tiers, context, guardrails, playbook, and review rules. Hash format `sha256-utf8-lf` normalizes CRLF to LF so equivalent Git checkouts agree. `check-method-consumption.mjs` verifies that snapshot and the entry links; it cannot prove agent obedience or application behavior.

```powershell
# From a workspace consumer. After reviewing an intentional method update:
node ../pantheon-harness/scripts/harness/check-method-consumption.mjs --root . --source ../pantheon-harness --update
# Read-only preflight and closeout:
node ../pantheon-harness/scripts/harness/check-method-consumption.mjs --root . --source ../pantheon-harness
```

Never auto-refresh the receipt during validation: changed source must first be reviewed. The source path is supplied explicitly and checked against the receipt. Offline/CI use needs the same harness snapshot at that path. A missing method source fails visibly. Product `VERSION`, foundation locks, and repo-shell compatibility are separate contracts. Unreleased method edits retain the current release version and are distinguished by hashes; a receipt is not a published release or acceptance sign-off.

## 7. Official Evidence (Retrieved 2026-11-23)

These are dated vendor facts; the policy above is Pantheon's interpretation. Availability varies by provider, account, and client.

- [OpenAI Using GPT-6.2](https://developers.openai.com/api/docs/guides/latest-model): GPT-6.2 Astra/Sol; autonomous completion with reasonable reversible assumptions; medium effort as a starting point for new integrations.
- [Codex subagents](https://developers.openai.com/codex/multi-agent.md): isolation and parallel work have coordination and token costs; local delegation depends on explicit requests or applicable instructions and preserves sandbox/approval settings.
- [Claude Code loop and context](https://code.claude.com/docs/en/how-claude-code-works.md): gather context -> act -> verify; compaction summaries may lose detailed early instructions.
- [Claude Code subagents](https://code.claude.com/docs/en/sub-agents.md): shared context and quick/coupled work favor the main session; noisy independent work favors bounded subagents.
- [Claude Code model configuration](https://code.claude.com/docs/en/model-config.md): current examples include Fable 5.2 and Opus/Sonnet/Haiku 5.5; alias resolution and defaults depend on provider and client version. These names are evidence examples, not mandatory routing targets.
