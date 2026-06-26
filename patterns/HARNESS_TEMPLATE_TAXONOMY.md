# Harness Template Taxonomy

Chinese version: [HARNESS_TEMPLATE_TAXONOMY.zh.md](./HARNESS_TEMPLATE_TAXONOMY.zh.md)

This document defines portable harness template categories.

A harness template is a versioned bundle of guides, sensors, gates, state conventions, and bootstrap files for a common repository topology. It should not bind the repository to one agent tool.

## 1. Template Principles

- Templates encode topology, not vendor preference.
- Templates include both feedforward guides and feedback sensors.
- Templates must state what they regulate and what they do not regulate.
- Templates should be small enough to adopt, then extend by overlay.
- Templates must be versioned and upgradeable.

## 2. Template Layers

Each template has five layers.

| Layer | Purpose |
|---|---|
| Entry | Short repo entry guide and reading map |
| Contracts | Architecture, domain, API, security, and acceptance rules |
| Sensors | Tests, static checks, smoke checks, and review rules |
| State | Task packet, evidence, review, and decision artifacts |
| Adapter | Optional runtime-specific mappings |

Only the adapter layer is tool-specific.

## 3. Base Templates

### 3.1 Admin Platform Template

Use for:

- internal admin platforms
- modular monolith backoffice systems
- systems with permissions, menus, audit, i18n, and configuration governance

Default guides:

- platform/domain boundary map
- permission/menu/audit/i18n contracts
- UI state and design constraints
- page template rules

Default sensors:

- backend tests for auth, IAM, config, audit
- frontend typecheck/build
- menu and i18n contract checks
- browser smoke for core routes
- visual quality gate for shell and repeated page patterns

High-risk gaps:

- behavior correctness can be under-tested if smoke only checks render paths
- UI governance can become over-specified without user journey checks

### 3.2 API Service Template

Use for:

- HTTP or RPC services
- service boundaries with stable contracts
- business APIs without large UI surfaces

Default guides:

- API contract
- error semantics
- schema and migration rules
- observability requirements
- security and auth policy

Default sensors:

- unit and integration tests
- contract tests
- schema migration checks
- static dependency rules
- log/metric/trace checks for key paths

High-risk gaps:

- generated tests may miss real consumer behavior
- backward compatibility needs explicit contract fixtures

### 3.3 Event Processor Template

Use for:

- workers
- queue consumers
- stream processors
- scheduled jobs

Default guides:

- event schema contract
- idempotency policy
- retry and dead-letter policy
- observability rules
- operational runbook

Default sensors:

- fixture-based event replay
- idempotency tests
- failure and retry tests
- latency and throughput checks
- log and trace checks

High-risk gaps:

- happy-path tests can miss poison messages
- runtime backlog and retry storms need production-like signals

### 3.4 Dashboard Template

Use for:

- reporting dashboards
- analytics surfaces
- data-heavy operational views

Default guides:

- data source contract
- metric definition dictionary
- freshness and latency rules
- chart and table design rules
- permission and data visibility policy

Default sensors:

- query tests
- data fixture comparisons
- chart render smoke
- accessibility and responsive checks
- stale-data checks

High-risk gaps:

- visual render can pass while metric semantics are wrong
- data freshness needs runtime observability

### 3.5 UI-Heavy Product Template

Use for:

- feature-rich frontend apps
- editor-like experiences
- workflows where subjective quality and interaction depth matter

Default guides:

- product principles
- design quality criteria
- interaction contracts
- accessibility rules
- browser-supported workflow list

Default sensors:

- Playwright or equivalent journey tests
- screenshot evidence
- evaluator review for visual and interaction quality
- accessibility checks
- performance checks

High-risk gaps:

- evaluator judgment must be calibrated
- screenshot-only review can miss interaction quality

### 3.6 CLI Tool Template

Use for:

- command-line tools
- developer utilities
- automation scripts with stable flags and output

Default guides:

- command contract
- flag and exit-code semantics
- input/output fixture policy
- compatibility and deprecation rules

Default sensors:

- golden output tests
- exit-code tests
- shell transcript fixtures
- help text checks

