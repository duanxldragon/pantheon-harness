# Review Summary: example

## Machine Readable

```json
{
  "taskId": "example",
  "verdict": "approved",
  "structuralReview": {
    "affectedSubgraph": [
      "task packet -> evidence -> review"
    ],
    "checks": [
      "cycle",
      "hub"
    ],
    "findings": [],
    "notes": "none"
  },
  "methodReview": {
    "ownerLayer": "portable-method",
    "ratchetDecision": "template-updated",
    "deferredCodeIssues": [],
    "consumerSpecificLeakage": "none"
  },
  "linkage": {
    "taskPacket": "docs/harness/tasks/example.task.md",
    "evidence": ".harness/evidence/example/commands.json",
    "reviewFile": ".harness/evidence/example/review.md",
    "changeRef": "openspec/changes/example-change/",
    "planRefs": [
      "docs/superpowers/plans/example-plan.md"
    ]
  }
}
```

## Linkage

- Task Packet: `docs/harness/tasks/example.task.md`
- Evidence: `.harness/evidence/example/commands.json`
- OpenSpec Change: `openspec/changes/example-change/`

## Verdict

approved

## Findings

No P0/P1/P2 findings found.

## Structural Notes

- Affected subgraph: `task packet -> evidence -> review`
- Checks: `cycle`, `hub`
- Findings: none

## Method Notes

- Owner layer: portable-method
- Ratchet decision: template-updated
- Deferred code issues: none
- Consumer-specific leakage: none

## Residual Risk

- none

## Verification Checked

- `node agentic-method-kit/scripts/check-task-packet.mjs --root agentic-method-kit/examples/minimal-repo --config ../../config/method.config.json`
