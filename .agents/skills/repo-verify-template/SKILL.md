---
name: repo-verify-template
description: Use when creating or refreshing a repository-local verification skill that maps change scopes to the minimum command matrix for a specific repository
---

# Repo Verify Template

Turn a repository's real verification commands into a small decision matrix.

## Required Inputs

- root-level checks
- frontend checks
- backend checks
- smoke or runtime checks
- inheritance or sync checks, if the repo depends on another foundation repo
- dependency or secret posture checks, if the repo treats them as local proof

## Template Shape

Use this structure in the target repository skill:

```markdown
# Repo Verify

One sentence describing the repo-specific rule, such as "inheritance checks are part of verification."

## Use This Matrix

- docs or root governance:
  - `<real command>`
- frontend:
  - `<real command>`
- backend:
  - `<real command>`
- runtime or smoke:
  - `<real command>`
- security-sensitive dependency or secret work:
  - `<real command>`

## Hard Rules

- do not claim completion from a narrower check than the touched scope requires
- attach rendered evidence or a runtime gap for UI changes
- record exact commands and outcomes
```

## Repository Knobs

Decide these per repository:

- does the repo require `base-sync` or inheritance checks
- does it use broad smoke suites or narrow scoped smoke commands
- does CI use `npm run build` directly or add a pre-step such as generated i18n
- are dependency audits a blocking local proof or just a hosted report

## Anti-Pattern

Do not copy command names from another repo without checking the actual scripts and workflows.
