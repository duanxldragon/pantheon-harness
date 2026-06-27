---
title: Harness Method Playbook
doc_type: Playbook
layer: method
status: Active
updated_at: 2026-06-27
---

# Harness Method Playbook

Chinese version: [harness-method-playbook.md](./harness-method-playbook.md)

This file no longer carries the full method definition.

## Current Relationship

- `patterns/`: the single method source, responsible for method orchestration, templates, schema, and portable checks
- `docs/harness/*`: the repo-local contract and landing layer for this repository
- `scripts/harness/*`: the mechanical gates for this repository

## Reading Order

1. First read `patterns/README.md`
2. Then read `patterns/harness-core-model.md`
3. Then read `patterns/execution-guardrails.md`
4. Then read `patterns/context-engineering-protocol.md`
5. Then read `patterns/method-first-delivery-policy.md`
6. Then read `patterns/minimal-complexity-ladder.md`
7. Then read `patterns/harness-coverage-model.md`
8. Then read `patterns/cross-agent-ratchet-model.md`
9. Then read `patterns/design-dev-qa-github-governance.md`
10. Then read `patterns/human-agent-collaboration-platform-assessment.md`
11. Then read `patterns/harness-template-taxonomy.md`
12. Then read `patterns/tool-adapter-matrix.md`
13. Then read `patterns/method-playbook.md`
14. Then read the contracts this repository executes locally:
   - `HARNESS_ENGINEERING_CONTRACT.md`
   - `TRIVIALITY_CLASSIFICATION_POLICY.en.md`
   - `TASK_PACKET_SPEC.md`
   - `VERIFICATION_EVIDENCE_SPEC.md`
   - `REVIEW_LOOP_SPEC.md`
   - `VISUAL_QUALITY_PROTOCOL.md`
   - `VISUAL_EVIDENCE_PROMOTION_POLICY.en.md`
   - `FAILURE_RATCHET_POLICY.en.md`
   - `FAILURE_REGISTRY_PROMOTION_POLICY.en.md`
   - `HARNESS_RETIREMENT_REVIEW.en.md`
15. If the current repository adopts a project-specific overlay, then read the overlay-owned protocols, checkers, and upgrade rules.

## Default Execution Guardrails

Before implementation, run through `EXECUTION_GUARDRAILS.md` by default:

- separate confirmed facts, working assumptions, and open questions instead of guessing silently
- walk `MINIMAL_COMPLEXITY_LADDER.md` and keep the approach at the smallest load-bearing rung
- use `CONTEXT_ENGINEERING_PROTOCOL.md` to decide entry sources, retrieval order, and sensitive-context boundaries before implementation
- declare `Do Not Touch` boundaries before making surgical edits
- state `Success Criteria` and `Verification Plan` before claiming a task is done

## Responsibilities In This Repository

This repository keeps the following because they directly serve local execution:

- `docs/harness/*`: contracts, formats, governance rules
- `scripts/harness/*`: validators and CI gates
- added generic gates: review, template health, runtime evidence, docs links, and sync drift
- `.agents/*` / `.codex/skills/*`: tool adaptation layers

If the method layer conflicts with the repository landing layer, the method definition in `patterns/` wins, and the repository landing layer should then be synchronized.

