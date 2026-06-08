# Project Inheritance Template

English version: [PROJECT_INHERITANCE_TEMPLATE.md](./PROJECT_INHERITANCE_TEMPLATE.md)

把这个文件复制到派生的 Pantheon 业务仓库中，并命名为 `docs/PROJECT_INHERITANCE.md`。

```md
# Project Inheritance

## 1. Inheritance Source
- Base repository: `../pantheon-base`
- Base release line: `release/<x.y>` 或 `<stability-line>`
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

## 使用说明

这个模板本身建议保持英文结构，原因是：

- 它更像一份可复制配置模板，而不是纯说明文档
- 字段值会被不同语言背景的工程师共同维护
- 保持英文键名可以减少后续机器消费、review 和协作歧义

中文团队在使用时，可以：

- 保留模板结构不变
- 在业务仓库的 `docs/PROJECT_INHERITANCE.md` 中补充中文解释性注释
- 或者另外写一份中文导读，解释每个字段应该怎么填

### 关于 release 而不是 main

推荐派生仓默认消费 `pantheon-base` 的显式 release/tag，而不是跟随 `main`：

- `main` 是底座持续优化线
- `release line + base tag` 才是业务仓默认消费接口
- 只有紧急例外才允许写未发布 commit，并且要记录原因
