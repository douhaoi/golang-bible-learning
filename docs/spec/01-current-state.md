# 01. 现状盘点（Current State）

## 1.1 项目定位

- 这是一个内容型学习站点，主要展示 `src/content/` 下的 Markdown（章节/小节）内容。
- 当前部署目标是 **GitHub Pages**（纯静态托管）。

## 1.2 技术栈与关键依赖

- 构建：Astro 5（`astro.config.mjs`）
- UI：TypeScript + Tailwind CSS（`src/index.css`、`tailwind.config.js`）
- 内容：Astro Content Collections（`astro-src/content/config.ts`，读取 `src/content/ch*/*.md`）
- Markdown：Astro 原生渲染（`render(entry)`）+ `remark-gfm` + 自定义 remark 插件（图片路径/尺寸）

## 1.3 路由结构（SSG）

静态路由在构建期生成对应的 `index.html`（目录式输出）：

- `/`（首页）
- `/chapters/`（章节列表）
- `/chapter/{chapterId}/`（某章目录页）
- `/chapter/{chapterId}/section/{sectionId}/`（小节详情页：核心）

## 1.4 内容加载方式（构建期渲染）

- Markdown 在构建期通过 Content Collections 读取并渲染为 HTML（不依赖浏览器再 `fetch` Markdown）。
- 图片等静态资源位于 `public/content/images/`，构建后进入 `dist/content/images/`，供页面引用。

## 1.5 现有部署方式与限制（静态托管）

- `.github/workflows/deploy.yml`：构建产物 `dist/` 上传到 GitHub Pages
- `astro.config.mjs`：生产环境 `base` 指向 `/golang-bible-learning/`（适配仓库路径）
- 站点为纯静态输出（SSG），无需服务器运行时
