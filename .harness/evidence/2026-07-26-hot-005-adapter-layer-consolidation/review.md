# Review: HOT-005 adapter layer consolidation

## Summary

Closed HOT-005 with the maintainer's three intake decisions (2026-07-26). The adapter layer is consolidated: `config/agents/adapters/` is canonical and now carries required reading, tool-specific mapping, capability mapping (merged from `.agents/adapters/*`), and the human touchpoint contract in both languages; the six `.agents/adapters/*.md` files are pointers with paths preserved so check-adoption/check-method-health REQUIRED_FILES stay untouched. En/zh dual maintenance and the docs/harness pointer layer are retained deliberately per maintainer decision. No gate rules changed; no files deleted.

## Findings

- No blocking findings.
- Stale `.agents` stub content was retired rather than carried over: the codex `--apply` flag and `--system`/`--output` CLI claims (outdated), per-tool `Evidence Format` JSON stubs (superseded by `verification-evidence-spec.md` and the real commands.json schema), and Constraints paragraphs already covered by config adapter bodies. Recorded here per the retirement principle (assets guarding old-model behavior retire).
- Self-review only (solo maintainer stage); findings-first format applied.

## Machine Readable

```json
{
  "taskId": "2026-07-26-hot-005-adapter-layer-consolidation",
  "verdict": "approved",
  "structuralReview": {
    "affectedSubgraph": [
      ".agents/adapters -> config/agents/adapters -> harness-open-tasks"
    ],
    "checks": [],
    "findings": [],
    "notes": "Method docs only; adoption-check paths preserved via pointers; no validator changes."
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
    "taskPacket": "docs/harness/tasks/2026-07-26-hot-005-adapter-layer-consolidation.task.md",
    "evidence": ".harness/evidence/2026-07-26-hot-005-adapter-layer-consolidation/commands.json",
    "reviewFile": ".harness/evidence/2026-07-26-hot-005-adapter-layer-consolidation/review.md",
    "changeRef": "none",
    "planRefs": []
  }
}
```
