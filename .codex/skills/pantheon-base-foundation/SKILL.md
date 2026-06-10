---
name: pantheon-base-foundation
description: Pantheon foundation rules for pantheon-base and derived business repositories. Use when working on Pantheon projects to determine layer ownership, document reading order, architecture boundaries, tech stack, review gates, and when to route through the workspace workflow contract or gstack workflows.
---

# Pantheon Base Foundation

Use this skill as the foundation entrypoint for any Pantheon repository.

## Workflow

1. Identify whether the current repository is `pantheon-base` or a derived business repository such as `pantheon-ops`.
2. If working in a derived repository, read [docs/WORKSPACE_INHERITANCE.md](../../../docs/WORKSPACE_INHERITANCE.md) first, then the repository-local `docs/PROJECT_INHERITANCE.md`, then load the required `pantheon-base` documents.
3. Classify the task into exactly one primary layer before designing, editing, reviewing, or debugging:
   - `platform`
   - `system/auth`
   - `system/iam`
   - `system/org`
   - `system/config`
   - `business/*`
4. If the task crosses layers, state the primary layer, dependency layers, and whether the split is logical or physical before making changes.
5. Load only the references needed for the current task.

## Required References

- Reading order and inheritance flow: `references/reading-order.md`
- Shared tech stack: `references/tech-stack.md`
- Architecture and ownership boundaries: `references/architecture-boundaries.md`
- Backend implementation rules: `references/backend-rules.md`
- Frontend implementation rules: `references/frontend-rules.md`
- Review, acceptance, and verification gates: `references/review-and-acceptance.md`

## Hard Rules

- Treat `pantheon-base` as the only authority for platform and system-domain rules.
- Do not duplicate or silently rewrite base contracts in business repositories.
- Keep business repositories focused on `business/*` design, code, and acceptance additions.
- Keep menu metadata, permissions, i18n, audit, and schema concerns in the validation loop for every relevant change.

## Workflow Routing

- Use [Pantheon Workflow Routing](../../../../docs/WORKFLOW_ROUTING.md) as the source of truth for lane selection, gates, and fallback behavior.
- Follow the lane selected by that contract; do not hard-code legacy Superpowers routing here.
- Keep `impeccable` as the UI visual quality gate.
- Use `codex-flow` for resumable fan-out or independent branches when the routing contract recommends it.
- For browser flows, screenshots, UI regressions, permission interaction checks, and smoke evidence, prefer gstack `browse`.
- For test-and-fix QA loops, prefer gstack `qa`.
- For report-only QA, prefer gstack `qa-only`.
- For pre-merge diff review, prefer gstack `review`.

## Output Expectations

- Explain problems and changes using `platform / 系统域 / 业务域` language.
- Call out root-cause mismatches with the documented design instead of patching around them.
- When a change affects contracts, interfaces, schema, menus, permissions, i18n, or acceptance criteria, update the relevant documents.
