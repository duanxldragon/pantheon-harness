# Harness Scripts

Chinese version: [README.zh.md](./README.zh.md)

This directory contains portable Harness Engineering checks for the method repository and downstream repo shells.

The portable method source of truth lives in `patterns/`. Scripts here are generic execution-layer sensors for task packets, evidence, review closure, documentation integrity, method health, and runtime/visual evidence. Project-specific checks belong in consumer repositories or optional overlays.

## Current Scripts

| Script | Purpose |
|---|---|
| `bootstrap-harness.mjs` | Generates or refreshes baseline Harness landing files for a target repository. |
| `check-task-packet.mjs` | Validates task packet structure and linkage. |
| `check-evidence.mjs` | Validates `.harness/evidence/**/commands.json`. |
| `check-review.mjs` | Validates machine-readable review artifacts. |
| `check-graph-review.mjs` | Checks task/evidence/review structural-scope closure. |
| `scaffold-graph-review.mjs` | Scaffolds graph review fields from task packets or imported graph results. |
| `build-graph-review-import.mjs` | Normalizes saved or live graph-review output. |
| `check-template-health.mjs` | Checks generic template-governance landing files. |
| `check-runtime-evidence.mjs` | Reports runtime-sensitive tasks missing runtime evidence or explicit gaps. |
| `check-doc-links.mjs` | Checks internal Markdown links across method docs. |
| `check-doc-inventory.mjs` | Checks script and documentation inventory coverage. |
| `check-sync-drift.mjs` | Checks configured file mirror drift. |
| `check-visual-evidence.mjs` | Reports UI/visual evidence gaps. |
| `check-adoption.mjs` | Checks generic method adoption entrypoints and task/evidence linkage. |
| `check-method-health.mjs` | Checks method-kit and repo-shell version and landing-file health. |
| `check-failure-registry.mjs` | Validates failure registry tables against the portable taxonomy. |
| `check-doc-frontmatter.mjs` | Validates governed Markdown frontmatter conventions. |
| `check-encoding.mjs` | Scans git-tracked text files for invalid UTF-8 byte sequences (mojibake corruption). |

## Common Commands

```powershell
node scripts/harness/check-task-packet.mjs --root .
node scripts/harness/check-evidence.mjs --strict --root .
node scripts/harness/check-review.mjs --strict --root .
node scripts/harness/check-failure-registry.mjs --strict --root .
node scripts/harness/check-method-health.mjs --strict --root .
node scripts/harness/check-adoption.mjs --strict --root .
node scripts/harness/check-doc-links.mjs --strict --root .
node scripts/harness/check-doc-inventory.mjs --strict --root .
node scripts/harness/check-sync-drift.mjs --strict --root .
node scripts/harness/check-encoding.mjs --strict --root .
node --test scripts/harness/*.test.mjs
```

All check scripts accept `--root <path>` so they can be run from fixture directories or downstream repositories. JSON-capable checks accept `--json`.

## Policy Links

- trivial / non-trivial classification: [`docs/harness/triviality-classification-policy.md`](../../docs/harness/triviality-classification-policy.md)
- visual evidence promotion: [`docs/harness/visual-evidence-promotion-policy.md`](../../docs/harness/visual-evidence-promotion-policy.md)
- failure registry promotion: [`docs/harness/failure-registry-promotion-policy.md`](../../docs/harness/failure-registry-promotion-policy.md)
- retirement review: [`docs/harness/harness-retirement-review.md`](../../docs/harness/harness-retirement-review.md)

## Boundary

Do not add application-specific scanners here. If a check assumes a particular stack, architecture, route layout, permission model, CI provider, or product repository, package it as an overlay and keep the portable method gate independent.
