# Pantheon Workflow Routing

This document is the workspace-level routing contract for development work. It decides which surface owns each part of a task so the tools do not compete with each other.

`workflow.md` is a discussion record. Use this document, `CLAUDE.md`, and `docs/codex-workflow-quick-reference.md` as the operational sources.

For the current solo-maintainer stage, apply [Solo Delivery Tiers](./SOLO_DELIVERY_TIERS.md) before selecting a lane. Choose the lightest tier that can safely finish the task, then apply the routing rules below.

## Core Model

Use the smallest workflow that can finish the task with evidence.

| Layer | Owner | Role |
|---|---|---|
| Direct execution | Native Codex | Small, clear, low-risk edits and answers |
| Outer orchestration | OMX | Clarification, planning, lane selection, durable goals, team coordination, quality gate routing |
| Inner parallel execution | `dynamic-workflow` / `codex-flow` | Independent branches, batch review, resumable analysis, repeatable pipelines |
| Structural context | CodeGraph | Symbol lookup, impact, callers/callees, trace, affected subgraph |
| UI quality gate | `impeccable` | Visual quality, responsive behavior, rendered evidence expectations |
| Operational gates | GStack / Browser / Codex Security | Browser QA, ship, health, canary, security review, live/operator checks |

OMX is not a replacement for every tool. It is the coordinator. `codex-flow` is not the coordinator. It is the resumable fan-out engine. CodeGraph and `impeccable` are gates that must be used inside whichever execution path applies.

Keep `impeccable`. It is the current UI visual quality gate because it catches visual polish, layout, responsive, and interaction-state issues better than generic code review. OMX and `codex-flow` route work; they do not replace `impeccable`.

## Decision Tree

Start every non-trivial task by identifying the target repository, layer, risk, and evidence requirement.

For Pantheon day-to-day delivery, first classify the task as:

- `L0` direct change
- `L1` lean delivery
- `L2` full governance

Then route within that tier instead of defaulting every non-trivial task to the heaviest loop.

```text
Task arrives
  |
  +-- Is it one clear low-risk local change?
  |     -> Native Codex + minimum relevant verification
  |
  +-- Is intent, scope, design, or lane unclear?
  |     -> OMX planning path: $deep-interview or $ralplan
  |
  +-- Is there an approved plan that needs durable execution?
  |     -> OMX goal path: $ultragoal
  |     -> Use $team only for coordinated multi-lane execution
  |     -> Use $ralph only for a persistent single-owner loop
  |
  +-- Are there independent branches, many files/items to inspect, or a resumable analysis pipeline?
  |     -> codex-flow inside the chosen outer path
  |
  +-- Does the task touch UI, layout, visual states, dashboards, forms, tables, charts, or responsive behavior?
  |     -> impeccable gate before implementation and before completion
  |
  +-- Does it need browser evidence, QA, shipping, health, canary, or security review?
        -> GStack / Browser / Codex Security as the operational gate
```

When two paths apply, prefer composition over replacement:

1. OMX chooses the lane and stop condition.
2. `codex-flow` runs independent or resumable inner branches when that materially helps.
3. Native Codex integrates, edits, and verifies the final change unless a specific OMX runtime owns that execution.

## Routing Matrix

| Task shape | Primary route | Required gates |
|---|---|---|
| Single-file fix, docs typo, obvious local bug | Native Codex | Minimum targeted test/check |
| `L1` ordinary solo delivery | Native Codex or OMX planning path | Lean plan plus targeted verification |
| Ambiguous request, missing boundaries, unclear acceptance | OMX `$deep-interview` or `$ralplan` | CodeGraph when repo structure matters |
| Architecture/design/tradeoff decision | OMX `$ralplan` | CodeGraph impact, explicit acceptance criteria |
| Approved multi-step implementation | Native Codex or OMX `$ultragoal` based on durability need | Tests/build/smoke proportional to risk |
| Many independent files/modules/repos to inspect | `codex-flow` | Journal artifact plus synthesized recommendation |
| Parallel implementation lanes | OMX `$team` | Shared task list, integration owner, final verification |
| Persistent owner loop | OMX `$ralph` | Goal/evidence checklist |
| UI/page/layout/component work | Normal route plus `impeccable` | Rendered evidence or recorded blocker |
| Browser QA, ship, health, canary | GStack / Browser | Screenshot/log/check output |
| Security review or finding validation | Codex Security skills | Finding evidence and validation result |
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

## `codex-flow` Contract

Use `codex-flow` for inner workflows that benefit from resumability or parallel fan-out. Do not use it for ordinary one-step edits.

Preferred launcher on Windows:

```powershell
node scripts/codex-workflow.mjs doctor
node scripts/codex-workflow.mjs run .codex-flow/generated/<slug>.workflow.ts
node scripts/codex-workflow.mjs smoke
```

The launcher adds the bundled Codex binary directory to `PATH` and defaults `run` / `smoke` to `codex-exec` unless a backend is specified.

Each durable `codex-flow` workflow should provide:

- a small schema for each branch result
- one synthesis node that turns branch outputs into a recommendation
- a journal under `.codex-flow/journal/`
- a clear fallback when the real backend is unavailable

## State Linkage

Every non-trivial task packet should include enough links to join artifacts across tools:

```text
Linkage:
- task-id:
- target-repo:
- openspec-change: none
- omx-plan: none
- omx-goal-id: none
- codex-flow-workflow: none
- codex-flow-journal: none
- evidence-dir: none
- review-artifact: none
- qa-artifact: none
```

Do not double-write the same decision into multiple systems. If OpenSpec already owns proposal/design/tasks, OMX should consume those artifacts. If OMX produced the plan first and formal spec history is required, write a compact OpenSpec change that points back to the OMX plan.

## Stop Conditions

A workflow is complete only when:

- the target repository and task layer are explicit
- changed files are within the intended scope
- required gates have either passed or have recorded blockers
- verification evidence is fresh and named
- remaining risk is stated plainly

If orchestration tools are unavailable, fall back to native Codex plus the task packet and the smallest useful verification. Tool unavailability should not block low-risk local work.
