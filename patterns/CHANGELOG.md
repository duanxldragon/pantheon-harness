# Agentic Method Kit Changelog

Chinese version: [CHANGELOG.zh.md](./CHANGELOG.zh.md)

## Unreleased

- Require method-first ratchet metadata in task packets: quality profile, portable failure class, owner layer, method readiness, ratchet decision, and deferred code issues.
- Require evidence and review artifacts to record owner layer, ratchet decision, and deferred code issues.
- Add task-packet regression tests so stale packets without method readiness fail mechanically.
- Extend coverage review templates with cross-agent ratchet, consumer-specific leakage, deferred code backlog, and noisy sensor review sections.
- Document upgrade steps for older task packets, evidence, and review artifacts.
- Add a portable design/development/QA/GitHub governance loop with task, review, PR, and failure-registry metadata.

## 1.0.0 - 2026-05-18

Initial portable release.

Included in this release:

- method/source separation from runtime evidence
- portable task packet, evidence, and review templates
- machine-readable linkage across OpenSpec, task packet, evidence, and review
- portable check scripts
- minimal example fixture
- environment and skill guidance
- compatibility pairing with `agentic-repo-shell` `1.0.0`
