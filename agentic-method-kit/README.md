# Agentic Method Kit

Chinese version: [README.zh.md](./README.zh.md)

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

- A tool-agnostic harness core model that separates guides, sensors, state, gates, templates, and adapters
- A harness coverage model for evaluating whether controls catch meaningful failures
- A harness template taxonomy for common repository topologies
- A tool adapter matrix that keeps concrete skills and CLIs usable without making them prerequisites
- A method-level playbook that defines the default workflow
- A concept map from agent-tool best-practice ideas to portable harness patterns
- Standard task packet, evidence, review, and PR templates
- Portable schemas for task packets and verification evidence
- Portable schema and machine-readable convention for review artifacts
- Portable schema for failure registry entries
- Portable document frontmatter schema and README/contract linkage convention
- Explicit method versioning and upgrade guidance
- Portable checks for:
  - task packet structure
  - evidence structure
  - review linkage structure
  - adoption and OpenSpec linkage
  - document governance frontmatter and linkage drift
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

1. Read [README.zh.md](./README.zh.md) if your team prefers Chinese-first onboarding
2. Read [HARNESS_CORE_MODEL.zh.md](./HARNESS_CORE_MODEL.zh.md)
3. Read [HARNESS_COVERAGE_MODEL.zh.md](./HARNESS_COVERAGE_MODEL.zh.md)
4. Read [HARNESS_TEMPLATE_TAXONOMY.zh.md](./HARNESS_TEMPLATE_TAXONOMY.zh.md)
5. Read [TOOL_ADAPTER_MATRIX.zh.md](./TOOL_ADAPTER_MATRIX.zh.md)
6. Read [METHOD_PLAYBOOK.zh.md](./METHOD_PLAYBOOK.zh.md)
7. Read [INSTALL.zh.md](./INSTALL.zh.md)
8. Read [CONCEPT_MAP.md](./CONCEPT_MAP.md)
9. Review [UPGRADE.zh.md](./UPGRADE.zh.md) when you need version rollout context
10. Copy the templates you need
11. Adjust [config/method.config.json](./config/method.config.json) if your repo uses different paths
12. Run the portable checks under [scripts/](./scripts/)

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
- governed docs with YAML frontmatter and explicit contract linkage when the repository uses doc governance

The JSON block inside `review.md` closes the delivery loop.
The document frontmatter convention closes the repository governance loop for contracts, designs, assessments, remediations, acceptances, retained specs, and retained archive docs.

## Core Principle

This kit is intentionally tool-agnostic at the method level:

- change-management tools manage change identity and lifecycle
- planning and execution tools manage design, implementation discipline, and verification workflow
- UI quality gates evaluate visual, interaction, accessibility, and state quality
- browser or runtime inspection tools provide behaviour evidence
- local scripts provide mechanical closure

Specific tools may be recommended by a repository, but no single tool defines the method.
