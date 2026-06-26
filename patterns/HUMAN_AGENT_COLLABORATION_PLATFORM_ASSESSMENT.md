# Human-Agent Collaboration Platform Assessment

Chinese version: [HUMAN_AGENT_COLLABORATION_PLATFORM_ASSESSMENT.zh.md](./HUMAN_AGENT_COLLABORATION_PLATFORM_ASSESSMENT.zh.md)

## 1. Summary

Do not build a full human-agent development platform first.

Build the method as repository-owned documents, templates, schemas, checkers, examples, and upgrade rules first. Then add a thin companion layer only after the repository loop is stable.

Recommended sequence:

1. Stabilize the portable method loop in repositories.
2. Add CLI/reporting that reads existing task packets, evidence, reviews, and registries.
3. Add a lightweight dashboard for status, gaps, and ratchet decisions.
4. Only build a broader platform after multiple repositories and multiple agents produce repeated coordination pain that cannot be solved by docs, scripts, and CI artifacts.

## 2. Why Not A Full Platform First

A platform is useful only if it automates a stable workflow. If the workflow is still changing, a platform freezes weak assumptions and turns method iteration into product backlog.

Avoid building first-class platform features for:

- project management that existing issue trackers already solve
- IDE replacement
- CI replacement
- chat transcript storage as the source of truth
- business-specific architecture rules
- scanner result governance for one product repository

The method should remain the source of truth. The platform, if built, should be a reader, facilitator, and evidence surface.

## 3. Viable Product Shape

The first platform-like layer should be a companion, not a new development environment.

Minimum useful capabilities:

- Task packet wizard: creates bounded work from a goal, repo profile, and human gates.
- Evidence dashboard: shows command status, runtime gaps, screenshots, review status, and known gaps.
- Ratchet registry: groups repeated failures and proposes guide/sensor/gate/template changes.
- Multi-agent adapter view: shows which agent implemented, reviewed, or verified each task.
- Method drift report: compares method-kit version, repo-shell version, templates, and checker results.

Non-goals for the first product:

- replacing GitHub, GitLab, Jira, Linear, or an IDE
- executing arbitrary code remotely
- storing secrets
- owning production deploy decisions
- hard-coding one product architecture

## 4. Platform Readiness Gates

Start building a platform only when at least three of these are true:

- two or more repositories use the method for real work
- two or more agent tools participate in implementation or review
- task packet and evidence schemas have stayed stable for several weeks
- repeated coordination failures are recorded in the failure registry
- CI artifacts are not enough for humans to understand state quickly
- manual creation of task packets/evidence/reviews becomes a recurring bottleneck

If these are not true, improve the method and scripts instead.

## 5. Applicability Beyond Web

Harness Engineering is not web-specific.

The durable abstraction is:

```text
guide -> task boundary -> execution -> sensor -> evidence -> review -> gate -> ratchet -> retirement
```

This applies to:

- web frontends and admin systems
- backend APIs and services
- CLI tools
- libraries and SDKs
- data pipelines
- mobile apps
- infrastructure and DevOps repositories
- documentation engineering
- test automation and QA harnesses

What changes by domain is the sensor and evidence set.

### 5.1 Applicability Boundary

This method is not a replacement for every development activity. It fits software delivery work that has a clear repository, versioned artifacts, repeatable sensors, and reviewable evidence.

Use the full loop for:

- non-trivial feature work, bug fixes, refactors, migrations, release governance, and quality governance
- multi-agent or human-agent collaboration
- work that needs cross-session recovery, review, handoff, or retrospective learning
- work with definable done criteria, verification commands, runtime evidence, or human acceptance standards

Use a lightweight version for:

- early product discovery
- research spikes
- one-off brainstorming
- prototypes without stable repository boundaries or validation paths

The lightweight version should keep only the goal, key decisions, known risks, and next step. Do not force task packets, full evidence, review gates, or CI gates until the direction is stable enough for a full harness loop.

| Domain | Typical Sensors | Typical Evidence |
|---|---|---|
| Web UI | browser smoke, screenshots, accessibility checks, console errors | screenshots, route/state matrix, smoke JSON |
| Backend API | unit/integration tests, contract tests, logs, traces | command results, API examples, trace/log snippets |
| CLI | golden tests, exit code tests, shell transcript checks | command transcript, fixture output |
| Library / SDK | type tests, compatibility tests, examples, benchmarks | test matrix, generated docs, benchmark summary |
| Data pipeline | schema checks, sample runs, data quality checks | sample outputs, row counts, anomaly report |
| Mobile | simulator tests, screenshots, accessibility checks | device matrix, screenshots, crash logs |
| Infrastructure | plan/diff checks, policy-as-code, dry-runs | plan output, policy result, rollback note |
| Docs | link checks, frontmatter checks, example execution | doc build output, link report, verified snippets |

## 6. Domains That Need Extra Overlays

The method can apply outside web development, but some domains need stronger project-specific overlays:

- safety-critical systems
- regulated financial or medical systems
- embedded or hardware workflows
- high-frequency or hard real-time systems
- production operations and incident response
- repositories with strict privacy or secret-handling requirements

For those domains, do not reuse web UI gates as-is. Add domain-specific sensors, evidence, human gates, and escalation rules.

## 7. Long-Term Validity

The method remains useful as models improve because it does not depend on a fixed model weakness.

Stable parts:

- repository-owned source of truth
- explicit task boundaries
- evidence before completion claims
- human gates for high-impact decisions
- separate implementer and reviewer postures
- failure ratchet into guides, sensors, gates, templates, or no-action decisions
- retirement review when models and tools improve

Unstable parts:

- exact prompts
- exact checker list
- exact CI configuration
- exact agent adapter behavior
- which failures need deterministic gates

The method should evolve by promotion and retirement, not by accumulating rules forever.

## 8. Decision

Use this method to develop a human-agent collaboration platform later, but do not make the platform the first artifact.

The immediate product should be a repository companion that reads existing method artifacts and helps humans answer:

- What task is being worked on?
- What did the agent touch?
- What evidence proves the result?
- What remains unverified?
- Who reviewed it?
- Did this failure repeat, and should the method change?

That is enough to reduce coordination cost without over-designing a new lifecycle platform too early.
