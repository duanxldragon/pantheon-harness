---
title: Harness Method Playbook
doc_type: Playbook
layer: method
status: Active
updated_at: 2026-07-26
---

# Harness Method Playbook

Chinese version: [harness-method-playbook.md](./harness-method-playbook.md)

This file is the one-page entry to the method, not the full definition. Principle: short at the entry point, deep by link.

## Document Sources and Language

- `patterns/`: the single method source, responsible for method orchestration, templates, schema, and portable checks
- `docs/harness/*`: the repo-local contract and landing layer for this repository
- `scripts/harness/*`: the mechanical gates for this repository
- Language policy (since 2026-07-26): Chinese documents are canonical; English documents are best-effort projections. On divergence, Chinese wins and English is backfilled.

If the method layer conflicts with the repository landing layer, the method definition in `patterns/` wins, and the repository landing layer should then be synchronized.

## Entry by Tier

When a task arrives, first classify it per [solo-delivery-tiers](../methodology/solo-delivery-tiers.md), then read only what that tier requires:

| Tier | Required reading | Add when triggered |
|---|---|---|
| `L0` direct change | Nothing extra; follow the L0 closeout requirements | Touching any boundary escalates to `L1`/`L2` |
| `L1` lean delivery | [execution-guardrails](../../patterns/execution-guardrails.md) | `impeccable` for UI work; CodeGraph for structural questions |
| `L2` full governance | [task-packet-spec](./task-packet-spec.md), [verification-evidence-spec](./verification-evidence-spec.md), [review-loop-spec](./review-loop-spec.md) | Pick lane and gates per [workflow-routing](../methodology/workflow-routing.md) |
| `Proto First` exploration | [proto-driven-development](../methodology/proto-driven-development.md) | Backfill artifacts at the landing tier after convergence |

The human maintainer appears at exactly three touchpoints (requirement clarification, gate policy, final acceptance); everything between runs autonomously: see [workflow-routing — Human Touchpoints](../methodology/workflow-routing.md#human-touchpoints).

## Default Execution Guardrails

Before implementation, run through [execution-guardrails](../../patterns/execution-guardrails.md) by default:

- separate confirmed facts, working assumptions, and open questions instead of guessing silently
- walk [minimal-complexity-ladder](../../patterns/minimal-complexity-ladder.md) and keep the approach at the smallest load-bearing rung
- use [context-engineering-protocol](../../patterns/context-engineering-protocol.md) to decide entry sources, retrieval order, and sensitive-context boundaries before implementation
- declare `Do Not Touch` boundaries before making surgical edits
- state `Success Criteria` and `Verification Plan` before claiming a task is done

## Deep Reading (on demand, not a required sequence)

Consult the method source by topic:

- Core model: [harness-core-model](../../patterns/harness-core-model.md)
- Delivery order and ratchet: [method-first-delivery-policy](../../patterns/method-first-delivery-policy.md), [cross-agent-ratchet-model](../../patterns/cross-agent-ratchet-model.md), [harness-coverage-model](../../patterns/harness-coverage-model.md)
- Governance and collaboration: [design-dev-qa-github-governance](../../patterns/design-dev-qa-github-governance.md), [human-agent-collaboration-platform-assessment](../../patterns/human-agent-collaboration-platform-assessment.md)
- Templates and adapters: [harness-template-taxonomy](../../patterns/harness-template-taxonomy.md), [tool-adapter-matrix](../../patterns/tool-adapter-matrix.md), [method-playbook](../../patterns/method-playbook.md)

Contracts this repository executes locally (`docs/harness/` is the reading entry; canonical files live in this directory):

- [harness-engineering-contract](./harness-engineering-contract.md)
- [triviality-classification-policy](./triviality-classification-policy.md)
- [task-packet-spec](./task-packet-spec.md)
- [verification-evidence-spec](./verification-evidence-spec.md)
- [review-loop-spec](./review-loop-spec.md)
- [visual-quality-protocol](./visual-quality-protocol.md)
- [visual-evidence-promotion-policy](./visual-evidence-promotion-policy.md)
- [failure-ratchet-policy](./failure-ratchet-policy.md)
- [failure-registry-promotion-policy](./failure-registry-promotion-policy.md)
- [harness-retirement-review](./harness-retirement-review.md)

If the current repository adopts a project-specific overlay, then read the overlay-owned protocols, checkers, and upgrade rules.

## Responsibilities In This Repository

This repository keeps the following because they directly serve local execution:

- `docs/harness/*`: contracts, formats, governance rules
- `scripts/harness/*`: validators and CI gates
- added generic gates: review, template health, runtime evidence, docs links, and sync drift
- `.agents/*` / `.codex/skills/*`: tool adaptation layers
