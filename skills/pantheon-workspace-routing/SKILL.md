---
name: pantheon-workspace-routing
description: Workspace-level routing for pantheon-base and sibling business repositories. Use when bootstrapping a new Pantheon business repo, deciding whether knowledge belongs in pantheon-base or a business repo, wiring inheritance files, or planning how derived projects should upgrade against pantheon-base.
---

# Pantheon Workspace Routing

Use this skill for cross-repository decisions inside the `pantheon-platform` workspace.

## Core Model

- `pantheon-base` is the only authority for foundation architecture, contracts, system-domain rules, shared UI rules, and acceptance gates.
- Each business repository keeps only:
  - `AGENTS.md`
  - `docs/PROJECT_INHERITANCE.md`
  - business-domain design and acceptance docs
- Shared skills and workspace mechanics live at `pantheon-platform/.codex/skills` and `pantheon-platform/docs`.

## Use This Skill To Decide

- whether a change belongs in `pantheon-base` or a business repository
- how to bootstrap a new `pantheon-xx` repository
- how to inherit base rules without copying base docs
- how to upgrade a business repository to a newer base version

## Required References

- Repository roles: `references/repository-map.md`
- Inheritance rules: `references/inheritance-rules.md`
- Upgrade path: `references/upgrade-checklist.md`

## Hard Rules

- Do not copy large base documents into business repositories.
- Do not let business repositories redefine platform or system-domain contracts.
- Do not let workspace docs become a second authority for base design details. Workspace docs explain inheritance and routing only.

## Tooling And Skill Routing

- Use `superpowers:brainstorming` when defining a new business repository shape or inheritance policy.
- Use `superpowers:writing-plans` for multi-step repo bootstrap or upgrade work.
- Use gstack `review` when validating larger cross-repository diffs before merge.
