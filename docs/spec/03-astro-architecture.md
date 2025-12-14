# 03. Astro 目标架构（Architecture）

本章描述迁移完成后的目标形态：**Astro SSG + 原生 Markdown/MDX + GitHub Pages**。

## 3.1 产物形态（静态路由）

每个路由都在构建期生成对应的 `index.html`（目录式输出），以便 GitHub Pages 直接访问深层路径：

- `/`（首页）
- `/chapters/`（章节列表）
- `/chapter/{chapterId}/`（某章的目录页）
- `/chapter/{chapterId}/section/{sectionId}/`（小节详情页：核心）

对应文件路由建议：

- `src/pages/index.astro`
- `src/pages/chapters/index.astro`
- `src/pages/chapter/[chapterId]/index.astro`
- `src/pages/chapter/[chapterId]/section/[sectionId].astro`

动态页面通过 `getStaticPaths()` 枚举全部路径（来源见 3.2）。

## 3.2 内容模型（Astro Content Collections）

目标：让 Markdown/MDX 成为“构建期可类型化读取”的内容源，便于生成静态页与 SEO 元信息。

当前实现：

- collection 名：`sections`
- 通过 glob loader 直接读取现有内容目录（不搬迁文件）：`astro-src/content/config.ts`
- 文件命名仍沿用：`src/content/chX/chX-YY.md`
- 图片以静态资源方式提供：`public/content/images/`（GitHub Pages / Astro `public/` 目录直出）

## 3.3 Markdown/MDX 渲染策略（原生渲染）

使用 Astro 原生 Markdown/MDX 的典型方式：

- 对于 collection 条目，在页面里取到 entry 后用 `render(entry)` 得到 `Content` 组件
- 代码高亮：使用 Astro 内置 Shiki（通过 `astro.config.mjs` 配置主题/语言）
- GFM：通过 `remark-gfm`（Astro markdown/MDX 支持配置 remark 插件）

保留你现有的“图片尺寸标记”能力（full/large/medium/small）的建议实现：

- 继续沿用 alt 关键字约定（不改变内容文件）
- 在 remark 阶段注入一个轻量插件，把 Markdown 图片渲染为带 class 的 `<img>`（或包装为 `<figure>`）
- 用 CSS 控制不同尺寸 class 的 max-width

## 3.4 GitHub Pages 的 base 路径与资源引用

你当前使用仓库路径部署（例如 `/golang-bible-learning/`）。Astro 推荐通过配置 `base` 来统一处理子路径：

- `astro.config.mjs`：`base: '/golang-bible-learning/'`

为避免 Markdown 中图片/链接在深层路由下变成“相对当前路径”的错误引用，建议：

- 在全站布局 `<head>` 中添加 `<base href={import.meta.env.BASE_URL} />`
- 将内容中的图片路径统一为相对 base 的形式，例如：
  - `content/images/xxx.png`（无前导 `/`）

这样无论在任何页面层级，都会解析为：

- `/golang-bible-learning/content/images/xxx.png`

## 3.5 交互策略（最小 JS）

当前实现以静态 HTML 为主，仅保留必要的少量 JS：

- 主题切换：在 `astro-src/layouts/BaseLayout.astro` 中使用内联脚本切换 `data-theme` 并写入 `localStorage`
