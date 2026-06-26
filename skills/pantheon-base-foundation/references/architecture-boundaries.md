# Architecture Boundaries

## Layer Ownership

- `platform`: shell, router assembly, middleware, dashboard/workbench aggregation, cross-domain views
- `system/auth`: login, refresh, logout, sessions, MFA, security policy
- `system/iam`: users, roles, permissions, menus, authorization governance
- `system/org`: departments, posts, organization relationships
- `system/config`: settings, dictionary, i18n assets, uploads, dynamic module governance
- `business/*`: domain-specific business capabilities

## Boundary Rules

- Aggregation pages belong to `platform`, not individual system domains.
- `business/*` modules must not directly import `modules/system/*` services or repositories.
- Shared contracts belong in `pkg/*` or explicit module contracts, not ad hoc cross-imports.
- Keep the modular monolith shape. Do not split into microservices without an explicit platform decision.

## Documentation Rules

- Base contracts and base design rules live in `pantheon-base`.
- Derived repositories may add business design docs and a local inheritance file.
- If a business repository needs a base rule to change, update `pantheon-base` instead of overriding locally.
