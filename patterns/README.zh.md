# 方法模式

Agentic 交付的核心方法模式和模板。

English version: [README.md](./README.md)

可移植的方法包，适用于希望在仓库中建立可重复 Harness Engineering 工作流的团队。

当您希望对非平凡的 agent 或人工辅助交付有明确的控制项时，可将此目录复制到目标仓库。

## 本目录内容

- 核心方法模型（`harness-core-model.*`）
- 方法 playbook（`method-playbook.*`）
- Context engineering 协议
- 执行护栏
- 模板分类
- 工具适配矩阵
- 模板（`templates/`）
- 配置（`config/`）

## 使用方式

### 独立模式

将 `pantheon-harness/` 复制到目标仓库根目录。方法论独立运行。

### 工作区模式

将 `pantheon-harness/` 作为兄弟目录放在工作区根目录。消费者仓库通过 `../pantheon-harness/` 引用它。

## 快速开始

1. 如果您的团队优先使用中文，阅读 [README.zh.md](./README.zh.md)
2. 阅读 [harness-core-model.zh.md](./harness-core-model.zh.md)
3. 阅读 [execution-guardrails.zh.md](./execution-guardrails.zh.md)
4. 阅读 [method-playbook.zh.md](./method-playbook.zh.md)
5. 从 [templates/](./templates/) 复制您需要的模板
6. 如果您的仓库路径约定不同，调整 [config/method.config.json](../config/method.config.json)
7. 运行 [verify/scripts/](../verify/scripts/) 下的可移植检查脚本

## 目录位置

本 `patterns/` 目录是 `pantheon-harness` 中的规范方法来源。

仓库本地的 `architecture/harness/*` 文件可以为本执行投影或摘要这些方法，但如果出现漂移，应以这里的方法定义为准，再回同步下游投影层。

## 版本管理

当前版本：`1.3.0`（与 `pantheon-harness/VERSION` 匹配）

版本元数据：

- [VERSION](../VERSION)
- [CHANGELOG.md](../CHANGELOG.md)
- [changelog.md](./changelog.md)
- [upgrade.md](./upgrade.md)

## 健康检查

运行健康检查验证方法包完整性：

```bash
# 独立模式
node pantheon-harness/scripts/harness/check-method-health.mjs --strict

# 工作区模式
node scripts/harness/check-method-health.mjs --strict
```
