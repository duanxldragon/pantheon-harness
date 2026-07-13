# Repo-Local Skill Templates

Chinese version: [README.zh.md](./README.zh.md)

This directory stores shared templates for repository-local agent workflow skills.

These templates are not tied to one concrete repository. Use them when creating or refreshing repo-local skills in repositories such as `pantheon-base` and `pantheon-ops`.

Available templates:

- `repo-verify-template`
- `repo-pr-gate-template`
- `repo-ci-triage-template`
- `gh-fix-ci-template`

Recommended use:

1. pick the matching template
2. copy its structure into the target repository `.agents/skills/<skill-name>/SKILL.md`
3. replace placeholders with real commands, workflows, and risk boundaries
4. wire the skill into that repository's `AGENTS`, `README`, and inheritance entry docs
