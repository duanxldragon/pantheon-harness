# Agentic Method Kit

Portable method kit for:

- `OpenSpec`
- `superpowers`
- `impeccable`
- `gstack`
- repo-local Harness Engineering checks

This directory is designed to be copied into another repository as-is.

For repositories that use this method, pair it with:

- `agentic-repo-shell/`

Optional overlay:

- `pantheon-overlay/`

## What This Kit Gives You

- A method-level playbook that defines the default workflow
- A concept map from Claude Code best-practice ideas to Codex-usable patterns
- Standard task packet, evidence, review, and PR templates
- Portable schemas for task packets and verification evidence
- Portable schema and machine-readable convention for review artifacts
- Explicit method versioning and upgrade guidance
- Portable checks for:
  - task packet structure
  - evidence structure
  - review linkage structure
  - adoption and OpenSpec linkage
  - method health and upgrade drift

## Versioning

Current version:

- `1.0.0`

Version metadata:

- [VERSION](./VERSION)
- [METHOD_VERSION.json](./METHOD_VERSION.json)
- [CHANGELOG.md](./CHANGELOG.md)
- [UPGRADE.md](./UPGRADE.md)

## Environment Requirements

Minimum recommended environment:

- `git`
- `node` 20+
- a shell that can run the check scripts

Optional but recommended:

- an OpenSpec-capable workflow or CLI
- a browser QA path such as `gstack browse`, Playwright, or manual screenshots
- an agent environment that can follow repo contracts and run shell commands

This kit does not require any one editor, MCP server, or hosted agent runtime.

## Suggested Destination In Future Repos

Copy this whole directory into the target repository root:

```text
agentic-method-kit/
```

Then wire these paths in the target repo:

- `docs/harness/tasks/`
- `.harness/evidence/`
- `.github/pull_request_template.md`
- `openspec/changes/`

## Quick Start

1. Read [METHOD_PLAYBOOK.md](./METHOD_PLAYBOOK.md)
2. Read [CONCEPT_MAP.md](./CONCEPT_MAP.md)
3. Read [INSTALL.md](./INSTALL.md)
4. Copy the templates you need
5. Adjust [config/method.config.json](./config/method.config.json) if your repo uses different paths
6. Run the portable checks under [scripts/](./scripts/)

## Daily Use

For non-trivial work:

1. Create or select an OpenSpec change
2. Write or update a task packet
3. Implement the change
4. Save verification evidence
5. Save review output
6. Run the portable checks

For trivial work:

- you may skip OpenSpec and task packet creation if the repo contract explicitly allows it
- you should still record verification results and known gaps

## Skills And Tooling

No preinstalled repo-local skills are required to use this kit.

The method is designed so that:

- `docs/harness/*`
- templates
- schemas
- check scripts

remain the source of truth even if no skill runtime exists.

Optional skill ecosystems:

- `superpowers`: recommended for design, planning, execution discipline, and verification workflow
- `impeccable`: recommended for UI quality gating
- `gstack`: recommended for browser QA and visual evidence
- local Codex skills: optional repo-specific accelerators, not method prerequisites

## Machine-Readable Closure

For non-trivial work, the portable closed loop is:

- OpenSpec change
- task packet
- evidence `commands.json`
- review `review.md` with an embedded machine-readable JSON block

The JSON block inside `review.md` is the portable convention that closes the loop without introducing a second review artifact format.

## Core Principle

This kit is intentionally tool-agnostic at the method level:

- `OpenSpec` manages change identity and lifecycle
- `superpowers` manages design, planning, execution, and verification discipline
- `impeccable` is the UI quality gate
- `gstack` is the default browser evidence and QA path
- local scripts provide mechanical closure
