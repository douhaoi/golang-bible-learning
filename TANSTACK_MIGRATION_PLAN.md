# React SPA 改造为 TanStack Start SSR/SSG 方案

## 项目概述
- **当前技术栈**: React 18 + Vite + React Router v6 + TailwindCSS
- **目标**: 迁移到 TanStack Start，采用 SSG（静态预生成）+ SSR 混合方案
- **部署**: GitHub Pages（保留 basename 支持）
- **内容**: 120+ 章节小节，Markdown 文件 + 图片资源

## 改造目标

### 1. 架构转变
- **从**: React Router (CSR) → **到**: TanStack Router (SSR/SSG)
- **SSG 策略**: 构建时预生成所有路由的静态 HTML（支持完整 SEO）
- **数据加载**: 在 loader 函数中预加载 Markdown 内容，序列化到 HTML 中
- **增量迁移**: 保持现有组件结构，重点改造路由和数据加载

### 2. 关键决策

#### 2.1 部署方式：静态预生成 (SSG)
**原因**:
- GitHub Pages 原生支持静态站点
- 无需服务器，成本低
- CDN 分发快速
- 适合内容更新不频繁的学习平台

**实现**:
- 在构建时使用 `getRouteData` 预加载所有 section 页面数据
- 生成对应的静态 HTML 文件
- 保留客户端 hydration 用于交互

#### 2.2 basename 双重支持
**环境变量控制**:
```bash
# 开发 + GitHub Pages 部署
VITE_BASE_PATH=/golang-bible-learning/

# 自有域名部署
VITE_BASE_PATH=/
```

**实现位置**:
- `vite.config.ts`: `base` 配置
- `src/routes/__root.tsx`: TanStack Router 配置

#### 2.3 内容加载：SSR 预加载
**流程**:
1. 在 route loader 中（服务端）加载 Markdown 文件
2. 序列化内容到 `dehydrate()` 中
3. 客户端 `hydrate()` 恢复数据，无需 fetch
4. 充分利用 SSR 的性能优势

**关键文件**: `src/utils/serverContentLoader.ts` (新增)

## 改造步骤

### Phase 1: 依赖与配置（1-2）

#### 1. 更新 package.json
**移除**:
- `react-router-dom` (v6.20.0)
- `@vitejs/plugin-react` (v4.2.1) — 由 TanStack Start 接管

**新增**:
- `@tanstack/react-start` (latest)
- `@tanstack/react-router` (latest)
- `@tanstack/router-plugin` (latest)
- `@tanstack/start-vite-plugin` (latest)
- `@vinxi/react` (latest) — Vite SSR 框架
- `vinxi` (latest) — TanStack Start 底层框架
- `@vinxi/cli` (latest) — CLI 工具

**保留**:
- 所有现有的 UI 依赖 (lucide-react, react-markdown, etc.)
- Tailwind, TypeScript, Biome 等工具链

**注**: 参考 TanStack Start 官方 starter 项目的依赖

#### 2. 更新 vite.config.ts
**结构**:
```typescript
import { defineConfig, mergeConfig } from 'vite'
import { tanstackStartVite } from '@tanstack/start-vite-plugin'
import { createVirtualFile } from '@tanstack/router-plugin/virtual-file-route'
import react from '@vitejs/plugin-react'

export default defineConfig(
  mergeConfig(
    {
      plugins: [react()],
      base: process.env.VITE_BASE_PATH || '/',
      // ... 其他配置
    },
    tanstackStartVite({
      // SSG 配置
      preloadRoutes: true,
      // GitHub Pages 兼容配置
    })
  )
)
```

**关键点**:
- 保留 `base` 路径配置（从环境变量读取）
- 启用 `preloadRoutes` 用于 SSG
- Markdown 文件支持

### Phase 2: 路由系统迁移（3-4）

#### 3. 创建 TanStack Router 配置
**文件结构** (src/routes/):
```
src/routes/
├── __root.tsx          # 根路由 (替代 App.tsx + Layout.tsx)
├── index.tsx           # 首页 (/)
├── chapters/
│   ├── index.tsx       # 章节列表 (/chapters)
│   ├── $chapterId.tsx  # 章节详情 (/chapter/:chapterId)
│   └── $chapterId/
│       └── $sectionId.tsx  # 小节详情 (/chapter/:chapterId/section/:sectionId)
├── api.server.ts       # 服务端函数（content loader）
└── router.ts           # 路由实例导出（共享）
```

