# Agentic Method Workspace

Chinese version: [README.zh.md](./README.zh.md)

This repository is the standalone maintenance and distribution workspace for a reusable agentic development method.
Documentation index and bilingual policy live in [docs/README.md](./docs/README.md) and [docs/DOCUMENTATION_I18N_POLICY.md](./docs/DOCUMENTATION_I18N_POLICY.md).

It is intentionally product-agnostic. Pantheon is supported through an optional overlay, but the repository itself is meant to serve any team that wants a portable Harness Engineering workflow across Codex, Claude Code, Cursor, GitHub Copilot, OpenHands, or human-driven execution.

## What This Repository Publishes

The method is distributed in layers:

- `agentic-method-kit/`: method source of truth, schemas, templates, playbook, version metadata
- `agentic-repo-shell/`: copyable repo-local shell with adapters, CI entrypoints, and runtime skeleton
- `pantheon-overlay/`: optional Pantheon-specific inheritance and governance overlay
- `docs/harness/`: root-level reference contracts for the method
- `scripts/`: bootstrap and validation helpers
- `.codex/skills/`: project-local Codex skills that can travel with the repository

Additional boundary:

- repo-owned `.codex/skills/*` that are committed here are part of the method surface
- synced user-home skills are only an optional acceleration layer and are not included in the default release surface
- the default ignored synced sets currently include `.codex/skills/.system/`, `.codex/skills/gstack-*/`, `.codex/skills/impeccable/`, and `.codex/skills/ui-ux-pro-max/`

This root repository is the canonical maintenance workspace for those layers. A downstream business repository should usually copy only the publishable surfaces, not this entire repo.

## Recommended Reading Order

For Chinese-first reading, start here if you want to understand the method itself:

1. [agentic-method-kit/README.zh.md](./agentic-method-kit/README.zh.md)
2. [agentic-method-kit/HARNESS_CORE_MODEL.zh.md](./agentic-method-kit/HARNESS_CORE_MODEL.zh.md)
3. [agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md](./agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md)
4. [agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md](./agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md)
5. [agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md](./agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md)
6. [agentic-method-kit/METHOD_PLAYBOOK.zh.md](./agentic-method-kit/METHOD_PLAYBOOK.zh.md)
7. [docs/harness/HARNESS_ENGINEERING_CONTRACT.md](./docs/harness/HARNESS_ENGINEERING_CONTRACT.md)
8. [docs/harness/AGENT_INTERFACE_CONTRACT.md](./docs/harness/AGENT_INTERFACE_CONTRACT.md)
9. [docs/harness/TASK_PACKET_SPEC.md](./docs/harness/TASK_PACKET_SPEC.md)
10. [docs/harness/VERIFICATION_EVIDENCE_SPEC.md](./docs/harness/VERIFICATION_EVIDENCE_SPEC.md)
11. [docs/harness/REVIEW_LOOP_SPEC.md](./docs/harness/REVIEW_LOOP_SPEC.md)
12. [docs/harness/DOCUMENT_FRONTMATTER_SPEC.md](./docs/harness/DOCUMENT_FRONTMATTER_SPEC.md)
13. [.agents/README.md](./.agents/README.md)

Then continue with repository distribution and release mechanics:

1. [DISTRIBUTION.zh.md](./DISTRIBUTION.zh.md)
2. [RELEASE.zh.md](./RELEASE.zh.md)
3. [MIGRATION_TO_STANDALONE_REPO.zh.md](./MIGRATION_TO_STANDALONE_REPO.zh.md)
4. [STANDALONE_REPO_BOOTSTRAP_CHECKLIST.zh.md](./STANDALONE_REPO_BOOTSTRAP_CHECKLIST.zh.md)
5. [PANTHEON_CONSUMER_SYNC_POLICY.zh.md](./PANTHEON_CONSUMER_SYNC_POLICY.zh.md)
6. [docs/SKILLS.zh.md](./docs/SKILLS.zh.md)

## How To Use It In A New Project

For a normal repository bootstrap, the recommended copy set is:

1. `agentic-method-kit/`
2. `agentic-repo-shell/`
3. optional `pantheon-overlay/`

Use the root workspace directly only when you are maintaining or releasing the method itself.

## Environment

Minimum environment:

- `git`
- `node` 20+
- PowerShell for the provided bootstrap scripts

Optional but recommended:

- Codex, Claude Code, Cursor, or another agent runtime

No specific skill bundle is required to adopt the method. Skills are execution accelerators; the actual source of truth remains the repository contracts, templates, and checks.
If you want project migration to avoid re-installing skills on a new machine, keep the required project skills in `.codex/skills/` and refresh them with `scripts/sync-codex-skills.ps1`.
Synced user-local skills should still be treated as workstation assets by default, not as release artifacts.

## Validation And Release

Core release checks:

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-doc-frontmatter.mjs --report-legacy
node --test agentic-repo-shell/scripts/harness/*.test.mjs
node --test pantheon-overlay/scripts/harness/*.test.mjs
```

Release metadata currently starts at version `1.0.0`:

- [agentic-method-kit/METHOD_VERSION.json](./agentic-method-kit/METHOD_VERSION.json)
- [SHELL_VERSION.json](./SHELL_VERSION.json)
- [WORKSPACE_MANIFEST.json](./WORKSPACE_MANIFEST.json)

## Boundaries

What belongs here:

- method contracts
- schemas and templates
- tool adapters
- bootstrap scripts
- release and migration guides

What does not belong here:

- application business code
- foundation product code
- large project-specific archives
- active runtime evidence from consumer repositories
