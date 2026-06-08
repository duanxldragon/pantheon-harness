# Project Inheritance Template

Chinese version: [PROJECT_INHERITANCE_TEMPLATE.zh.md](./PROJECT_INHERITANCE_TEMPLATE.zh.md)

Copy this file into a derived Pantheon business repository as `docs/PROJECT_INHERITANCE.md`.

```md
# Project Inheritance

## 1. Inheritance Source
- Base repository: `../pantheon-base`
- Base release line: `release/<x.y>` or `<stability-line>`
- Base version: `<base-tag>`
- Inheritance mode: `foundation-release-consumer`

## 2. Inherited Base Rules
This repository inherits from `pantheon-base`:
- layer model: `platform / system/auth / system/iam / system/org / system/config / business/*`
- contract-first document flow
- shared backend, frontend, i18n, permission, audit, and acceptance rules

## 3. Required Base Reading Order
Before editing this repository, read:
1. `../pantheon-base/DESIGN.md`
2. `../pantheon-base/AGENTS.md`
3. `../pantheon-base/docs/README.md`
4. matching base contracts and design docs

## 4. Local Business Scope
- `business/<module-a>`
- `business/<module-b>`

## 5. Local Additions Only
- `docs/designs/BUSINESS_<MODULE_A>_DESIGN.md`
- `docs/designs/BUSINESS_<MODULE_B>_DESIGN.md`

## 6. Override Policy
- Allowed: business-domain additions and local execution notes
- Not allowed: redefining base contracts, base layer ownership, key-first i18n rules, or shared UI hard constraints
- If base rules must change, update `pantheon-base` first
```

Use explicit releases or tags instead of tracking `main` by default:

- `main` is the continuous foundation optimization line
- `release line + base tag` is the downstream consumer interface
- an unpublished commit should be an emergency exception only
