# Agentic Method Distribution Workspace

This repository is the maintenance and distribution workspace for the reusable agentic method stack.

Pantheon is the primary in-repo reference implementation and overlay consumer, but the root workspace now exists first to assemble, validate, version, and publish the reusable method layers.

It does not own the foundation code or business code directly. Instead, it provides:

- tool-agnostic Harness Engineering protocol under `docs/harness/`
- shared agent adapters under `.agents/`
- shared Codex adapter skills under `.codex/skills/`
- workspace inheritance and bootstrap documents under `docs/`
- portable method source under `agentic-method-kit/`
- copyable repo shell under `agentic-repo-shell/`
- optional Pantheon-specific overlay under `pantheon-overlay/`
- submodule pointers to the real project repositories

## Distribution Surfaces

If the goal is to copy the method into another repository, the primary distributable surfaces are:

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `pantheon-overlay/` when Pantheon inheritance governance is needed
- `scripts/bootstrap-agentic-repo.ps1` when bootstrapping from this workspace directly

The root workspace is not the primary copy target. It is the maintenance workspace that assembles, tests, versions, and documents those distributable layers.

Start with:

- [DISTRIBUTION.md](./DISTRIBUTION.md)
- [RELEASE.md](./RELEASE.md)
- [MIGRATION_TO_STANDALONE_REPO.md](./MIGRATION_TO_STANDALONE_REPO.md)
- [STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md](./STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md)
- [PANTHEON_CONSUMER_SYNC_POLICY.md](./PANTHEON_CONSUMER_SYNC_POLICY.md)
- [WORKSPACE_MANIFEST.json](./WORKSPACE_MANIFEST.json)

## Reference Consumers

- `pantheon-base`: foundation repository for platform and `system/*` capabilities
- `pantheon-ops`: derived business repository for operations-domain modules
- future `pantheon-xx`: additional derived business repositories that inherit `pantheon-base`

## What Lives Here

- workspace inheritance rules
- project inheritance template
- base upgrade workflow
- tool-agnostic Harness Engineering contracts
- shared agent adapter documentation
- Codex-specific routing and execution skills
- archive of historical rollout artifacts under `archive/`

## What Does Not Live Here

- copied base contracts or base design documents
- copied business design documents
- direct platform or business implementation code
- active delivery task packets or runtime evidence for the distributable starter packages

## Git Model

This workspace repository tracks child repositories as submodules.

Current submodules:

- `pantheon-base`
- `pantheon-ops`

The current `.gitmodules` file points to the canonical GitHub repositories for `pantheon-base` and `pantheon-ops`.

## Reading Order

For tool-agnostic Harness Engineering, start with:

1. `docs/WORKSPACE_INHERITANCE.md`
2. `agentic-method-kit/README.md`
3. `agentic-method-kit/METHOD_PLAYBOOK.md`
4. `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
5. `docs/harness/AGENT_INTERFACE_CONTRACT.md`
6. `docs/harness/TASK_PACKET_SPEC.md`
7. `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
8. `docs/harness/REVIEW_LOOP_SPEC.md`
9. `docs/harness/INHERITANCE_HARNESS_PROTOCOL.md`
10. `.agents/README.md`

If you only want the reusable method package rather than the full Pantheon workspace, start with:

1. `agentic-method-kit/README.md`
2. `agentic-repo-shell/README.md`
3. `pantheon-overlay/README.md` when applicable

For workspace and inheritance mechanics, continue with:

1. `docs/PROJECT_INHERITANCE_TEMPLATE.md`
2. `docs/BASE_UPGRADE_WORKFLOW.md`
3. `.codex/skills/pantheon-base-foundation/SKILL.md`
4. `.codex/skills/pantheon-workspace-routing/SKILL.md`

## New Project Bootstrap

For a new repository, the recommended starting bundle is:

1. `agentic-method-kit/`
2. `agentic-repo-shell/`
3. optional `pantheon-overlay/`
4. optional `pantheon-base/`

`agentic-method-kit/` is the method source of truth.
`agentic-repo-shell/` is the repo-local shell you copy into the new repository root.
`pantheon-overlay/` is only for repositories that use Pantheon base/business inheritance.

Minimum environment for that new repository:

- `git`
- `node` 20+

You do not need to preinstall a special skill pack to use the method.
Skills are optional accelerators; contracts, templates, and check scripts are the actual source of truth.

The current bootstrap helper is:

- `scripts/bootstrap-agentic-repo.ps1`

The current workspace also publishes repo-shell compatibility metadata in:

- `SHELL_VERSION.json`

## Harness Engineering Model

Pantheon treats Codex, Claude Code, Cursor, GitHub Copilot, OpenHands, Aider, and human engineers as execution adapters over the same repository protocol.

The source of truth is layered:

- `agentic-method-kit/*` is the portable method source of truth
- `docs/harness/*` is the current workspace's repo-local contract and landing layer
- `.agents/adapters/*` provides tool-specific mappings
- repository-local `AGENTS.md` / `CLAUDE.md` provides project-specific behavior
- `.codex/skills/*` is only for Codex-specific helper workflows

No critical architecture, permission, i18n, audit, review, or inheritance rule should exist only inside one tool's private prompt or adapter.

## Archive

Historical rollout task packets, evidence, and process documents that are no longer part of the current publishable surface are stored under:

- `archive/workspace-history/`

That archive is retained for traceability, not as part of the recommended copy set for new repositories.
