# Pantheon Workflow Routing

> This document is the workspace-level routing contract for development work. It decides which capability owns each part of a task so the tools do not compete with each other.

Routing is defined against harness capabilities, not against specific tools. Concrete tool choices live in [Tool Adapter Matrix](../../patterns/tool-adapter-matrix.md). If a tool is unavailable, substitute another adapter that satisfies the same capability.

For the current solo-maintainer stage, apply [Solo Delivery Tiers](./solo-delivery-tiers.md) before selecting a lane. Choose the lightest tier that can safely finish the task, then apply the routing rules below.

Consume [Capability-Adaptive Delivery](../../patterns/capability-adaptive-delivery.md) before selecting adapters. Default to one primary agent; roles are responsibilities, and independent review is determined by risk.

## Core Model

Use the smallest workflow that can finish the task with evidence.

| Layer | Capability owner | Role |
|---|---|---|
| Direct execution | Primary agent runtime | Small, clear, low-risk edits and answers |
| Planning / clarification | Plan mode or equivalent plan-first flow | Clarify intent, bound scope, pick the lane and stop condition before editing |
| Parallel / batch execution | Subagents, workflow orchestration, or CI matrix jobs | Independent branches, batch review, large sweeps |
| Structural context | CodeGraph | Symbol lookup, impact, callers/callees, trace, affected subgraph |
| UI quality gate | `impeccable` | Visual quality, responsive behavior, rendered evidence expectations |
| Plan/design grilling | `grill-me` or equivalent challenge review | Challenge scope, risk, acceptance, rollback before approval |
| Operational gates | Repo-native automation: Playwright smoke, capture scripts, CI quality gates | Browser evidence, ship checks, health, security review |

The planning layer coordinates; it does not replace gates. CodeGraph and `impeccable` are gates that must be used inside whichever execution path applies.

Keep `impeccable`. It is the current UI visual quality gate because it catches visual polish, layout, responsive, and interaction-state issues better than generic code review. Orchestration routes work; it does not replace `impeccable`.

## Delivery Loop

The end-to-end loop from requirement to acceptance. Suite skills (superpowers / gstack) used to fill several of these slots; after the 2026-07-17 user-environment retirement review, every slot is owned by the method itself plus repo-native tooling. No stage depends on an externally installed skill suite.

| Stage | Owner | Artifact / gate |
|---|---|---|
| 需求澄清 (Requirement) | Plan-first path: clarifying interview, scope + acceptance bounded before editing | Task Packet `In / Out / Do Not Touch`; `grill-me` challenge for non-obvious scope |
| 设计评审 (Design review) | `grill-me` challenge + human gate; CodeGraph impact for structural decisions | Recorded decision in the task packet; L2 requires reviewer-perspective declaration |
| 开发执行 (Implementation) | Primary agent plans, implements, verifies, and fixes; separate independent review when risk requires | Small reviewable diffs inside tier-appropriate scope |
| UI 质量 (UI quality) | `impeccable` gate + repo design contract (`DESIGN.md`) + mechanical style checkers in CI | Rendered evidence (screenshot/browser check) or recorded blocker |
| 测试验收 (Test & acceptance) | Repo-native tests: unit + Playwright smoke + capture scripts; human acceptance checklist for milestone gates | Verification evidence per `verification-evidence-spec.md`; ACCEPTANCE_CHECKLIST for human sign-off |
| 发布 (Release) | `repo-pr-gate` workflow skill + branch/PR workflow + CI quality gates; foundation release flow for base→business propagation | Green quality gates; release artifacts + consumer lock update |

Each stage consumes the previous decision and evidence. L1 may keep these in one short plan/closeout; L2 uses durable linked artifacts. Do not create separate documents or agents just to fill stage names. When a stage's owner is unavailable, record the gap explicitly instead of silently skipping the stage.

### Human Touchpoints

The maintainer appears at exactly three points in the loop; everything between them runs autonomously:

