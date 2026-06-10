# Review Summary: <task-id>

## Machine Readable

```json
{
  "taskId": "<task-id>",
  "verdict": "approved",
  "structuralReview": {
    "affectedSubgraph": [
      "entry -> core path -> exit/side effect"
    ],
    "checks": [
      "cycle",
      "hub",
      "call-depth",
      "sensitive-flow"
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
  "deliveryGovernanceReview": {
    "designGate": "satisfied",
    "developmentGate": "satisfied",
    "qaAcceptanceGate": "satisfied",
    "githubGovernanceGate": "method-gate"
  },
  "linkage": {
    "taskPacket": "docs/harness/tasks/<task-id>.task.md",
    "evidence": ".harness/evidence/<task-id>/commands.json",
    "reviewFile": ".harness/evidence/<task-id>/review.md",
    "changeRef": "openspec/changes/<name>/",
    "planRefs": [
      "docs/superpowers/plans/<file>.md",
      ".omx/plans/<file>.md",
      ".codex-flow/journal/<file>.jsonl"
    ]
  }
}
```

## Linkage

- Task Packet: `docs/harness/tasks/<task-id>.task.md`
- Evidence: `.harness/evidence/<task-id>/commands.json`
- OpenSpec Change: `openspec/changes/<name>/` | none

## Verdict

approved | changes requested | blocked | approved with documented P2 follow-up

## Findings

No P0/P1/P2 findings found.

## Structural Notes

- Affected subgraph: `entry -> core path -> exit/side effect`
- Checks: `cycle`, `hub`, `call-depth`, `sensitive-flow`
- Findings: none

## Method Notes

- Owner layer: portable-method | consumer-template | consumer-repository | agent-adapter | no-action
- Ratchet decision: no-repeat-observed | guide-updated | sensor-added | gate-updated | template-updated | adapter-updated | registry-only
- Deferred code issues: none
- Consumer-specific leakage: none | accepted | blocked

## Delivery Governance Notes

- Design gate: satisfied | gap-recorded | not-applicable
- Development gate: satisfied | gap-recorded | not-applicable
- QA acceptance gate: satisfied | gap-recorded | not-applicable
- GitHub governance gate: method-gate | repo-quality-gate | runtime-evidence-gate | external-flaky | not-applicable

## Residual Risk

- none

## Verification Checked

- `command`
