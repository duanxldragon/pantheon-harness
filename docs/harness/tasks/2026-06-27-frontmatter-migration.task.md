# Task Packet: frontmatter-migration

## Goal

Migrate the remaining `architecture/harness` governance documents from legacy inline metadata lines to the YAML frontmatter format enforced by `check-doc-frontmatter`.

## Primary Layer

method

## Dependency Layers

- platform

## Harness Profile

- Template: docs-governance
- Overlay: none
- Coverage Dimensions:
  - maintainability
  - method-health

## Contract Anchors

- `architecture/harness/document-frontmatter-spec.md`
- `architecture/harness/harness-engineering-contract.md`
- `architecture/harness/task-packet-spec.md`
- `architecture/harness/verification-evidence-spec.md`
- `architecture/harness/review-loop-spec.md`

## Scope

### In

- Add YAML frontmatter to the 30 `architecture/harness/*.md` files currently reported by `check-doc-frontmatter`.
- Preserve each document body and existing language pair links.
- Remove only legacy governance metadata lines already represented in frontmatter.
- Record evidence and review for this standalone migration.

### Out

- Product code changes in sibling repositories.
- New document taxonomy fields beyond the current checker contract.
- New dependencies or checker behavior changes.

## Expected Files

### Create

- `docs/harness/tasks/2026-06-27-frontmatter-migration.task.md`
- `.harness/evidence/2026-06-27-frontmatter-migration/commands.json`
- `.harness/evidence/2026-06-27-frontmatter-migration/review.md`

### Modify

- `architecture/harness/*.md`

### Do Not Touch

- `../pantheon-base/**`
- `../pantheon-ops/**`
- `../pantheon-workbench/**`

## Implementation Notes

- Convert `Type` or `类型` to `doc_type`.
- Convert `Layer` or `归属层` to `layer`.
- Convert `Status` or `状态` to `status`.
- Use `updated_at: 2026-06-27`.
- Add `linked_contracts` for document types that require it under the current frontmatter checker.

## Structural Scope

- Affected Subgraph: `architecture/harness docs -> frontmatter checker -> doc inventory -> evidence/review gates`
- Boundary Crossings: none
- Risk Nodes: document metadata, contract linkage, language-pair docs
- Graph Focus: none

## Verification Plan

- `node scripts/harness/check-doc-frontmatter.mjs --root . --strict`
- `node scripts/harness/check-doc-links.mjs --root . --strict`
- `node scripts/harness/check-doc-inventory.mjs --root . --strict`
- `node scripts/harness/check-task-packet.mjs --root .`
- `node scripts/harness/check-evidence.mjs --root . --strict`
- `node scripts/harness/check-review.mjs --root . --strict`
- `node --test scripts/harness/*.test.mjs`

## Linkage

- Task ID: 2026-06-27-frontmatter-migration
- OpenSpec Change: none
- Plan References: none
- Evidence Directory: .harness/evidence/2026-06-27-frontmatter-migration/
- Review File: .harness/evidence/2026-06-27-frontmatter-migration/review.md

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
