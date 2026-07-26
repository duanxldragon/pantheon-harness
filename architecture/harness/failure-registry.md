# Failure Registry

This registry turns repeated agent or process failures into concrete harness changes.

## Scope

- Repository: `pantheon-harness`
- Owner: method maintainer
- Review cadence: after each harness method release or after repeated agent failure
- Last reviewed: 2026-07-26

## Registry

| Failure ID | Category | Failure Class | Owner Layer | Occurrences | Example | Impact | GitHub Signal | Current Guide | Current Sensor | Current Gate | Detected By | Missed By | Recommended Harness Change | Promotion Decision | Promotion Deadline | Status |
|---|---|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| `FR-001` | method-health | method-health-gap | portable-method | 1 | The method described a failure registry but had no repo-local registry file or dedicated checker. | Repeated failures could be discussed without becoming durable guide, sensor, gate, or template changes. | method-gate | `patterns/harness-coverage-model.md` | `scripts/harness/check-failure-registry.mjs` | `scripts/harness/check-method-health.mjs --strict` | harness method review | previous method-health check | sensor | sensor-added | none | implemented |
| `FR-002` | method-health | method-health-gap | portable-method | 1 | `scripts/harness/README.md` referenced `docs/harness/harness-open-tasks.md`, but the file was missing. | A documented promotion plan pointed to a broken link, weakening the method's own evidence trail. | method-gate | `scripts/harness/README.md` | `scripts/harness/check-doc-links.mjs` | documentation review | repository scan | previous adoption check | template | template-updated | none | implemented |
| `FR-003` | method-health | method-health-gap | portable-method | 1 | The required Harness workflow assumed a parent workspace path and strict evidence/review checks passed with zero artifacts. | A standalone method checkout could fail CI paths or report a false green lifecycle gate. | method-gate | `patterns/install.md` | `scripts/harness/check-evidence.mjs`, `scripts/harness/check-review.mjs` | `Harness report` | team-mode governance review | previous workflow path checks | gate | gate-updated | none | implemented |
| `FR-004` | method-health | doc-reference-drift | portable-method | 1 | `harness-method-playbook.md` step 14, `config/agents/adapters/*`, `config/agents/prompts/*`, and `harness-open-tasks.md` referenced retired uppercase contract filenames (for example `TASK_PACKET_SPEC.md`) while the actual files are lowercase; residual uppercase cross-references inside `architecture/harness/*` and `patterns/*` bodies are swept under `HOT-005`. | Agents following required-reading lists resolve to nonexistent paths; entry guidance silently rots. | method-gate | `architecture/harness/harness-method-playbook.md` | `scripts/harness/check-doc-links.mjs` (markdown links only) | `check-doc-links.mjs --strict` | 2026-07-26 methodology review | check-doc-links (backtick paths out of scope) | guide | guide-updated; a backtick-path sensor was evaluated and rejected for high false-positive risk (backtick paths legitimately reference consumer-repo layouts) | none | implemented |
| `FR-005` | method-health | governance-cadence-lapse | portable-method | 1 | Registry last-reviewed 2026-06-08 despite an after-each-release cadence; v1.3.0 and v1.4.0 shipped without a registry review, and no completed coverage review artifact existed despite the template. | The ratchet loop runs without fuel: findings stay in chat instead of becoming durable guide/sensor/gate changes. | method-gate | `architecture/harness/failure-registry.md` | manual review cadence | `check-method-health.mjs --strict` (presence only) | 2026-07-26 methodology review | cadence freshness not mechanically checked | state | state-updated; first coverage review artifact recorded under `.harness/evidence/2026-07-26-method-review-rectification/`; if the lapse repeats, promote a staleness warning into `check-method-health.mjs` | none | implemented |

## Review Notes

- Repeated failures: method self-governance gaps now include registry presence, documentation inventory, standalone CI pathing, strict artifact presence, doc-reference casing drift (`FR-004`), and registry cadence lapse (`FR-005`).
- Sensors with false positives: none recorded.
- Sensors with known false negatives: `check-doc-links.mjs` does not validate backtick-quoted paths (accepted, see `FR-004`); registry cadence freshness is not mechanically checked (watch item, see `FR-005`); downstream repositories can still drift if they do not vendor the updated method kit or repo shell projection.
- Rules to remove or downgrade: none this round; doc projection consolidation registered as `HOT-005` in `harness-open-tasks.md` for the next retirement review.
- Next harness changes: gate-outcome closeout line (solo-delivery-tiers §6.1) should start producing sensor hit/false-positive data for the next coverage review; promote it to a mechanical check only if the habit sticks and the data proves useful.
