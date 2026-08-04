# Agent Adapters

> Pointer layer for Pantheon Harness agent adapters

Since 2026-07-26 (HOT-005), the canonical adapter layer is [config/agents/adapters/](../config/agents/adapters/). The files under `.agents/adapters/` are pointers kept so adoption-check paths stay stable.

## Supported Adapters

| Adapter | Canonical |
|---------|-----------|
| [codex.md](./adapters/codex.md) | [config/agents/adapters/codex.md](../config/agents/adapters/codex.md) |
| [claude-code.md](./adapters/claude-code.md) | [config/agents/adapters/claude-code.md](../config/agents/adapters/claude-code.md) |
| [cursor.md](./adapters/cursor.md) | [config/agents/adapters/cursor.md](../config/agents/adapters/cursor.md) |
| [github-copilot.md](./adapters/github-copilot.md) | [config/agents/adapters/github-copilot.md](../config/agents/adapters/github-copilot.md) |
| [openhands.md](./adapters/openhands.md) | [config/agents/adapters/openhands.md](../config/agents/adapters/openhands.md) |
| [human.md](./adapters/human.md) | [config/agents/adapters/human.md](../config/agents/adapters/human.md) |

## Adapter Matrix

See [tool-adapter-matrix.md](../architecture/harness/tool-adapter-matrix.md) for the full adapter capability matrix.

## Related

- [agent-interface-contract.md](../architecture/harness/agent-interface-contract.md)
- [tool-adapters.md](../architecture/harness/tool-adapters.md)
