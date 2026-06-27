# Task Packet: migration-hardening

## Goal

Make `pantheon-harness` internally consistent after the `harness-engineering` rename so its method health, adoption, documentation, and test gates validate the current layout.

## Primary Layer

method

## Dependency Layers

- none

## Harness Profile

- Template: custom
- Overlay: none
- Coverage Dimensions:
  - maintainability
  - method-health

## Contract Anchors

- `patterns/README.md`
- `patterns/harness-core-model.md`
- `architecture/harness/task-packet-spec.md`
- `architecture/harness/verification-evidence-spec.md`
- `architecture/harness/review-loop-spec.md`

## Scope

### In

- Align method source references on `patterns/`.
- Align repo-shell projections and checkers on current lower-case file names.
- Update version metadata to `1.3.0`.
- Update bootstrap, docs inventory, adoption, method-health, template-health, and frontmatter gates.
- Record verification evidence and review for this task.

### Out

- Product code changes in `pantheon-base` or `pantheon-ops`.
- New dependencies.
- Runtime or UI behavior changes.

## Expected Files

### Create

- `docs/harness/tasks/2026-06-27-migration-hardening.task.md`
- `.harness/evidence/2026-06-27-migration-hardening/commands.json`
- `.harness/evidence/2026-06-27-migration-hardening/review.md`

### Modify

- `AGENTS.md`
- `SHELL_VERSION.json`
- `config/method.config.json`
- `patterns/METHOD_VERSION.json`
- `patterns/*.md`
- `architecture/harness/*.md`
- `scripts/harness/*.mjs`
- `scripts/harness/*.test.mjs`

### Do Not Touch

- `../pantheon-base/**`
- `../pantheon-ops/**`
- `../pantheon-workbench/**`

## Implementation Notes

- Preserve the current split: `patterns/` is the canonical portable method source; `architecture/harness/` and `docs/harness/` are projections/landing files.
- Prefer updating checkers and tests to the current layout instead of reintroducing old directories.

## Structural Scope

- Affected Subgraph: `method docs -> checker constants -> fixture tests -> strict gates -> evidence/review`
- Boundary Crossings: none
- Risk Nodes: method-health gate, adoption gate, bootstrap generator, documentation links
- Graph Focus: none

## Visual Evidence Scope

- Applicability: not applicable
- Reason: method documentation and checker migration only; no user-facing UI, desktop/mobile viewport, or empty/loading/error/permission UI state changed.

## Verification Plan

- `node --test scripts/harness/*.test.mjs`
- `node scripts/harness/check-method-health.mjs --root . --strict`
- `node scripts/harness/check-adoption.mjs --root . --strict`
- `node scripts/harness/check-doc-links.mjs --root . --strict`
- `node scripts/harness/check-doc-inventory.mjs --root . --strict`
- `node scripts/harness/check-template-health.mjs --root . --strict`
- `node scripts/harness/check-task-packet.mjs --root .`
- `node scripts/harness/check-evidence.mjs --root . --strict`
- `node scripts/harness/check-review.mjs --root . --strict`

## Linkage

- Task ID: 2026-06-27-migration-hardening
- OpenSpec Change: none
- Plan References: none
- Evidence Directory: .harness/evidence/2026-06-27-migration-hardening/
- Review File: .harness/evidence/2026-06-27-migration-hardening/review.md

## Evidence Required

- command result summary
- review summary
- known gaps if any strict gate cannot be run

## Human Gates

- none

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed
