# Release Guide

This workspace releases method assets, not a monolithic starter repository.

## Release Units

- `agentic-method-kit`
- `agentic-repo-shell`
- `pantheon-overlay`

## Release Checklist

1. Update version metadata in the package being released.
2. Update compatibility metadata between method kit and repo shell when needed.
3. Update changelog and upgrade notes.
4. Run root method checks:
   - `node scripts/harness/check-adoption.mjs --strict`
   - `node scripts/harness/check-method-health.mjs --strict`
5. Run package tests:
   - `node --test agentic-repo-shell/scripts/harness/*.test.mjs`
   - `node --test pantheon-overlay/scripts/harness/*.test.mjs`
6. Run bootstrap smoke when shell or overlay changes:
   - `pwsh ./scripts/bootstrap-agentic-repo.ps1 -TargetPath .tmp/release-smoke -ApplyPantheonOverlay -Force`
   - `node .tmp/release-smoke/scripts/harness/check-method-health.mjs --strict --root .tmp/release-smoke`
   - `node --test .tmp/release-smoke/scripts/harness/*.test.mjs`
7. Remove temporary smoke directories after verification.

For full distribution-workspace extraction dry-runs, also use:

- `pwsh ./scripts/scaffold-standalone-method-repo.ps1 -TargetPath .tmp/standalone-method-repo -Force`

## Packaging Rule

The publishable surfaces are the package directories themselves.

The root workspace is:

- a maintenance environment
- a validation environment
- a historical record

It is not the artifact a downstream repository should copy in full.
