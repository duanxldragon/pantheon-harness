---
name: gh-fix-ci-template
description: Use when creating or refreshing a repository-local GitHub Actions repair skill that adapts CI-fix workflow to a repository's actual jobs, commands, and hosted-only limits
---

# GH Fix CI Template

This template is for the GitHub-run-level repair loop after local triage.

## Required Inputs

- repository-local `repo-ci-triage` mapping
- GitHub CLI commands the team uses
- hosted-only limitations
- repository-specific rules for generated files, workflow posture, or sync boundaries

## Template Shape

```markdown
# GH Fix CI

Repo-specific opening sentence.

## Before Using

- reproduce locally first with `repo-ci-triage`
- `<repo-specific prerequisite>`
- do not use CI debugging to replace local red tests

## Minimal Loop

1. identify the failing workflow, job, and step
2. inspect the failed run details with GitHub CLI when available
3. map the failing job to local commands
4. fix the smallest real cause
5. re-run proof commands plus `repo-verify`

## GitHub CLI Hints

- `gh run list --limit 10`
- `gh run view <run-id> --json jobs`
- `gh run view <run-id> --log-failed`

## Repo-Specific Rules

- `<aggregate-job rule>`
- `<workflow-posture rule>`
- `<generated-output or sync-boundary rule>`

## Final Report

- failing run identifier
- failing job and step
- local reproduction command
- root cause
- fix
- remaining nonlocal risk
```

## Repository Knobs

- whether security workflow failures are true blockers or reports
- whether workflow YAML changes require local `zizmor` proof
- whether a foundation-sync boundary must be checked before CI-only debugging

## Anti-Pattern

Do not turn this into a generic "look at CI" note. The skill must name the repository's actual workflows, jobs, and hosted-only caveats.