#### 4. 迁移现有路由
**工作内容**:
- Home (/) → `routes/index.tsx`
- ChapterList /chapters → `routes/chapters/index.tsx`
- ChapterList /:chapterId → `routes/chapters/$chapterId.tsx`
- SectionDetail /:chapterId/:sectionId → `routes/chapters/$chapterId/$sectionId.tsx`

**重点**:
- 使用 `createFileRoute` 和 `useRoute()` hook
- 在路由中配置 `loader` 函数（服务端加载数据）
- 使用 `useLoaderData()` 读取预加载的数据

### Phase 3: 服务端入口与数据加载（5-6）

#### 5. 创建服务端入口 (src/entry.server.ts)
**职责**:
- 导入 TanStack Start 的 SSR handler
- 定义 request context (可选)
- 导出 `fetch` 处理函数

**参考结构**:
```typescript
import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

type RequestContext = {
  contentPath: string
  // ...
}

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: RequestContext
    }
  }
}

export default createServerEntry({
  async fetch(request) {
    return handler.fetch(request, {
      // context 可用于中间件和 loader
    })
  },
})
```

#### 6. 创建内容加载服务端函数 (src/utils/serverContentLoader.ts)
**职责**:
- 在 Node.js 服务端读取 Markdown 文件（使用 fs）
- 由 route loader 调用
- 返回序列化后的内容对象

**实现**:
```typescript
// 仅在 server 端执行（服务端自动检测）
import fs from 'fs'
import path from 'path'

export async function loadSectionContent(sectionId: string) {
  // 服务端直接读取文件系统，性能更优
  // 返回 { sectionId, title, content }
}
```

**注**: 客户端 fallback 仍使用 fetch，支持动态加载

### Phase 4: 客户端入口与 Hydration（7）

#### 7. 创建客户端入口 (src/entry.client.tsx)
**职责**:
- 使用 `hydrateRoot` 从 HTML hydrate
- 包装 StartClient 组件
- 集成 ThemeContext 等 providers

**实现**:
```typescript
import { StartClient } from '@tanstack/react-start/client'
import { hydrateRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'

hydrateRoot(
  document,
  <StrictMode>
    <ThemeProvider>
      <StartClient />
    </ThemeProvider>
  </StrictMode>,
)
```

### Phase 5: 组件与上下文适配（8-9）

#### 8. 重构根组件和布局
**删除**: src/App.tsx, src/main.tsx
**创建**: src/routes/__root.tsx

**__root.tsx 结构**:
- Layout 组件（Header + Footer）
- 嵌套 `<Outlet />` 用于子路由
- SectionNav sidebar（侧边栏）
- 主题切换逻辑

**关键点**:
- 使用 `useRouter()` 和 `useRouterState()` 替代 `useNavigate()`
- 使用 `Link` 组件而不是 React Router 的 Link（已包含在 TanStack Router 中）
- 保留所有现有样式和 UI 组件

#### 9. 更新组件 hooks
**受影响组件**:
- `SectionNav.tsx`: 用 `useRouter().navigate()` 替代 `useNavigate()`
- `SectionDetail.tsx`: 用 `useLoaderData()` 获取内容，删除 `useEffect` 数据加载
- 所有使用 `useParams()` 的组件：API 兼容，无需改动

**优化**:
- 删除 `useEffect(() => loadSectionContent)` 逻辑
- 数据从 loader 获取，hydrate 到页面

### Phase 6: 路由 Loader 实现（10）

#### 10. 在每个路由中配置 loader
**示例** (routes/chapters/$chapterId/$sectionId.tsx):
```typescript
import { createFileRoute } from '@tanstack/react-router'
import { loadSectionContent } from '../../utils/serverContentLoader'

export const Route = createFileRoute(
  '/chapter/$chapterId/section/$sectionId'
)({
  loader: async ({ params }) => {
    const content = await loadSectionContent(params.sectionId)
    return { content }
  },

  component: SectionDetail,

  // 可选：SSR 配置
  ssr: true, // 默认启用，预加载数据
})

function SectionDetail() {
  const { content } = useLoaderData()
  // ... 组件逻辑
}
```

**其他路由** (首页、章节列表) 可根据需要配置 loader

### Phase 7: 构建配置调整（11）

