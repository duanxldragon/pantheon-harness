---
name: repo-ci-triage-template
description: Use when creating or refreshing a repository-local CI-triage skill that maps GitHub Actions workflow jobs back to local reproduction commands
---

# Repo CI Triage Template

Map hosted failures back to real local proof commands.

## Required Inputs

- workflow file names
- job names
- local reproduction commands per job
- hosted-only limitations such as CodeQL
- repository-specific failure classes such as inheritance drift or generated output drift

## Template Shape

```markdown
# Repo CI Triage

Repo-specific opening sentence.

## Gather First

- workflow name
- job name
- failing step name
- commit SHA or PR head
- short log excerpt

## Workflow Map

- `<workflow>` -> `<job>`
  - `<local command>`
- `<workflow>` -> `<job>`
  - `<local command>`

## Repo-Specific Notes

- `<important hosted-vs-local nuance>`
- `<sync or generated-output nuance>`

## Exit Condition

Report:

- failing workflow/job/step
- local reproduction command
- root cause
- fix applied
- remaining hosted-only risk
```

## Repository Knobs

- whether security workflows are blocking gates or report-only pipelines
- whether aggregate jobs should be ignored in favor of upstream failing jobs
- whether CI adds special env vars or generated-file steps

## Anti-Pattern

Do not debug the aggregate gate job first. Always reproduce the first real failing dependency job.
