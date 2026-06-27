# Method Patterns

Core method patterns and templates for agentic delivery.

Chinese version: [README.zh.md](./README.zh.md)

Portable method kit for repositories that want a repeatable Harness Engineering workflow.

Copy this directory into another repository when you want explicit delivery controls for non-trivial agent or human-assisted work.

## What This Directory Contains

- Core method models (`harness-core-model.*`)
- Method playbooks (`method-playbook.*`)
- Context engineering protocol
- Execution guardrails
- Template taxonomy
- Tool adapter matrix
- Templates (`templates/`)
- Configuration (`config/`)

## Usage Modes

### Standalone Mode

Copy `pantheon-harness/` into your repository root. The method works independently.

### Workspace Mode

Place `pantheon-harness/` as a sibling at workspace root. Consumer repos reference it from `../pantheon-harness/`.

## Quick Start

1. Read [README.zh.md](./README.zh.md) if your team is Chinese-first
2. Read [harness-core-model.zh.md](./harness-core-model.zh.md)
3. Read [execution-guardrails.md](./execution-guardrails.md)
4. Read [method-playbook.zh.md](./method-playbook.zh.md)
5. Copy the templates you need from [templates/](./templates/)
6. Adjust [config/method.config.json](../config/method.config.json) if your repo uses different paths
7. Run the portable checks under [scripts/](../verify/scripts/)

## Directory Location

This `patterns/` directory is the canonical method source in `pantheon-harness`.

Repository-local `architecture/harness/*` files may project or summarize the method for local execution, but if drift appears, the method definition here wins and downstream projections should be synchronized.

## Versioning

Current version: `1.3.0` (matches `pantheon-harness/VERSION`)

Version metadata:

- [VERSION](../VERSION)
- [CHANGELOG.md](../CHANGELOG.md)
- [changelog.md](./changelog.md)
- [upgrade.md](./upgrade.md)

## Health Check

Run the health check to verify method kit integrity:

```bash
# Standalone mode
node pantheon-harness/scripts/harness/check-method-health.mjs --strict

# Workspace mode
node scripts/harness/check-method-health.mjs --strict
```
