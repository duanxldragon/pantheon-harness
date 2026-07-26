# Harness Open Tasks

This file tracks method-level tasks that are intentionally not blocking the current method release.

## Active Tasks

| Task ID | Area | Trigger | Promotion Rule | Status |
|---|---|---|---|---|
| `HOT-001` | visual evidence | `check-visual-evidence.mjs --strict` currently supports observation mode before becoming a hard CI gate. | Follow `visual-evidence-promotion-policy.md` for the promotion window, rollback conditions, and recording requirements. | open |
| `HOT-002` | failure registry | `check-failure-registry.mjs` currently treats a missing default registry as a warning. | Follow `failure-registry-promotion-policy.md` for downstream adoption thresholds, upgrade actions, and rollback conditions. | open |
| `HOT-005` | doc projection consolidation | The 2026-07-26 methodology review found ~196 markdown files across overlapping projection layers: `architecture/harness` vs `patterns` overlap, `.agents/adapters` vs `config/agents/adapters` duplicate adapter layers, and full en/zh dual maintenance (Chinese is canonical since 2026-07-26; English is best-effort). | Run as a dedicated retirement-review-scoped task with its own task packet and rollback plan: pick one canonical location per document, convert the rest to pointers or delete them, and decide per English projection whether to keep, regenerate, or drop. Do not consolidate in-place inside unrelated tasks. | open |

## Recently Closed

| Task ID | Area | Result | Closed |
|---|---|---|---|
| `HOT-003` | failure registry | Added `check-failure-registry.mjs`, tests, repo-shell sync, method-health integration, and seeded registry files. | 2026-05-20 |
| `HOT-004` | docs integrity | Added this open-task tracker to resolve the broken strict-mode promotion-plan link. | 2026-05-20 |

## Review Cadence

- Review this file during method releases.
- Move completed items to `Recently Closed` with evidence or a linked checker.
- If an open item becomes a repeated failure, follow `failure-ratchet-policy.md` and add or update an entry in `docs/harness/failure-registry.md` when appropriate.
- During release review or major model/tool upgrades, use `harness-retirement-review.md` to decide whether an open item should stay, downgrade, or be removed.
