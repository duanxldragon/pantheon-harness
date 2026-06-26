# Harness Coverage Review

## Scope

- Repository:
- Review date:
- Reviewer:
- Primary template:
- Overlays:

## Coverage Summary

| Dimension | Current Controls | Known Gaps | Next Action |
|---|---|---|---|
| Behaviour |  |  |  |
| Maintainability |  |  |  |
| Architecture fitness |  |  |  |
| Runtime quality |  |  |  |
| Method health |  |  |  |

## Sensor Effectiveness

| Sensor | Phase | Defects Caught | False Positives | Known Misses | Decision |
|---|---|---:|---:|---:|---|
| `command-or-review` | inner-loop \| PR \| CI \| scheduled \| runtime | 0 | 0 | 0 | keep \| tune \| downgrade \| remove |

## Failure Registry Changes

- Added:
- Updated:
- Closed:

## Delivery Governance Review

| Gate | Current Evidence | Common Failure Signal | Next Action |
|---|---|---|---|
| Design | spec \| short boundary \| none | unclear scope \| missing contract anchor | keep \| improve template \| add review prompt |
| Development | expected files \| do-not-touch \| plan | scope creep \| agent handoff loss | keep \| improve task packet \| add sensor |
| QA acceptance | command \| browser \| runtime \| human review | missing evidence \| untested runtime path | keep \| add smoke \| require gap note |
| GitHub governance | PR classification \| CI result \| review | unclassified red CI \| repeated cleanup churn | keep \| tune gate \| ratchet failure |

## Cross-Agent Ratchet Review

| Failure Class | Owner Layer | Current Control | Promotion Latency | Next Ratchet Decision |
|---|---|---|---|---|
| instruction-gap | portable-method \| consumer-template \| consumer-repository \| agent-adapter \| no-action |  |  | guide-updated \| sensor-added \| gate-updated \| template-updated \| adapter-updated \| registry-only |

## Consumer Specificity Review

- Consumer-specific controls that must stay local:
- Controls that should be promoted into the portable method:
- Consumer-specific leakage found in portable assets:
- Decision: none | accepted | blocked

## Deferred Code Backlog

| Task ID | Deferred Issue | Severity | Owner Layer | Follow-Up |
|---|---|---|---|---|
|  |  | P0 \| P1 \| P2 \| P3 | consumer-repository \| consumer-template |  |

## Load-Bearing Review

- Controls still needed:
- Controls to simplify:
- Controls to remove:
- New controls to add:
- Noisy sensors to tune or downgrade:

## Decisions

- Decision:
- Rationale:
- Follow-up owner:
