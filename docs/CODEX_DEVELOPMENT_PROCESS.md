# Codex Development Process Card

English companion for the Chinese canonical guide.

This document exists so the workflow can travel with the repository instead of living only in a personal Codex profile.

Core rule:

- identify the target repo
- classify the layer
- use a small task packet for non-trivial work
- use CodeGraph first for structural code retrieval when the repo has an index
- read the repo-local contract docs
- reuse existing skills and harness checks first
- require rendered evidence for UI work
- keep the final handoff explicit about evidence and gaps

Recommended default stack:

- `CodeGraph` for structural understanding and impact narrowing
- `OpenSpec` for requirements, constraints, and acceptance decisions
- `Superpowers` used by phase, not as one vague always-on mode
- `impeccable` as the UI quality gate only for UI work
- `gstack` mainly through `review`, `health`, `qa` / `qa-only`, and `ship`
- `Codex Security` through `security-diff-scan` for risky changes and `security-scan` for wider audits

Recommended additions, not always-on:

- `codebase-recon` for repo hotspots, churn, and ownership before entering unfamiliar areas
- `gh-fix-ci` for the gap between local green and GitHub Actions red

Do not expand the stack just to collect more skills. Prefer a small set with distinct responsibilities.

Minimum task packet:

- target repo
- layer
- task mode
- required reading
- implementation scope
- sync expectation
- verification
- stop points

Pantheon default:

- fix shared `platform` and `system/*` behavior in `pantheon-base` first
- keep `pantheon-ops` for `business/*` divergence only
- close code, tests, i18n, menus, permissions, docs, and evidence in the same turn when they are in scope

CodeGraph rule:

- Use `codegraph status`, `codegraph context`, `codegraph query`, `codegraph callers`, `codegraph callees`, and `codegraph impact` to narrow code context before opening files.
- Use `rg` for literal strings, logs, copy, comments, or after CodeGraph has already identified the specific file.

CodeGraph review rule:

- Use CodeGraph to describe the affected subgraph for `non-trivial` changes instead of trying to maintain a full-repo diagram.
- Summarize the smallest useful chain such as `entry -> core path -> exit/side effect`, especially for `platform`, `system/*`, permission, menu, i18n, audit, generator, dynamic-module, and runtime-sensitive work.
- Check for new cycles, accidental hub nodes, deeper critical call chains, and unvalidated input reaching sensitive actions.
- After the task packet carries `## Structural Scope`, use `node scripts/harness/scaffold-graph-review.mjs --write <task-id>` to seed `graphChecks` and `structuralReview`, then replace the scaffold note after the real review.
- Treat these checks as review inputs and warning thresholds, not context-free global KPIs.

Phase-oriented Superpowers usage:

- new feature or cross-module design: `brainstorming` -> `writing-plans`
- implementation: `test-driven-development`
- bug fixing: `systematic-debugging`
- before claiming completion: `verification-before-completion`
- before merge or after major work: `requesting-code-review`

Scenario flow:

- non-trivial feature: `CodeGraph` -> spec/contract -> plan -> implement -> verify -> review
- bug: root cause first -> regression test -> fix -> verify
- UI: `impeccable` -> rendered evidence -> QA/review
- PR/merge: local verify -> completion gate -> review gate -> security gate when risky
- CI red: reproduce locally first, then use `gh-fix-ci` if the failure only shows up in GitHub Actions
- risky security change: inspect `source -> sink -> side effect`, then run `security-diff-scan` before merge

Suggested gates:

- completion gate: `verification-before-completion`
- code review gate: `requesting-code-review` or `gstack-review`
- security gate: `security-diff-scan` for risky auth, permission, file, SQL, external I/O, or trust-boundary changes

Repo-local workflow skills are preferred over growing a personal global skill list:

- `repo-verify`
- `repo-pr-gate`
- `repo-ci-triage`

See the Chinese canonical guide for the full workflow:

- [CODEX_DEVELOPMENT_PROCESS.zh.md](./CODEX_DEVELOPMENT_PROCESS.zh.md)
