# Failure Registry

This registry turns repeated agent or process failures into concrete harness changes.

## Scope

- Repository: `pantheon-harness`
- Owner: method maintainer
- Review cadence: after each harness method release or after repeated agent failure
- Last reviewed: 2026-06-08

## Registry

| Failure ID | Category | Failure Class | Owner Layer | Occurrences | Example | Impact | GitHub Signal | Current Guide | Current Sensor | Current Gate | Detected By | Missed By | Recommended Harness Change | Promotion Decision | Promotion Deadline | Status |
|---|---|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| `FR-001` | method-health | method-health-gap | portable-method | 1 | The method described a failure registry but had no repo-local registry file or dedicated checker. | Repeated failures could be discussed without becoming durable guide, sensor, gate, or template changes. | method-gate | `patterns/harness-coverage-model.md` | `scripts/harness/check-failure-registry.mjs` | `scripts/harness/check-method-health.mjs --strict` | harness method review | previous method-health check | sensor | sensor-added | none | implemented |
| `FR-002` | method-health | method-health-gap | portable-method | 1 | `scripts/harness/README.md` referenced `docs/harness/harness-open-tasks.md`, but the file was missing. | A documented promotion plan pointed to a broken link, weakening the method's own evidence trail. | method-gate | `scripts/harness/README.md` | `scripts/harness/check-doc-links.mjs` | documentation review | repository scan | previous adoption check | template | template-updated | none | implemented |
| `FR-003` | method-health | method-health-gap | portable-method | 1 | The required Harness workflow assumed a parent workspace path and strict evidence/review checks passed with zero artifacts. | A standalone method checkout could fail CI paths or report a false green lifecycle gate. | method-gate | `patterns/install.md` | `scripts/harness/check-evidence.mjs`, `scripts/harness/check-review.mjs` | `Harness report` | team-mode governance review | previous workflow path checks | gate | gate-updated | none | implemented |

## Review Notes

- Repeated failures: method self-governance gaps now include registry presence, documentation inventory, standalone CI pathing, and strict artifact presence.
- Sensors with false positives: none recorded.
- Sensors with known false negatives: downstream repositories can still drift if they do not vendor the updated method kit or repo shell projection.
- Rules to remove or downgrade: none.
- Next harness changes: consider promoting registry presence from warning to required landing file after downstream repositories have adopted it.
