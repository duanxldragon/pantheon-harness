# Review: model-era retirement review and method simplification

## Summary

Executed the first model-era retirement review under `harness-retirement-review.md`. OMX/codex-flow active routing is replaced with capability-based routing, 46 zero-reference skill directories are removed (only `grill-me` and `impeccable` remain), old-model-oriented mandatory subagent routing tables are downgraded to principles, and legacy plan references stay valid for historical artifacts. Retirement criterion applied consistently: constraints compensating for old-model weakness retire; constraints guarding runtime probabilism and responsibility boundaries (evidence gates, Human Gate, role separation, impeccable) stay.

## Findings

- No blocking findings.
- Pre-existing: `.harness/evidence/2026-07-13-grill-me-enablement-and-superpowers-alignment/` fails current evidence/review schema on main (before this task); recorded as known gap for a follow-up packet.
- `workflow-routing.md` duplication (Core Model / Decision Tree pasted twice) removed as part of the rewrite.

## Machine Readable

```json
{
  "taskId": "2026-07-15-model-era-retirement-review",
  "verdict": "approved",
  "structuralReview": {
    "affectedSubgraph": [
      "workflow-routing -> tool-adapter-matrix -> task-delegation-template -> spec linkage wording -> skills registry"
    ],
    "checks": [],
    "findings": [],
    "notes": "No code dependency graph risk; changes are method docs, skill directory removal, and version metadata."
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
    "taskPacket": "docs/harness/tasks/2026-07-15-model-era-retirement-review.task.md",
    "evidence": ".harness/evidence/2026-07-15-model-era-retirement-review/commands.json",
    "reviewFile": ".harness/evidence/2026-07-15-model-era-retirement-review/review.md",
    "changeRef": "none",
    "planRefs": [
      "architecture/harness/retirement-reviews/2026-07-15-model-era-retirement-review.md"
    ]
  }
}
```
