# 05. 部署方案（GitHub Pages + Astro）

目标：继续使用 GitHub Pages，通过 GitHub Actions 构建并发布 Astro 的静态产物。

## 5.1 Astro 配置要点

### `base`

如果仓库名为 `golang-bible-learning`，建议设置：

- `base: '/golang-bible-learning/'`

说明：

- 这与当前 Vite 项目的 `vite.config.ts base` 一致
- 配合全站布局里的 `<base href={import.meta.env.BASE_URL} />`，可以解决深层路由下的资源与 Markdown 图片路径问题

### 输出模式

- `output: 'static'`（SSG）

## 5.2 GitHub Actions（沿用现有思路）

你当前的 `.github/workflows/deploy.yml` 是“构建并上传静态目录”的模式；迁移到 Astro 后依然适用，只需要调整：

- Node/pnpm 安装：保持不变
- 构建命令：从 `pnpm run build`（Vite）切换为 Astro build（例如 `pnpm -C apps/site-astro build` 或 `pnpm run build`，取决于目录结构）
- 上传目录：从 `./dist` 切换为 Astro 输出目录（通常是 `./dist`，也可能是 `./apps/site-astro/dist`）

## 5.3 404 与深层路由

SSG 产物会为每个路由生成对应目录的 `index.html`，因此：

- 不再需要 SPA 的“404 回退 + 客户端重定向”机制
- 但建议保留一个 `404.html`（GitHub Pages 需要），用于展示友好提示并引导回首页

## 5.4 缓存策略（静态站点）

建议（默认即可，作为方向）：

- `assets/*`：强缓存（文件名 hash）
- HTML：短缓存或默认缓存（内容更新依赖重新部署）

