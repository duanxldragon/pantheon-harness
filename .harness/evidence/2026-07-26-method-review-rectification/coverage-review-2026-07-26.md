# Harness Coverage Review

## Scope

- Repository: pantheon-harness
- Review date: 2026-07-26
- Reviewer: Claude Fable 5 (agent, full-repo methodology review) + maintainer (touchpoint acceptance)
- Primary template: docs-governance
- Overlays: none

## Coverage Summary

| Dimension | Current Controls | Known Gaps | Next Action |
|---|---|---|---|
| Behaviour | check-*.mjs gates with own tests; task packet + evidence loop | n/a for this repo (method docs, no runtime app) | keep |
| Maintainability | doc-frontmatter/links/inventory/encoding gates; sync-drift check | ~196 markdown files across 3 projection layers plus en/zh duplication | `HOT-005` consolidation at next retirement review |
| Architecture fitness | patterns/ declared single method source; pointer files in docs/harness | architecture/harness vs patterns overlap not fully pointerized; `.agents/` vs `config/agents/` duplicate adapter layers | scoped into `HOT-005` |
| Runtime quality | not applicable (no runtime surface in this repo) | consumer repos own runtime gates | keep |
| Method health | failure registry + check-failure-registry; retirement reviews (2026-07-15/17 executed) | registry cadence lapsed 2026-06-08 → 2026-07-26 (`FR-005`); no coverage review artifact existed before this one | this artifact; watch cadence, mechanize staleness warning if lapse repeats |

## Sensor Effectiveness

> Data source: `Gate Outcomes` closeout lines recorded since the last review, plus CI/gate logs. If no gate-outcome records exist for the period, state that explicitly instead of estimating.

No gate-outcome closeout records exist for this period — the recording convention was introduced today (solo-delivery-tiers §6.1). Counts below reflect only what this review itself established; the next review should have real per-task data.

| Sensor | Phase | Defects Caught | False Positives | Known Misses | Decision |
|---|---|---:|---:|---:|---|
| `check-doc-links.mjs` | PR / CI | 0 | 0 | 1 (backtick-path casing drift, `FR-004`) | keep (backtick extension evaluated and rejected: high false-positive risk) |
| `check-doc-frontmatter.mjs` | PR / CI | 0 | 0 | 0 | keep |
| `check-method-health.mjs --strict` | PR / CI | 0 | 0 | 1 (registry staleness not checked, `FR-005`) | keep; add staleness warning only if lapse repeats |
| `check-evidence.mjs` / `check-review.mjs` | PR / CI | 0 | 0 | 0 | keep |
| manual review cadence (registry / coverage) | scheduled | 0 | 0 | 1 (cadence lapse itself) | tune: coverage review now anchored to release + retirement events |

## Failure Registry Changes

- Added: `FR-004` (doc-reference casing drift), `FR-005` (governance cadence lapse)
- Updated: last-reviewed 2026-06-08 → 2026-07-26; review notes rewritten
- Closed: none

## Delivery Governance Review

| Gate | Current Evidence | Common Failure Signal | Next Action |
|---|---|---|---|
| Design | task packet with In/Out, grill-me challenge path | reading-order entry was too deep to be used as designed | improved: playbook rewritten as tier-driven one-page entry |
| Development | expected files + do-not-touch in packet | reference drift in required-reading lists (`FR-004`) | fixed; keep |
| QA acceptance | command evidence per verification-evidence-spec | none observed this cycle | keep; gate-outcome line now feeds this table |
| GitHub governance | PR template + CI quality gates | none observed this cycle | keep |

## Cross-Agent Ratchet Review

| Failure Class | Owner Layer | Current Control | Promotion Latency | Next Ratchet Decision |
|---|---|---|---|---|
| doc-reference-drift | portable-method | lowercase references restored; check-doc-links unchanged | same-day | guide-updated |
| governance-cadence-lapse | portable-method | registry refreshed; coverage review anchored to release/retirement events | ~7 weeks (2026-06-08 → 2026-07-26) | registry-only; sensor-added deferred until recurrence |
| instruction-gap (three-touchpoint contract not visible at adapter entry) | agent-adapter | contract section added to all 12 `config/agents/adapters/*` files, linking canonical workflow-routing definition | 9 days (2026-07-17 codified → 2026-07-26 sunk into adapters) | adapter-updated |

## Consumer Specificity Review

- Consumer-specific controls that must stay local: pantheon-base/ops tier defaults in solo-delivery-tiers §5 (already marked repo-local)
- Controls that should be promoted into the portable method: none this round
- Consumer-specific leakage found in portable assets: none this round
- Decision: accepted

## Deferred Code Backlog

| Task ID | Deferred Issue | Severity | Owner Layer | Follow-Up |
|---|---|---|---|---|
| `HOT-005` | Doc projection consolidation (architecture/harness vs patterns vs docs/harness; `.agents/` vs `config/agents/`; en/zh dual maintenance) | P2 | portable-method | next retirement review; see harness-open-tasks.md |

## Load-Bearing Review

- Controls still needed: all mechanical gates; failure registry; retirement review protocol; three-touchpoint contract; tier system
- Controls to simplify: doc projection layers (`HOT-005`); playbook reading order (done this cycle — 15-step list → tier entry)
- Controls to remove: none this round
- New controls to add: gate-outcome closeout line (added, advisory)
- Noisy sensors to tune or downgrade: none recorded

## Decisions

- Decision: Chinese declared canonical documentation language, English best-effort projection (recorded in playbook, effective 2026-07-26); doc consolidation registered as `HOT-005` instead of in-place mass surgery; gate-outcome line introduced as advisory guide, not a mechanical gate.
- Rationale: consolidation touches ~196 files and belongs in a dedicated retirement-review-scoped task with its own rollback plan; a new mechanical sensor before usage data exists would violate the sensor-placement policy.
- Follow-up owner: method maintainer (next release or retirement review, whichever first)
