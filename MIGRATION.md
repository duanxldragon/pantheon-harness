# Migration Guide: harness-engineering → pantheon-harness

## Overview

This guide documents the structural changes made when migrating from `harness-engineering` to `pantheon-harness`.

## Directory Mapping

| Old Path | New Path |
|----------|----------|
| `docs/harness/` | `architecture/harness/` |
| `docs/methodology/` | `architecture/methodology/` |
| `.agents/` | `config/agents/` |
| `.codex/skills/` | `skills/` |
| `agentic-method-kit/*.md` | `patterns/` |
| `agentic-method-kit/templates/` | `patterns/templates/` |
| `agentic-method-kit/schemas/` | `verify/schemas/` |
| `agentic-method-kit/scripts/` | `verify/scripts/` |
| `openspec/` | `tools/openspec/` |
| `scripts/harness/` | `scripts/` |

## New Directories

| Directory | Purpose |
|-----------|---------|
| `workflows/` | Dynamic workflow patterns |
| `evaluations/` | Evaluation materials |
| `memory/` | Project memory |
| `research/` | Research findings |
| `examples/pantheon-base/` | Pantheon Base reference |

## Benefits

1. **Semantic clarity** — Directory names reflect purpose
2. **Scalability** — Room for new patterns, workflows, research
3. **Pantheon alignment** — Naming consistent with pantheon-base/pantheon-ops
4. **Separation of concerns** — Tools (openspec) separate from method

## Compatibility

Old paths are deprecated. Update references to use new paths.

Migration commands for documentation updates:
- `harness-engineering/docs/harness/` → `pantheon-harness/architecture/harness/`
- `harness-engineering/docs/methodology/` → `pantheon-harness/architecture/methodology/`
- `harness-engineering/agentic-method-kit/` → `pantheon-harness/patterns/`
