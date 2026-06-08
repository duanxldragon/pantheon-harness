# Codex Development Checklist

English companion for the shortest workshop-friendly entry.

This checklist is not the full workflow. It is the fast preflight gate for new projects and short-lived task briefs.

## Before starting

- [ ] I identified the target repo: `pantheon-base`, `pantheon-ops`, or `harness-engineering`
- [ ] I classified the task layer: `platform`, `system/*`, or `business/*`
- [ ] I read the repo-local `AGENTS.md` / `CLAUDE.md`
- [ ] I read the relevant design / contract / acceptance docs
- [ ] If CodeGraph is enabled for the repo, I used graph retrieval to narrow code context before opening files

## During the task

- [ ] I reused existing skills, harness checks, scripts, or tests first
- [ ] For structural questions, I prefer `codegraph context/query/callers/callees/impact`; for literal strings, logs, and copy, I use `rg`
- [ ] If this is a new feature or cross-module change, I planned it before implementation
- [ ] If this is a UI task, I applied `impeccable`
- [ ] If this is a bug, I did root-cause work before guessing a fix
- [ ] If this crosses layers, I stated the boundary and dependencies
- [ ] If this is generation, deletion, inheritance sync, or another high-risk task, I confirmed the verification matrix

## Before finishing

- [ ] I ran verification that matches the change surface
- [ ] I used fresh command output to support any completion claim, following `verification-before-completion`
- [ ] If this is a major change or merge candidate, I ran a review gate: `requesting-code-review` or `gstack-review`
- [ ] If this touches auth, permissions, files, SQL, templates, external I/O, or another risky boundary, I added a security gate with `security-diff-scan`
- [ ] If the problem only appears in GitHub Actions, I tried local reproduction before escalating to `gh-fix-ci`
- [ ] I recorded evidence, known gaps, and unverified items
- [ ] If menus, permissions, i18n, schema, routing, docs, or inheritance changed, I synced the related docs

## When to escalate

- For non-trivial tasks, switch to the full workflow card:
  - [Codex Development Process Card](./CODEX_DEVELOPMENT_PROCESS.md)
