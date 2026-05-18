# Review Summary: example

## Machine Readable

```json
{
  "taskId": "example",
  "verdict": "approved",
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

## Residual Risk

- none

## Verification Checked

- `node agentic-method-kit/scripts/check-task-packet.mjs --root agentic-method-kit/examples/minimal-repo --config ../../config/method.config.json`
