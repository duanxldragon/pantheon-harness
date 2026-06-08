# Harness Engineering 1.0 发布说明

English version: [METHOD_RELEASE_1_0.md](./METHOD_RELEASE_1_0.md)

Harness Engineering 1.0 发布的是一套面向非 trivial 软件交付的方法层资产，用来把 coding agent 和人工评审纳入同一条可验证、可升级、可迁移的仓库级闭环。

这一版不是 Claude Code 预设，不是 Codex 预设，也不是只服务 Pantheon 的专用流程。它是一套由契约、模板、校验器和可升级控制回路组成的方法。

## 1.0 包含什么

- 工具无关的 harness 核心模型
- 用来评估 failure capture 和控制质量的覆盖模型
- 面向常见仓库形态的模板分类
- 工具适配矩阵，让具体工具可接入，但不把它们变成方法前提
- 可移植的 task packet、evidence、review、failure registry 资产
- 面向新仓库的 repo shell 启动壳层
- method-health、adoption、failure-registry 等校验脚本

## 这套方法适合谁

- 正在用 coding agent 做非 trivial 交付的团队
- 需要显式 verification 和 review closure 的仓库
- 希望工作流不被某个单一工具绑定的团队

## 1.0 不承诺什么

- 它不替代工程判断
- 它不靠一组 prompt 自动保证质量
- 它不要求某一个模型、编辑器或 agent runtime

## 推荐接入方式

1. 复制 `agentic-method-kit/`
2. 复制 `agentic-repo-shell/`
3. 按需叠加 `pantheon-overlay/`
4. 运行 harness 检查
5. 开始使用 task packet、evidence、review closure 和 failure registry

## 当前仍保留的演进项

- visual evidence strict-mode promotion 仍处于分阶段推进，而不是立即强制
- failure registry presence 已经实现，但“从 warning 升级为强制 landing file”仍等待更多下游仓库 adoption 后再收口
- repeated failure 现在应进入显式 ratchet loop，而不是继续停留在聊天经验层
- 重大模型或工具升级后，应执行 harness retirement review，避免临时 workaround 演化成永久镣铐
