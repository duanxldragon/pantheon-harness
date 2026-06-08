---
name: repo-pr-gate-template
description: Use when creating or refreshing a repository-local PR-gate skill that defines review, evidence, and high-risk closure rules for a specific repository
---

# Repo PR Gate Template

This template defines what a repository must prove before PR or merge.

## Required Inputs

- standard review requirement
- high-risk review requirement
- repository-specific high-risk scope
- required UI evidence rule
- required security gate rule
- extra closure rules such as inheritance or landing-side decisions

## Template Shape

```markdown
# Repo PR Gate

Repo-specific opening sentence.

## Required Sequence

1. run `repo-verify`
2. classify risk
3. attach evidence
4. request independent review

## Risk Split

- standard change:
  - `<approval rule>`
- high-risk change:
  - `<approval rule>`

High-risk scope includes:

- `<repo-specific bullets>`

## Extra Gates

- UI:
  - `impeccable`
  - rendered evidence or runtime gap
- runtime-sensitive or security-sensitive:
  - `security-diff-scan`
- `<repo-specific extra gate>`

## PR Body Minimum

- owning layer
- change boundary
- commands run
- evidence summary
- known gaps
```

## Repository Knobs

- repositories built on a foundation repo may require an explicit landing-side decision
- infrastructure-heavy repos may need deploy or workflow posture notes
- generated-module repos may require generated outputs in the same patch

## Anti-Pattern

Do not create a PR gate that merely repeats generic review advice while omitting the repository's real high-risk boundaries.
