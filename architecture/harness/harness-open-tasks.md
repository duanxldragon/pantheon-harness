# Harness Open Tasks

This file tracks method-level tasks that are intentionally not blocking the current method release.

## Active Tasks

| Task ID | Area | Trigger | Promotion Rule | Status |
|---|---|---|---|---|
| `HOT-001` | visual evidence | 2026-07-26 evaluation: in pantheon-harness CI the checker already runs as a blocking `--strict` step (harness-health.yml, no continue-on-error) — that de facto promotion is recorded here retroactively per policy §4; it is vacuously green because this repo has no UI tasks. The policy's real promotion window (3 consecutive UI-affecting tasks with viewport/state plans and rendered evidence) can only accumulate in UI-bearing consumer repos, and pantheon-base CI does not yet run `check-visual-evidence.mjs` at all. | Remaining scope: wire the checker into pantheon-base CI in observation mode (`continue-on-error: true`), accumulate the 3-task window per `visual-evidence-promotion-policy.md`, then promote there. | open |
| `HOT-002` | failure registry | `check-failure-registry.mjs` currently treats a missing default registry as a warning. 2026-07-26 evaluation: seeding threshold is 1/2 — pantheon-base has `docs/harness/failure-registry.md`, pantheon-ops does not — so promotion conditions are not met. | Next action: seed the pantheon-ops registry from `patterns/templates/failure-registry.template.md`, then re-evaluate the 2-release-cycle retention condition at a release review per `failure-registry-promotion-policy.md`. | open |

## Recently Closed

| Task ID | Area | Result | Closed |
|---|---|---|---|
| `HOT-005` | doc projection consolidation | Closed with maintainer decisions (2026-07-26 intake): (1) adapter layer merged — `config/agents/adapters/` is canonical, `.agents/adapters/*` converted to pointers with paths preserved for adoption checks, capability-mapping tables carried over, stale stub content (outdated tool flags, superseded Evidence Format JSON) retired; (2) en/zh dual maintenance retained deliberately (Chinese canonical, English best-effort); (3) `docs/harness` pointer layer retained in full. `architecture/harness` vs `patterns` overlap verified already pointerized (4 pointer files). Task packet: `2026-07-26-hot-005-adapter-layer-consolidation`. | 2026-07-26 |
| `HOT-003` | failure registry | Added `check-failure-registry.mjs`, tests, repo-shell sync, method-health integration, and seeded registry files. | 2026-05-20 |
| `HOT-004` | docs integrity | Added this open-task tracker to resolve the broken strict-mode promotion-plan link. | 2026-05-20 |

## Review Cadence

- Review this file during method releases.
- Move completed items to `Recently Closed` with evidence or a linked checker.
- If an open item becomes a repeated failure, follow `failure-ratchet-policy.md` and add or update an entry in `docs/harness/failure-registry.md` when appropriate.
- During release review or major model/tool upgrades, use `harness-retirement-review.md` to decide whether an open item should stay, downgrade, or be removed.