#### 11. 更新构建脚本
**package.json 脚本**:
```json
{
  "dev": "start dev",
  "build": "start build",
  "preview": "start preview",
  "type-check": "tsc --noEmit"
}
```

**调整**:
- `prebuild` 脚本保留（复制内容目录）
- TanStack Start CLI 自动处理 SSR 编译和 SSG 生成

**环境变量** (.env / .env.production):
```env
# GitHub Pages
VITE_BASE_PATH=/golang-bible-learning/

# 自有域名（如适用）
# VITE_BASE_PATH=/
```

### Phase 8: 测试与验证（12-13）

#### 12. 本地测试
- 运行 `pnpm dev` 验证开发环境
- 测试路由导航
- 验证内容加载和 hydration
- 测试深链接 (直接访问 /chapter/1/section/1.1)
- 验证 SSR HTML 中是否包含序列化的内容

#### 13. 构建和预览
- 运行 `pnpm build` 生成 SSG 静态文件
- 检查 dist/ 目录中是否生成了所有路由的 HTML
- 运行 `pnpm preview` 本地预览生产构建
- 验证 GitHub Pages 兼容性（basename 正确）

### Phase 9: 部署和迁移（14）

#### 14. GitHub Pages 部署
**部署流程**:
1. 环境变量配置: `VITE_BASE_PATH=/golang-bible-learning/`
2. 运行 `pnpm build`
3. 部署 `dist/` 到 GitHub Pages

**迁移检查清单**:
- 所有路由可正常访问
- 刷新页面内容正确（无 404）
- 主题切换功能正常
- 代码复制功能正常
- 响应式设计保留
- SEO 改进（静态 HTML）

## 关键文件清单

### 新增文件
- `src/entry.server.ts` - 服务端入口
- `src/entry.client.tsx` - 客户端入口
- `src/routes/__root.tsx` - 根路由布局
- `src/routes/index.tsx` - 首页
- `src/routes/chapters/index.tsx` - 章节列表
- `src/routes/chapters/$chapterId.tsx` - 章节详情
- `src/routes/chapters/$chapterId/$sectionId.tsx` - 小节详情
- `src/routes/router.ts` - 共享路由实例
- `src/utils/serverContentLoader.ts` - 服务端内容加载

### 修改文件
- `package.json` - 依赖替换
- `vite.config.ts` - TanStack Start 插件集成
- `src/pages/SectionDetail.tsx` - 改用 loader 数据
- `src/pages/ChapterList.tsx` - 改用 TanStack Router
- `src/components/SectionNav.tsx` - 路由 hooks 更新
- `tsconfig.json` - 可能需要调整（JSX 配置等）

### 删除文件
- `src/App.tsx` - 迁移到 `__root.tsx`
- `src/main.tsx` - 迁移到 `entry.client.tsx`

### 保留文件
- 所有 UI 组件 (Layout, MarkdownContent, SectionNav, SectionFooter)
- ThemeContext
- 工具函数 (除 contentLoader 外)
- 样式文件
- 数据文件 (chapters.ts)

## 改造优势

1. **SEO 改进**: 静态 HTML，搜索引擎友好
2. **性能优化**:
   - 预加载内容到 HTML，无 JS 加载延迟
   - 更小的初始 JS bundle
   - 内容在首屏直接可用
3. **用户体验**: 快速首屏渲染 (First Contentful Paint)
4. **可维护性**: 类型安全的路由，减少运行时错误
5. **部署灵活**: 支持多种部署方式（GitHub Pages、自有域名等）
6. **增量迁移**: 保持现有组件结构，平滑过渡

## 潜在风险与缓解

| 风险 | 缓解方案 |
|-----|--------|
| TanStack Start 学习曲线 | 参考官方文档，从简单路由开始 |
| Vite SSR 复杂性 | 使用 TanStack Start CLI，简化配置 |
| 内容更新流程变化 | Markdown 更新后需要重新构建部署 |
| 第三方库兼容性 | 测试现有依赖 (react-markdown, lucide-react) |
| GitHub Pages basename 复杂性 | 环境变量控制，已有方案 |

## 实施建议

1. **分阶段执行**: 按照 Phase 1-9 顺序进行
2. **频繁测试**: 每个 Phase 后验证功能
3. **保留回滚计划**: 使用 Git 分支，保持原分支可用
4. **文档更新**: 更新项目 README 和部署指南
5. **性能监控**: 建立 Core Web Vitals 监控，对比改造前后
