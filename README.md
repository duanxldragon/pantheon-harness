# Agentic Method Distribution Workspace

This repository is the maintenance and distribution workspace for the reusable agentic method stack.

Pantheon is an optional overlay and a reference consumer, but this repository is not tied to any one product family. It exists to assemble, validate, version, and publish the reusable method layers.

It does not own the foundation code or business code directly. Instead, it provides:

- tool-agnostic Harness Engineering protocol under `docs/harness/`
- shared agent adapters under `.agents/`
- distribution-workspace bootstrap and migration documents
- portable method source under `agentic-method-kit/`
- copyable repo shell under `agentic-repo-shell/`
- optional Pantheon-specific overlay under `pantheon-overlay/`

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

- any repository that wants a portable Harness Engineering method stack
- `pantheon-base`: foundation repository for platform and `system/*` capabilities
- `pantheon-ops`: derived business repository for operations-domain modules
- future `pantheon-xx`: additional derived business repositories that inherit `pantheon-base`

## What Lives Here

- workspace inheritance rules
- project inheritance template
- base upgrade workflow
- tool-agnostic Harness Engineering contracts
- shared agent adapter documentation
- distribution release and migration guides
- optional minimal archive metadata under `archive/`

## What Does Not Live Here

- copied base contracts or base design documents
- copied business design documents
- direct platform or business implementation code
- active delivery task packets or runtime evidence for the distributable starter packages

## Reading Order

For tool-agnostic Harness Engineering, start with:

1. `agentic-method-kit/README.md`
2. `agentic-method-kit/METHOD_PLAYBOOK.md`
3. `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
4. `docs/harness/AGENT_INTERFACE_CONTRACT.md`
5. `docs/harness/TASK_PACKET_SPEC.md`
6. `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
7. `docs/harness/REVIEW_LOOP_SPEC.md`
8. `.agents/README.md`

If you only want the reusable method package rather than the full distribution workspace, start with:

1. `agentic-method-kit/README.md`
2. `agentic-repo-shell/README.md`
3. `pantheon-overlay/README.md` when applicable

For distribution and migration mechanics, continue with:

1. `DISTRIBUTION.md`
2. `RELEASE.md`
3. `MIGRATION_TO_STANDALONE_REPO.md`
4. `STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md`

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
- `scripts/scaffold-standalone-method-repo.ps1`

The current workspace also publishes repo-shell compatibility metadata in:

- `SHELL_VERSION.json`

## Harness Engineering Model

This workspace treats Codex, Claude Code, Cursor, GitHub Copilot, OpenHands, Aider, and human engineers as execution adapters over the same repository protocol.

The source of truth is layered:

- `agentic-method-kit/*` is the portable method source of truth
- `docs/harness/*` is the current workspace's repo-local contract and landing layer
- `.agents/adapters/*` provides tool-specific mappings
- repository-local `AGENTS.md` / `CLAUDE.md` provides project-specific behavior

No critical architecture, permission, i18n, audit, review, or inheritance rule should exist only inside one tool's private prompt or adapter.

## Archive

`archive/` is optional and should remain small in the public distribution repository.

If historical rollout material is kept at all, it should stay clearly separated from the publishable copy set.
