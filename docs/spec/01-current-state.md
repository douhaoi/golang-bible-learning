# 01. 现状盘点（Current State）

## 1.1 项目定位

- 这是一个内容型学习站点，主要展示 `src/content/` 下的 Markdown（章节/小节）内容。
- 当前部署目标是 **GitHub Pages**（纯静态托管）。

## 1.2 技术栈与关键依赖

- 构建：Vite 5（`vite.config.ts`）
- UI：React 18 + TypeScript + Tailwind CSS（`package.json`）
- 路由：React Router DOM 6（`src/App.tsx`、`src/main.tsx`）
- Markdown 渲染：`react-markdown` + `remark-gfm` + `react-syntax-highlighter`（`src/components/MarkdownContent.tsx`）

## 1.3 路由结构（SPA）

在 `src/App.tsx` 中以 `<Routes>` 定义：

- `/`：首页
- `/chapters`：章节列表
- `/chapter/:chapterId`：章节列表（按章）
- `/chapter/:chapterId/section/:sectionId`：小节详情（核心内容页）

## 1.4 内容加载方式（当前为“客户端加载”）

`src/utils/contentLoader.ts`：

- 开发环境：`import.meta.glob('../content/ch*/*.md', { query: '?raw' })` 动态导入
- 生产环境：`fetch(`${basePath}content/${filePath}`)` 从静态文件拉取

配套脚本 `scripts/copy-content.js` 会把 `src/content/` 复制到 `public/content/`，最终进入 `dist/content/`，供生产环境 `fetch` 使用。

结论：目前“内容是否可见”依赖浏览器执行 JS 后再请求 Markdown，属于典型 SPA 行为。

## 1.5 现有部署方式与限制（静态托管）

- `.github/workflows/deploy.yml`：构建产物 `dist/` 上传到 GitHub Pages
- `vite.config.ts`：生产环境 `base` 指向 `/golang-bible-learning/`（适配仓库路径）
- `src/main.tsx`：`BrowserRouter basename` 同步适配 GitHub Pages

结论：当前部署形态（GitHub Pages）只能托管静态文件，因此要获得“首屏直出/可抓取 HTML”，需要走 **SSG（静态生成）/预渲染** 路线，或迁出到有运行时的平台（但本次明确继续 GitHub Pages）。
