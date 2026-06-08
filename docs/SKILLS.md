# Skills Policy

Chinese version: [SKILLS.zh.md](./SKILLS.zh.md)

This repository keeps a project-local `.codex/skills` tree so the method can travel with the repository during migration.

## Default Source

The canonical skill source for a local developer is the user-level Codex skills directory:

- `C:\Users\xiaolong\.codex\skills`

## Recommended Sync Flow

When starting a new project or migrating this workspace to a new machine:

1. sync the user-level skills into the repository-local `.codex/skills`
2. commit the repository-local skills that are meant to travel with the project
3. let the project load its own local skills first

## Priority Rule

If a skill exists both in the user directory and in the project, the project-local copy wins for that repository session.

This prevents project migration from depending on manual skill installation.

## Maintenance Rule

Update the user-level skills when you want the change available across projects.
Update the repository-local skills when the project needs a pinned or customized copy.

## Codex Workflow Trigger

Use [CODEX_DEVELOPMENT_PROCESS.md](./CODEX_DEVELOPMENT_PROCESS.md) when the task is non-trivial and you need the default Pantheon flow for:

- repo selection
- layer classification
- UI visual gating
- smoke / evidence selection
- base -> ops inheritance sync
- low-code generation closure

Use `../.agents/skills/README.md` when you need to create or refresh repository-local workflow skills such as `repo-verify`, `repo-pr-gate`, `repo-ci-triage`, or `gh-fix-ci`.

If the task is trivial, keep using the repo-local contracts and the smallest relevant skill only.
