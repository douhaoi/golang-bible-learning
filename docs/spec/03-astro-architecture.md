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

## 3.2 内容模型（推荐：Astro Content Collections）

目标：让 Markdown/MDX 成为“构建期可类型化读取”的内容源，便于生成静态页与 SEO 元信息。

建议组织：

- 将现有内容迁移到 `src/content/sections/`（作为一个 collection）
  - 示例：`src/content/sections/ch1/ch1-01.md`
  - 图片：继续放在 `public/content/images/`（静态资源）

然后用 `src/content/config.ts` 定义 collection（示意）：

- collection 名：`sections`
- frontmatter（可逐步补齐，不要求一次到位）：
  - `sectionId`（例如 `1.1`）
  - `chapterId`（例如 `1`）
  - `title`（用于 `<title>` 与页面标题）
  - `order`（用于排序；或从文件名推导）

说明：

- 你当前已有 `src/content/index.json` 与 `src/data/chapters.ts`，可作为迁移期的“路径/标题来源”。
- 长期建议以 Content Collections 为单一真源（避免多处维护）。

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

## 3.5 交互策略（岛屿化，最小 JS）

迁移到 Astro 后，默认页面是静态 HTML。需要保留交互的地方（如移动端目录展开、主题切换）用“岛屿”方式注水：

- 继续复用现有 React 组件（通过 `@astrojs/react`）
- 仅对需要交互的组件添加 `client:load` / `client:idle` / `client:visible`

优先级建议：

1. 主题切换（若目前依赖 React Context，可先作为 React 岛屿保留）
2. 移动端章节/小节导航（折叠/展开）
3. 代码复制按钮（如果需要）
