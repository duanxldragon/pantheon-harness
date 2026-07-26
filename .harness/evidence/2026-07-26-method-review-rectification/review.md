# Review: method review rectification

## Summary

Closed the six findings from the 2026-07-26 methodology review in one governed pass. The playbook is now a tier-driven one-page entry (15-step reading list removed) with Chinese declared canonical and English best-effort; retired uppercase contract references were fixed across the playbook, all 12 agent adapters, and harness-open-tasks; the three-touchpoint maintainer contract is now visible at every adapter entry with a link to the canonical workflow-routing definition; solo-delivery-tiers gained an advisory Gate Outcomes closeout line (§6.1) feeding future coverage reviews; the failure registry was refreshed (FR-004 doc-reference drift, FR-005 cadence lapse) and the first completed coverage review artifact was recorded; the heavy doc-projection consolidation was deliberately not done in-place and is registered as HOT-005 for a dedicated retirement-review-scoped task.

## Findings

- No blocking findings.
- Scope note: uppercase-reference fixes in `config/agents/adapters/*`, `config/agents/prompts/*`, and `harness-open-tasks.md` exceed the packet's original playbook-only casing item, but all are agent-entry surfaces with the same FR-004 failure class; recorded in the packet's Modify list rather than split into a separate task. Residual uppercase cross-references inside `architecture/harness/*` and `patterns/*` document bodies (historical/spec-internal) are deferred to `HOT-005`.
- Self-review only (solo maintainer stage); findings-first format applied. Maintainer sign-off expected at final acceptance touchpoint per the three-touchpoint contract, including confirmation of the Chinese-canonical language decision (reversible).
- Deliberately rejected: extending `check-doc-links.mjs` to backtick paths (high false-positive risk against consumer-repo example paths) and mechanizing the Gate Outcomes line before usage data exists (sensor-placement policy).

## Machine Readable

```json
{
  "taskId": "2026-07-26-method-review-rectification",
  "verdict": "approved",
  "structuralReview": {
    "affectedSubgraph": [
      "playbook entry -> tier routing -> adapters -> closeout spec -> registry/coverage loop"
    ],
    "checks": [],
    "findings": [],
    "notes": "Method docs only; no code dependency graph risk. Validators and fixtures untouched."
  },
  "methodReview": {
    "ownerLayer": "portable-method",
    "ratchetDecision": "guide-updated",
    "deferredCodeIssues": [],
    "consumerSpecificLeakage": "none"
  },
  "deliveryGovernanceReview": {
    "designGate": "satisfied",
    "developmentGate": "satisfied",
    "qaAcceptanceGate": "satisfied",
    "githubGovernanceGate": "method-gate"
  },
  "linkage": {
    "taskPacket": "docs/harness/tasks/2026-07-26-method-review-rectification.task.md",
    "evidence": ".harness/evidence/2026-07-26-method-review-rectification/commands.json",
    "reviewFile": ".harness/evidence/2026-07-26-method-review-rectification/review.md",
    "changeRef": "none",
    "planRefs": [
      ".harness/evidence/2026-07-26-method-review-rectification/coverage-review-2026-07-26.md"
    ]
  }
}
```
