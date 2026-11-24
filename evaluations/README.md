# Workflow Evaluations

Compare representative tasks with the same scope and acceptance checks: a local L1 fix, an authorization/schema L2 change, Base-to-Ops compatibility work and a resumed task. Use existing task/evidence summaries rather than a separate tracking platform.

Record the actual task/candidate, policy commit, available model/client/effort, initial context files/bytes, elapsed work/check time, retries, human interventions, delegation count, acceptance result and regressions. Tokens/cost unavailable from the runtime are `unknown`. Separate environment waiting from agent work.

```json
{
  "taskId": "existing-task-id",
  "candidate": "actual-commit-or-dirty-snapshot",
  "methodCommit": "full-sourceCommit",
  "model": "unknown",
  "contextBytes": 0,
  "elapsedMs": null,
  "environmentWaitMs": null,
  "retries": 0,
  "humanInterventions": 0,
  "acceptance": "not-run",
  "tokens": "unknown",
  "cost": "unknown"
}
```

Smaller entrypoints or passing sensor tests establish those observations only. Claim a workflow speedup only after comparable completed tasks show it; retain negative results and missing metrics.
