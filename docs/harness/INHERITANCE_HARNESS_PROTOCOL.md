# Inheritance Harness Protocol

类型：Contract
归属层：platform
状态：Active

本文定义 `pantheon-base` 与派生业务仓库之间的 Harness Engineering 协议。

## 1. 权威边界

- `pantheon-base` 是 `platform` 与 `system/*` 的唯一权威来源。
- `pantheon-ops` 等业务仓库只拥有 `business/*` 业务设计、业务代码和业务验收。
- 业务仓库不得复制或重写 base 合同来改变底座语义。

## 2. 修改归属判断

在业务仓库中发现问题时，先判断：

| 问题类型 | 默认落点 |
|---|---|
| 平台壳层、导航、工作台 | `pantheon-base` |
| auth、iam、org、config | `pantheon-base` |
| 通用权限、菜单、i18n、审计能力 | `pantheon-base` |
| CMDB、Deploy 等业务行为 | `pantheon-ops` |
| 业务模块挂载点 | base 暴露扩展 API，业务仓库注册 |

## 3. Drift 分类

Drift 扫描必须至少区分：

- pseudo-drift：模块名或路径差异，无真实逻辑差异。
- business mount：业务仓库合法挂载点。
- generic drift：业务仓库中出现的通用底座增强，应回流 base。
- business-specific drift：真实业务逻辑，应保留在 business。
- noise：换行、fixture、服务名等低风险差异。

## 4. Drift 处理顺序

1. 先扫描并分类。
2. generic drift 先回流 `pantheon-base`。
3. base 合并后，业务仓库再升级继承版本。
4. pseudo-drift 通过 workspace、replace、扩展 API 或删除 override 收敛。
5. 每次收敛必须保留验证证据。

## 5. Human Gates

以下操作必须人工确认：

- 删除业务仓库中的 inherited file override。
- 修改 base 合同或基础扩展 API。
- 将业务仓库真实逻辑回流 base。
- 改变 `docs/PROJECT_INHERITANCE.md` 的 base version。

## 6. Agent 要求

Agent 在派生仓库工作时必须说明：

```text
Is this base-owned or business-owned?
If base-owned, why is the change happening here?
If business-owned, which business contract anchors it?
Does this create or resolve drift?
```