1. **Requirement clarification** (loop entry) — inspect existing context, batch material missing questions once, then record In / Out / acceptance criteria. Use reasonable reversible assumptions for optional details; confirmation already supplied by the task is not requested again.
2. **Gate policy** — deciding what to do when a quality gate is red, approving exemptions (`ui-contract-allow`, `solo-override`), and changing gate rules. The gates themselves run mechanically without the maintainer.
3. **Final acceptance** — visual/functional sign-off against the acceptance criteria from touchpoint 1, with rendered evidence prepared by the agent in advance.

Between touchpoints, do not ask for mid-task confirmation on reversible, in-scope actions. Escalate to the maintainer only for destructive/irreversible operations, credential needs, or genuine scope changes — everything else is corrected by the Reviewer against the packet's In / Out, not by interrupting the maintainer.

## Decision Tree

Start every non-trivial task by identifying the target repository, layer, risk, and evidence requirement.

For Pantheon day-to-day delivery, first classify the task as:

- `L0` direct change
- `L1` lean delivery
- `L2` full governance
- `Proto First` 原型驱动（适用于探索性开发、方案验证）

参考 [Proto First Development](./proto-driven-development.md) 了解更多。

Then route within that tier instead of defaulting every non-trivial task to the heaviest loop.

```text
Task arrives
  |
  +-- Is it one clear low-risk local change?
  |     -> Direct execution + minimum relevant verification
  |
  +-- Is intent, scope, design, or lane unclear?
  |     -> Plan-first path: plan mode + clarifying questions
  |     -> Use grill-me (or equivalent) to challenge the plan before approval
  |
  +-- Is there an approved plan that needs multi-step execution?
  |     -> Execute against the Task Packet; keep stop points explicit
  |
  +-- Is this an exploratory/prototype task?
  |     -> Proto First workflow (see proto-driven-development.md)
  |
  +-- Is independent review required, or is there a self-contained branch with a concrete isolation/parallelism benefit?
  |     -> Bounded authorized delegation; name ownership, evidence, budget, and integration owner
  |
  +-- Does the task touch UI, layout, visual states, dashboards, forms, tables, charts, or responsive behavior?
  |     -> impeccable gate before implementation and before completion
  |
  +-- Does it need browser evidence, QA, shipping, health, or security review?
        -> Repo-native operational gate: Playwright smoke / capture scripts / CI quality + security workflows
```

When two paths apply, prefer composition over replacement:

1. The plan defines the lane and stop condition.
2. Parallel fan-out runs independent inner branches when that materially helps.
3. The primary runtime integrates, edits, and verifies the final change.

## Context Budget and Subagent Routing

### When to Use Subagents

