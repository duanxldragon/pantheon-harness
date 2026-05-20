# Documentation Index

Chinese version: [README.zh.md](./README.zh.md)

This directory provides the documentation entry points, reading order, and bilingual maintenance rules for `harness-engineering`.

## Recommended Language Strategy

Use separate Chinese and English files with cross-links instead of placing Chinese at the top and English at the bottom of the same document.

Why:

- Chinese-speaking developers can read `*.zh.md` directly
- English files keep stable external links for broader collaboration
- diffs, reviews, validation, and future translation are easier to maintain
- mixed-language single files make anchors, search, and version comparisons harder to manage

See: [DOCUMENTATION_I18N_POLICY.md](./DOCUMENTATION_I18N_POLICY.md)

Additional convention:

- for legacy documents that already exist as stable Chinese-first `.md` files, keep the original `.md` path
- add English companions as `*.en.md`
- `docs/harness/*.md` currently follow this rule

## Document Groups

### 1. Workspace Root Guides

- [../README.zh.md](../README.zh.md)
- [../README.md](../README.md)
- [../DISTRIBUTION.zh.md](../DISTRIBUTION.zh.md)
- [../RELEASE.zh.md](../RELEASE.zh.md)
- [../MIGRATION_TO_STANDALONE_REPO.zh.md](../MIGRATION_TO_STANDALONE_REPO.zh.md)
- [../STANDALONE_REPO_BOOTSTRAP_CHECKLIST.zh.md](../STANDALONE_REPO_BOOTSTRAP_CHECKLIST.zh.md)
- [../PANTHEON_CONSUMER_SYNC_POLICY.zh.md](../PANTHEON_CONSUMER_SYNC_POLICY.zh.md)

### 2. Harness Root Contracts

Directory: [`./harness/`](./harness/)

- `HARNESS_ENGINEERING_CONTRACT.md`
- `AGENT_INTERFACE_CONTRACT.md`
- `TASK_PACKET_SPEC.md`
- `VERIFICATION_EVIDENCE_SPEC.md`
- `REVIEW_LOOP_SPEC.md`
- `DOCUMENT_FRONTMATTER_SPEC.md`
- `TOOL_ADAPTERS.md`
- `VISUAL_QUALITY_PROTOCOL.md`
- `INHERITANCE_HARNESS_PROTOCOL.md`
- `HARNESS_METHOD_PLAYBOOK.md`
- `failure-registry.md`
- `HARNESS_OPEN_TASKS.md`

Note:
- most of these are already Chinese-first documents with stable existing paths
- to preserve link stability, keep the Chinese primary files as `*.md` and add English companions as `*.en.md`
- if a future migration to English-primary paths is needed, treat that as a separate cutover

### 3. Method Kit

Directory: [`../agentic-method-kit/`](../agentic-method-kit/)

Suggested reading order:

1. [../agentic-method-kit/README.zh.md](../agentic-method-kit/README.zh.md)
2. [../agentic-method-kit/HARNESS_CORE_MODEL.zh.md](../agentic-method-kit/HARNESS_CORE_MODEL.zh.md)
3. [../agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md](../agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md)
4. [../agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md](../agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md)
5. [../agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md](../agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md)
6. [../agentic-method-kit/METHOD_PLAYBOOK.zh.md](../agentic-method-kit/METHOD_PLAYBOOK.zh.md)
7. [../agentic-method-kit/INSTALL.zh.md](../agentic-method-kit/INSTALL.zh.md)
8. [../agentic-method-kit/UPGRADE.zh.md](../agentic-method-kit/UPGRADE.zh.md)
9. [../agentic-method-kit/MIGRATION.md](../agentic-method-kit/MIGRATION.md)
10. [../agentic-method-kit/CONCEPT_MAP.md](../agentic-method-kit/CONCEPT_MAP.md)
11. [../agentic-method-kit/CHANGELOG.md](../agentic-method-kit/CHANGELOG.md)

### 4. Repo Shell

Directory: [`../agentic-repo-shell/`](../agentic-repo-shell/)

- [../agentic-repo-shell/README.md](../agentic-repo-shell/README.md)
- [../agentic-repo-shell/README.zh.md](../agentic-repo-shell/README.zh.md)
- [../agentic-repo-shell/.agents/README.md](../agentic-repo-shell/.agents/README.md)
- [../agentic-repo-shell/docs/harness/tasks/README.md](../agentic-repo-shell/docs/harness/tasks/README.md)
- [../agentic-repo-shell/openspec/README.md](../agentic-repo-shell/openspec/README.md)
- [../agentic-repo-shell/scripts/harness/README.zh.md](../agentic-repo-shell/scripts/harness/README.zh.md)
- [../agentic-repo-shell/scripts/harness/README.md](../agentic-repo-shell/scripts/harness/README.md)

### 5. Pantheon Overlay

Directory: [`../pantheon-overlay/`](../pantheon-overlay/)

- [../pantheon-overlay/README.md](../pantheon-overlay/README.md)
- [../pantheon-overlay/README.zh.md](../pantheon-overlay/README.zh.md)
- [../pantheon-overlay/docs/WORKSPACE_INHERITANCE.zh.md](../pantheon-overlay/docs/WORKSPACE_INHERITANCE.zh.md)
- [../pantheon-overlay/docs/PROJECT_INHERITANCE_TEMPLATE.zh.md](../pantheon-overlay/docs/PROJECT_INHERITANCE_TEMPLATE.zh.md)
- [../pantheon-overlay/docs/BASE_UPGRADE_WORKFLOW.zh.md](../pantheon-overlay/docs/BASE_UPGRADE_WORKFLOW.zh.md)
- [../pantheon-overlay/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md](../pantheon-overlay/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md)

### 6. Agent and Prompt Assets

- [../.agents/README.md](../.agents/README.md)
- [../.agents/adapters/](../.agents/adapters/)
- [../.agents/prompts/](../.agents/prompts/)

### 7. Skills and Tooling

- [./SKILLS.md](./SKILLS.md)
- [./SKILLS.zh.md](./SKILLS.zh.md)
- [../.codex/skills/](../.codex/skills/)

## Suggested Rollout

1. Keep all existing English file paths stable
2. Add `*.zh.md` for high-frequency entry documents
3. Add reciprocal language links at the top of both files
4. Add a Chinese guide or bilingual index per major directory
5. Add full English companion files only for documents that need external publication

## First Translation Priority

- `agentic-method-kit/README.md`
- `agentic-method-kit/HARNESS_CORE_MODEL.md`
- `agentic-method-kit/HARNESS_COVERAGE_MODEL.md`
- `agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.md`
- `agentic-method-kit/TOOL_ADAPTER_MATRIX.md`
- `agentic-method-kit/METHOD_PLAYBOOK.md`
- `agentic-method-kit/INSTALL.md`
- `agentic-method-kit/UPGRADE.md`
- `agentic-repo-shell/README.md`
- `pantheon-overlay/README.md`
- `docs/SKILLS.md`
