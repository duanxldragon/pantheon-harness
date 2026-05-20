# Failure Registry

This registry turns repeated agent or process failures into concrete harness changes.

## Scope

- Repository: `harness-engineering`
- Owner: method maintainer
- Review cadence: after each harness method release or after repeated agent failure
- Last reviewed: 2026-05-20

## Registry

| Failure ID | Category | Example | Impact | Current Guide | Current Sensor | Current Gate | Detected By | Missed By | Recommended Harness Change | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| `FR-001` | method-health | The method described a failure registry but had no repo-local registry file or dedicated checker. | Repeated failures could be discussed without becoming durable guide, sensor, gate, or template changes. | `agentic-method-kit/HARNESS_COVERAGE_MODEL.md` | `scripts/harness/check-failure-registry.mjs` | `scripts/harness/check-method-health.mjs --strict` | harness method review | previous method-health check | sensor | implemented |
| `FR-002` | method-health | `scripts/harness/README.md` referenced `docs/harness/HARNESS_OPEN_TASKS.md`, but the file was missing. | A documented promotion plan pointed to a broken link, weakening the method's own evidence trail. | `scripts/harness/README.md` | docs link review | documentation review | repository scan | previous adoption check | template | implemented |

## Review Notes

- Repeated failures: none beyond the entries above.
- Sensors with false positives: none recorded.
- Sensors with known false negatives: link existence is not yet covered by a dedicated docs-link checker.
- Rules to remove or downgrade: none.
- Next harness changes: consider promoting registry presence from warning to required landing file after downstream repositories have adopted it.
