# Task Packet: github-security-reports

## Goal

Add GitHub-native, non-paid security and dependency scanning to both child repositories.

## Primary Layer

platform

## Dependency Layers

- none

## Contract Anchors

- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/TASK_PACKET_SPEC.md`
- `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
- `pantheon-base/.github/workflows/quality.yml`
- `pantheon-ops/.github/workflows/quality.yml`

## Scope

### In

- Add Dependabot update configuration for Go modules, root npm, frontend npm, and GitHub Actions in `pantheon-base`.
- Add Dependabot update configuration for Go modules, root npm, frontend npm, and GitHub Actions in `pantheon-ops`.
- Add report-first security workflow artifacts in `pantheon-base`.
- Add report-first security workflow artifacts in `pantheon-ops`.
- Record the local limitation that GitHub-hosted execution still requires push/remote CI.

### Out

- Do not enable paid GitHub Advanced Security or CodeQL-only repository settings.
- Do not require local terminal GitHub access.
- Do not change application runtime code.
- Do not make new report-first scanners block PRs before baseline triage.

## Expected Files

### Create

- `pantheon-base/.github/dependabot.yml`
- `pantheon-base/.github/workflows/security.yml`
- `pantheon-ops/.github/dependabot.yml`
- `pantheon-ops/.github/workflows/security.yml`
- `docs/harness/tasks/2026-05-13-github-security-reports.task.md`
- `.harness/evidence/2026-05-13-github-security-reports/summary.md`
- `.harness/evidence/2026-05-13-github-security-reports/commands.json`

### Modify

- `docs/harness/HARNESS_OPEN_TASKS.md`

### Do Not Touch

- application source code
- Go module files
- npm lock files

## Implementation Notes

- Existing `quality.yml` already blocks on frontend `npm audit --omit=dev` and backend `govulncheck`.
- New `security.yml` is intentionally report-first and uploads artifacts for dependency, secret, and workflow posture scans.
- Dependabot PR grouping reduces update noise across the two child repositories.

## Verification Plan

### Backend

- none

### Frontend

- none

### Visual

- desktop viewport: not run; this task changes CI configuration and Harness documentation only.
- mobile viewport: not run; this task changes CI configuration and Harness documentation only.
- empty/loading/error/permission states: not applicable; no product UI state changes.
- screenshot evidence: not required; evidence records the no-UI reason.

### Harness

- `node scripts/harness/check-task-packet.mjs`
- `node scripts/harness/check-evidence.mjs --strict`

### Configuration

- Parse both `dependabot.yml` files as YAML.
- Parse both `security.yml` workflow files as YAML.

## Linkage

- Task ID: 
2026-05-13-github-security-reports
- OpenSpec Change: none
- Superpowers Plan: none
- Evidence Directory: .harness/evidence/
2026-05-13-github-security-reports
/
- Review File: .harness/evidence/
2026-05-13-github-security-reports
/review.md

## Evidence Required
- command result summary
- known gaps

## Human Gates

- Push both child repositories to GitHub and confirm the `Security Reports` workflow uploads artifacts.
- Enable Dependabot alerts/security updates in GitHub repository settings if they are not already enabled.

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Tests or checks updated
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Docs updated if contracts changed
- [x] Review completed