Apply the [delegation contract](../../patterns/capability-adaptive-delivery.md#3-delegate-only-a-self-contained-branch). Keep shared planning/implementation/testing context in the primary agent. Use available structured retrieval directly. Delegate independent review or a bounded noisy/parallel branch when benefit exceeds handoff cost; file count and task tier alone do not trigger fan-out. The current runtime and session instructions decide whether delegation is available and authorized.

### Context Budget Consideration

Use progressive retrieval and actual runtime pressure signals. A large window does not require full-budget retrieval. Checkpoint current scope, decisions, edits, evidence, remaining work, and next action before compaction or handoff. Do not impose a universal compaction percentage.

### Evidence Gate

**Verify before routing to next stage.**

```
Generator completes
  -> Verify evidence exists (commands output, screenshots if UI)
  -> Reviewer examines evidence
  -> Only route to next stage if evidence passes
  -> Block or escalate if evidence is missing or insufficient
```

### Planning Trigger

L1 requires a short plan; L2 requires a plan/task packet before implementation. Use a runtime Plan Mode only when available and useful or explicitly requested. A written in-session plan satisfies this method requirement; no fixed slash command or model handoff is required.

## Routing Matrix

| Task shape | Primary route | Required gates |
|---|---|---|
| Single-file fix, docs typo, obvious local bug | Direct execution | Minimum targeted test/check |
| `L1` ordinary solo delivery | Direct execution or plan-first path | Lean plan plus targeted verification |
| `Proto First` exploratory/prototype task | Proto First workflow | Proto validation + decision artifact |
| Ambiguous request, missing boundaries, unclear acceptance | Plan-first path + clarifying interview | CodeGraph when repo structure matters |
| Architecture/design/tradeoff decision | Plan-first path + grill-me challenge | CodeGraph impact, explicit acceptance criteria |
| Approved multi-step implementation | Direct execution against the Task Packet | Tests/build/smoke proportional to risk |
| Bounded independent branch with isolation or parallelism benefit | Authorized subagent / workflow fan-out when available | Ownership, budget, compact findings and per-branch evidence |
| Parallel implementation lanes | Multi-agent execution (worktree-isolated when mutating) | Shared task list, integration owner, final verification |
| UI/page/layout/component work | Normal route plus `impeccable` | Rendered evidence or recorded blocker |
| Browser QA, ship, health | Repo-native Playwright smoke + capture scripts + CI gates | Screenshot/log/check output |
| Security review or finding validation | Repo security workflow (security.yml) + targeted review | Finding evidence and validation result |
| Formal product/spec change | OpenSpec when needed | Link OpenSpec artifacts into task packet |

## CodeGraph Gate

Use CodeGraph for structural questions before falling back to text search.

| Stage | Use |
|---|---|
| Task intake | `codegraph_context` or equivalent structural lookup to narrow relevant files |
| Planning | `codegraph_impact` for proposed public API, shared module, route, or generated-code changes |
| Implementation | `codegraph_callers` / `codegraph_callees` before changing shared symbols |
| Flow analysis | `codegraph_trace` when the task asks how data or control reaches another point |
| Review | `codegraph_impact` to check affected surface and possible downstream breakage |

If CodeGraph is unavailable or stale, state that and use the next-best repo inspection path.

## UI Gate

Trigger `impeccable` when the task mentions or touches:

- page, view, screen, route
- form, table, dashboard, chart, list, detail
- modal, drawer, dialog, popover
- layout, CSS, style, component, responsive, mobile
- visual polish, spacing, typography, interaction state

For UI work, completion requires rendered evidence such as a screenshot/browser check, or a concrete reason it could not be produced.

## Parallel Fan-Out Contract

Use parallel fan-out (subagents, workflow orchestration, CI matrix jobs) for inner workflows that benefit from batch inspection or independent branches. Do not use it for ordinary one-step edits.

Each durable fan-out workflow should provide:

- a small schema or fixed shape for each branch result
- one synthesis step that turns branch outputs into a recommendation
- a persisted artifact (journal, evidence file, or report) so results survive the session
- a clear fallback when the orchestration backend is unavailable

## State Linkage

Every non-trivial task packet should include enough links to join artifacts across tools:

```text
Linkage:
- task-id:
- target-repo:
- openspec-change: none
- plan-ref: none
- workflow-artifact: none
- evidence-dir: none
- review-artifact: none
- qa-artifact: none
```

Legacy artifact references (Superpowers plans, OMX goals/plans, codex-flow journals) remain valid `plan-ref` values for historical tasks.

Do not double-write the same decision into multiple systems. If OpenSpec already owns proposal/design/tasks, downstream planning should consume those artifacts. If a plan was produced first and formal spec history is required, write a compact OpenSpec change that points back to the plan.

## Stop Conditions

A workflow is complete only when:

- the target repository and task layer are explicit
- changed files are within the intended scope
- required gates have either passed or have recorded blockers
- verification evidence is fresh and named
- remaining risk is stated plainly

If orchestration tools are unavailable, fall back to direct execution plus the task packet and the smallest useful verification. Tool unavailability should not block low-risk local work.
