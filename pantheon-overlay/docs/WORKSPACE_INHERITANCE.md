# Pantheon Workspace Inheritance

This workspace contains one foundation repository and one or more derived business repositories.

## Repository Roles

- `pantheon-base`: the only authority for foundation architecture, system-domain contracts, shared frontend and backend rules, and shared acceptance standards
- `pantheon-ops`: a derived business repository that inherits `pantheon-base` and adds operations-domain business modules
- future `pantheon-xx`: derived business repositories that should follow the same inheritance model

## Where Knowledge Lives

### Lives In `pantheon-base`

- `AGENTS.md` and `DESIGN.md`
- contracts under `docs/contracts/`
- system and platform design rules under `docs/designs/`
- shared acceptance and review standards under `docs/acceptances/`

### Lives In A Business Repository

- local `AGENTS.md`
- `docs/PROJECT_INHERITANCE.md`
- business-domain design docs
- business-domain acceptance or audit docs when needed

### Lives In Workspace Root

- shared Codex skills under `.codex/skills/`
- inheritance templates
- base upgrade workflow

## Reading Order

### Base Work

1. `pantheon-base/DESIGN.md`
2. `pantheon-base/AGENTS.md`
3. `pantheon-base/docs/README.md`
4. matching base contracts, designs, and acceptance docs

### Business Repository Work

1. workspace `docs/WORKSPACE_INHERITANCE.md`
2. local repository `AGENTS.md`
3. local repository `docs/PROJECT_INHERITANCE.md`
4. `pantheon-base/DESIGN.md`
5. `pantheon-base/AGENTS.md`
6. matching base contracts, designs, and acceptance docs
7. local business design docs

## Non-Negotiables

- Do not duplicate large base documents into business repositories.
- Do not let business repositories redefine `platform` or `system/*` ownership.
- Change base rules in `pantheon-base`, then let business repositories upgrade to the new base version.