High-risk gaps:

- tests can overfit exact text when semantic behavior matters more
- platform differences need explicit fixtures

### 3.7 Library / SDK Template

Use for:

- shared libraries
- SDKs
- packages consumed by other repositories

Default guides:

- public API contract
- versioning and compatibility policy
- example usage requirements
- benchmark or performance expectations when relevant

Default sensors:

- unit tests
- type tests
- compatibility fixtures
- example compilation or execution
- benchmark smoke checks when relevant

High-risk gaps:

- internal tests can miss real consumer usage
- public API drift needs explicit fixtures

### 3.8 Data Pipeline Template

Use for:

- ETL/ELT pipelines
- batch jobs
- data quality workflows
- analytics transformations

Default guides:

- input/output schema contracts
- data freshness and retention rules
- idempotency and rerun policy
- quality thresholds

Default sensors:

- schema checks
- sample run fixtures
- row-count and anomaly checks
- lineage or dependency checks

High-risk gaps:

- sample data may not represent production skew
- correctness often needs domain-owned acceptance examples

### 3.9 Infrastructure Change Template

Use for:

- infrastructure-as-code repositories
- deployment and environment changes
- policy-as-code workflows

Default guides:

- environment ownership map
- plan/apply policy
- rollback expectations
- secret-handling rules

Default sensors:

- plan or diff checks
- policy-as-code checks
- dry-run validation
- drift detection

High-risk gaps:

- dry-runs can miss provider-side runtime behavior
- human gates are mandatory for destructive changes

### 3.10 Mobile App Template

Use for:

- iOS, Android, React Native, Flutter, or similar apps
- user flows that depend on device state

Default guides:

- supported device and OS matrix
- navigation and permission-state contracts
- offline and error-state expectations
- accessibility baseline

Default sensors:

- unit tests
- simulator or device smoke tests
- screenshots
- crash log checks
- accessibility checks

High-risk gaps:

- simulator coverage can miss device-specific failures
- screenshots do not replace interaction testing

### 3.11 Documentation Governance Template

Use for:

- documentation-first repositories
- API docs
- developer guides
- method or policy repositories

Default guides:

- document ownership
- frontmatter and lifecycle rules
- link and example verification rules
- archive and retirement policy

Default sensors:

- link checks
- frontmatter checks
- snippet/example execution
- docs build checks

High-risk gaps:

- docs can be internally consistent but still fail user tasks
- examples need runtime verification when they describe executable workflows

## 4. Overlays

An overlay adds domain-specific constraints to a base template.

Examples:

- example overlay: upstream/downstream inheritance, project-specific boundaries, drift checks
- regulated-domain overlay: audit retention, approval gates, evidence retention
- security-sensitive overlay: stricter secrets, dependency, and permission gates

Overlay rules:

- overlays must not redefine the base template silently
- overlays must declare added guides, sensors, and gates
- overlays must include an upgrade path when the base template changes

## 5. Template Selection

Choose the smallest template that covers the real topology.

Decision guide:

| Repository shape | Starting template |
|---|---|
| Backoffice with auth/IAM/menu/audit | Admin Platform |
| Headless service with stable API | API Service |
| Worker or stream processor | Event Processor |
| Data product or reporting UI | Dashboard |
| Rich interaction frontend | UI-Heavy Product |
| CLI or developer utility | CLI Tool |
| Shared package or SDK | Library / SDK |
| ETL, ELT, or data quality workflow | Data Pipeline |
| Infrastructure-as-code or deployment repo | Infrastructure Change |
| Mobile app | Mobile App |
| Documentation or method repository | Documentation Governance |
| Mixed system | choose primary template and add overlays |

Do not start with the strictest template unless the risk justifies it.

## 6. Template Health

Review each template periodically.

Checklist:

- Are entry guides still short?
- Are sensors mapped to known failure modes?
- Are gates preventing real defects or just slowing changes?
- Are template assumptions still valid for the current model and runtime?
- Are downstream repos drifting from the template?
- Are template upgrades easy to apply?

The output should be a versioned template update or an explicit decision to keep the current version.
