# 04. 迁移计划（Astro SSG）

目标：把现有 SPA 站点迁移为 Astro SSG，并以最小风险完成上线（可随时回滚到原 SPA）。

## 4.1 迁移策略：并行存在 + 逐步切流

建议采用“新旧共存、逐步替换”的方式：

- 保留现有 Vite SPA（作为回滚兜底）
- 新增 Astro 应用目录（推荐 `apps/site-astro/` 或直接在根目录替换，二选一）
- 先让 Astro 跑通 **1 个小节页** 的静态生成与部署，再扩展到全量路由

如果你更希望“一次性替换根目录”，也可行，但回滚成本更高。

## 4.2 Milestone 拆解

### M0：初始化 Astro 工程（可单独提交）

交付物：

- Astro 项目可本地启动与构建
- GitHub Pages 部署可跑通一个静态页面

建议命令（你本地执行）：

- `pnpm create astro@latest`
- 选择：TypeScript = Yes，Output = Static

### M1：布局与全站样式迁移

目标：在 Astro 中复刻现有 UI 框架（布局、主题变量、Tailwind）。

建议任务：

- 迁移 `src/index.css` 与 Tailwind 配置到 Astro
- 新建 `src/layouts/BaseLayout.astro`：
  - 复用现有“初始化主题避免闪烁”的脚本（从 `index.html` 迁移）
  - 添加 `<base href={import.meta.env.BASE_URL} />`（解决 GitHub Pages 子路径与深层路由资源引用）

验收：

- Astro 页面在深层 URL 下也能正确加载 CSS/资源
- 主题切换不闪烁（至少不劣化）

### M2：内容模型落地（Content Collections）

目标：用 Astro 原生 Markdown/MDX 管线读取并渲染内容。

建议任务：

- 新建 `src/content/config.ts` 并定义 `sections` collection
- 迁移内容目录：
  - `src/content/chX/*.md` → `src/content/sections/chX/*.md`
  - `src/content/images/*` → `public/content/images/*`（仍作为静态资源）
- 迁移 `src/content/index.json`（可作为过渡期索引，后续可移除）

验收：

- 任意一个 Markdown 能在 Astro 页面中被渲染（包含代码块高亮）

### M3：路由与页面生成（全量 getStaticPaths）

目标：生成与现有 SPA 等价的路由集合。

建议实现：

- `src/pages/chapter/[chapterId]/index.astro`：章节目录页（按章过滤 sections）
- `src/pages/chapter/[chapterId]/section/[sectionId].astro`：小节详情页
- `getStaticPaths()` 的数据源优先级：
  1) Content Collections（推荐最终形态）
  2) 过渡期可先用 `src/data/chapters.ts` 或 `src/content/index.json`

验收：

- 构建输出包含所有小节路径的 `index.html`
- 直接访问任意小节 URL 时，HTML 中可见正文（无需 JS）

### M4：功能补齐（导航、上一节/下一节、章节列表）

目标：补齐 SPA 体验中的核心能力，但尽量保持“默认 0 JS”。

建议策略：

- 章节/上一节/下一节：优先用静态链接生成（不依赖客户端路由）
- 移动端折叠菜单：用最小 JS（Astro + 原生 JS）或复用 React 组件作为岛屿

验收：

- 全站可导航，无死链
- 交互仅在需要处注水

### M5：SEO 与细节（标题、描述、sitemap 可选）

建议任务：

- `<title>`：`第 {chapterId} 章 · {sectionId} · {title} - Go语言圣经`
- `<meta name="description">`：取正文前 N 个字符（去 Markdown 标记）
- `sitemap.xml`：可选（Astro 有官方集成）

## 4.3 回滚策略

- 在迁移完成前，保持 GitHub Pages 仍部署旧 SPA（主分支不切流）
- Astro 部署可先用单独分支/环境验证
- 切流后如果发现问题，可回退部署到原 SPA（只要保留构建链路即可）
