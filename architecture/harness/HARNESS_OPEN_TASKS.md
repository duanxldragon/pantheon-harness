# Harness Open Tasks

This file tracks method-level tasks that are intentionally not blocking the current method release.

## Active Tasks

| Task ID | Area | Trigger | Promotion Rule | Status |
|---|---|---|---|---|
| `HOT-001` | visual evidence | `check-visual-evidence.mjs --strict` currently supports observation mode before becoming a hard CI gate. | Follow `VISUAL_EVIDENCE_PROMOTION_POLICY.md` for the promotion window, rollback conditions, and recording requirements. | open |
| `HOT-002` | failure registry | `check-failure-registry.mjs` currently treats a missing default registry as a warning. | Follow `FAILURE_REGISTRY_PROMOTION_POLICY.md` for downstream adoption thresholds, upgrade actions, and rollback conditions. | open |

## Recently Closed

| Task ID | Area | Result | Closed |
|---|---|---|---|
| `HOT-003` | failure registry | Added `check-failure-registry.mjs`, tests, repo-shell sync, method-health integration, and seeded registry files. | 2026-05-20 |
| `HOT-004` | docs integrity | Added this open-task tracker to resolve the broken strict-mode promotion-plan link. | 2026-05-20 |

## Review Cadence

- Review this file during method releases.
- Move completed items to `Recently Closed` with evidence or a linked checker.
- If an open item becomes a repeated failure, follow `FAILURE_RATCHET_POLICY.md` and add or update an entry in `docs/harness/failure-registry.md` when appropriate.
- During release review or major model/tool upgrades, use `HARNESS_RETIREMENT_REVIEW.md` to decide whether an open item should stay, downgrade, or be removed.
