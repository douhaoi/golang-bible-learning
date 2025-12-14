# Astro SSG 升级规格说明（Spec）

本文档用于把当前的 **SPA（React + Vite + React Router）** 站点升级为 **Astro 的 SSG（静态站点生成）** 项目：使用 **Astro 原生 Markdown/MDX** 在构建期生成 HTML，并继续以 **GitHub Pages** 方式部署。

## 章节索引

- `docs/spec/01-current-state.md`：现状盘点（技术栈、路由、内容、部署）
- `docs/spec/02-goals-and-constraints.md`：目标、非目标与约束（SSG + GitHub Pages）
- `docs/spec/03-astro-architecture.md`：目标架构（路由、内容模型、Markdown/MDX、主题/交互）
- `docs/spec/04-migration-plan.md`：迁移计划（可回滚的增量步骤）
- `docs/spec/05-deployment.md`：GitHub Pages 部署方案（base、构建、404、缓存）
- `docs/spec/06-testing-and-rollout.md`：测试、验收与回滚策略
