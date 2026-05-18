# Agentic Repo Shell

This directory is the copyable repo shell for a new project.

Use it together with:

- `agentic-method-kit/`

## Composition

- `agentic-method-kit/`: portable method source of truth
- `agentic-repo-shell/`: repo-local shell and execution layer
- `pantheon-overlay/`: optional Pantheon-specific overlay

## What This Starter Contains

- `.agents/`
- `.github/`
- `.harness/` skeleton only
- `docs/harness/`
- `scripts/harness/`
- `openspec/` skeleton only
- shell version metadata

It intentionally does not carry historical task packets, evidence, or review artifacts from this workspace.

## Environment Requirements

Required:

- `git`
- `node` 20+

Recommended:

- a repository-local `AGENTS.md` or equivalent entry file
- an OpenSpec workflow for non-trivial work

Optional:

- local `.codex/skills/`
- browser QA tooling

## Versioning

Current shell version:

- `1.0.0`

Version metadata:

- `SHELL_VERSION.json`

## New Project Bootstrap

1. Copy `agentic-method-kit/` into the new repo root.
2. Copy the contents of `agentic-repo-shell/` into the new repo root.
3. Optionally apply `pantheon-overlay/` if the project uses the Pantheon inheritance model.
4. Optionally add `pantheon-base/` if your project depends on that foundation.
5. Add your project-specific `AGENTS.md` or `CLAUDE.md`.
6. Create the first OpenSpec change or first task packet before non-trivial implementation.

If you are bootstrapping from this workspace directly, you can also use:

```powershell
pwsh ./scripts/bootstrap-agentic-repo.ps1 -TargetPath <new-repo>
pwsh ./scripts/bootstrap-agentic-repo.ps1 -TargetPath <new-repo> -ApplyPantheonOverlay
pwsh ./scripts/bootstrap-agentic-repo.ps1 -TargetPath <new-repo> -ApplyPantheonOverlay -IncludePantheonBase
```

Notes:

- `-IncludePantheonBase` may take noticeably longer because it copies the foundation repository
- `-Force` allows overlay into an existing target directory; it does not delete existing files first

## How To Use After Bootstrap

1. put your project-specific contracts, designs, and acceptances in the repo
2. keep `agentic-method-kit/` as the method source of truth
3. use `docs/harness/` as the repo-local contract layer
4. store runtime evidence under `.harness/`
5. run `scripts/harness/*` locally and in CI
6. run `scripts/harness/check-method-health.mjs --strict` after method upgrades

## Optional Overlays

The default shell is generic.

Apply `pantheon-overlay/` only when the repository needs:

- base/business inheritance governance
- Pantheon-style drift checks
- Pantheon-specific PR and CI review gates
- Pantheon-specific architecture and backend contract checks

## Recommended Result

After bootstrap, the new business repository root should contain at least:

```text
.agents/
.github/
.harness/
agentic-method-kit/
docs/harness/
openspec/
scripts/harness/
```

## Optional Layers

This starter does not include local `.codex/skills/`.

That is intentional:

- the method must remain tool-agnostic
- Codex can still operate via `.agents/` plus repo contracts
- add local Codex skills only when a business repo needs stable repo-specific helper workflows

## Skills Guidance

Preinstalling skills is not required.

Recommended interpretation:

- `agentic-method-kit/` and repo contracts are mandatory
- `.agents/` is the default cross-tool adapter layer
- local skills are optional accelerators

If you do add skills, keep them out of the critical path:

- they may improve speed
- they must not become the only place where the method is defined
