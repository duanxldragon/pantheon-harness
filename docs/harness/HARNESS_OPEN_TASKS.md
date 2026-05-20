# Harness Open Tasks

This file tracks method-level tasks that are intentionally not blocking the current method release.

## Active Tasks

| Task ID | Area | Trigger | Promotion Rule | Status |
|---|---|---|---|---|
| `HOT-001` | visual evidence | `check-visual-evidence.mjs --strict` currently supports observation mode before becoming a hard CI gate. | Promote from observed warning gate to blocking CI gate after two consecutive UI-related tasks include viewport/state plans and browser or screenshot evidence. | open |
| `HOT-002` | failure registry | `check-failure-registry.mjs` currently treats a missing default registry as a warning. | Promote registry presence to a required landing file after downstream repositories have seeded `docs/harness/failure-registry.md`. | open |

## Recently Closed

| Task ID | Area | Result | Closed |
|---|---|---|---|
| `HOT-003` | failure registry | Added `check-failure-registry.mjs`, tests, repo-shell sync, method-health integration, and seeded registry files. | 2026-05-20 |
| `HOT-004` | docs integrity | Added this open-task tracker to resolve the broken strict-mode promotion-plan link. | 2026-05-20 |

## Review Cadence

- Review this file during method releases.
- Move completed items to `Recently Closed` with evidence or a linked checker.
- If an open item becomes a repeated failure, add or update an entry in `docs/harness/failure-registry.md`.
