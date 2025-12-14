# 组件使用指南

本项目包含一些可复用的组件，用于构建统一的用户界面。

## 📦 组件列表

### SectionNav - 章节导航侧边栏

**位置**: `src/components/SectionNav.tsx`

**功能**: 在左侧显示当前章节的所有小节，支持快速切换。

**特性**:
- ✅ 固定在左侧（桌面端）
- ✅ 可折叠菜单（移动端）
- ✅ 当前小节高亮显示
- ✅ 悬停效果
- ✅ 响应式设计
- ✅ Soft UI 样式
- ✅ 平滑过渡动画

**响应式行为**:
- **桌面端（≥1024px）**: 固定显示在左侧
- **移动端（<1024px）**: 可通过左上角按钮展开/收起

**使用示例**:

```tsx
import SectionNav from '../components/SectionNav';

<SectionNav 
  chapter={chapter} 
  currentSectionId={sectionId} 
/>
```

**Props**:

```typescript
interface SectionNavProps {
  chapter: Chapter;       // 当前章节对象
  currentSectionId: string; // 当前小节 ID
}
```

---

### SectionFooter - 章节底部组件

**位置**: `src/components/SectionFooter.tsx`

**功能**: 自动在每个章节底部显示二维码和版权信息。

**使用场景**:
- 已集成到 `SectionDetail.tsx` 中
- 自动在每个小节内容后显示
- 无需手动添加到 Markdown 文件中

**显示内容**:
1. 分割线
2. 两个二维码图片（CSS 公众号、CCH 公众号）
3. 版权信息

**特性**:
- ✅ 响应式布局 - 大屏并排，小屏堆叠
- ✅ 悬停效果 - 图片放大
- ✅ 外部链接 - 点击跳转到原作者网站
- ✅ Soft UI 样式 - 与整体设计一致
- ✅ 懒加载 - 优化性能

**代码示例**:

```tsx
import SectionFooter from '../components/SectionFooter';

// 在页面组件中使用
<MarkdownContent content={content} />
<SectionFooter />
```

**自定义**:

如果需要修改二维码或样式，编辑 `src/components/SectionFooter.tsx`:

```tsx
// 修改二维码链接
src="https://your-image-url.com/qrcode.png"

// 修改最大宽度
style={{ maxWidth: '300px', ... }}

// 修改版权信息
<p>您的版权信息</p>
```

---

### MarkdownContent - Markdown 渲染组件

**位置**: `src/components/MarkdownContent.tsx`

**功能**: 渲染 Markdown 内容，支持代码高亮和图片尺寸控制。

**特性**:
- ✅ 语法高亮 - Go, Bash, JSON, TypeScript 等
- ✅ 图片尺寸控制 - 支持 full-width, large, medium, small
- ✅ 代码复制按钮
- ✅ Soft UI 样式
- ✅ 深色/浅色主题

**使用示例**:

```tsx
import MarkdownContent from '../components/MarkdownContent';

<MarkdownContent content={markdownString} />
```

---

### Layout - 布局组件

**位置**: `src/components/Layout.tsx`

**功能**: 提供统一的页面布局和导航。

**特性**:
- ✅ 顶部导航栏
- ✅ 主题切换按钮
- ✅ 响应式设计
- ✅ Soft UI 样式

---

## 🎨 样式系统

### Soft UI 类

项目使用 Soft UI 设计系统，提供以下 CSS 类：

```css
.soft-raised    /* 凸起效果 */
.soft-inset     /* 凹陷效果 */
.soft-card      /* 卡片效果 */
.soft-button    /* 按钮效果 */
.code-block-soft /* 代码块效果 */
```

### 主题变量

```css
var(--bg-primary)      /* 主背景色 */
var(--bg-secondary)    /* 次背景色 */
var(--text-primary)    /* 主文字色 */
var(--text-secondary)  /* 次文字色 */
var(--accent)          /* 强调色 */
var(--shadow-light)    /* 浅色阴影 */
var(--shadow-dark)     /* 深色阴影 */
```

---

## 📝 最佳实践

### 1. 组件复用

优先使用现有组件，避免重复造轮子：

```tsx
// ✅ 好的做法
import SectionFooter from '../components/SectionFooter';
<SectionFooter />

// ❌ 避免
// 在每个页面重复写相同的底部代码
```

### 2. 样式一致性

使用统一的样式类和变量：

```tsx
// ✅ 好的做法
<div className="soft-card">
  <p style={{ color: 'var(--text-primary)' }}>内容</p>
</div>

// ❌ 避免
<div style={{ background: '#f5f5f5' }}>
  <p style={{ color: '#333' }}>内容</p>
</div>
```

### 3. 响应式设计

使用 Tailwind 的响应式类：

```tsx
// ✅ 好的做法
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// ❌ 避免
<div style={{ display: 'flex', flexDirection: 'column' }}>
```

---

## 🔧 开发新组件

### 基本模板

```tsx
/**
 * 组件名 - 组件描述
 */
export default function ComponentName() {
  return (
    <div className="soft-card p-6">
      {/* 组件内容 */}
    </div>
  );
}
```

### 组件规范

1. **命名**: 使用 PascalCase，组件名称要有意义
2. **文档**: 添加 JSDoc 注释说明用途
3. **Props**: 使用 TypeScript 定义 props 类型
4. **样式**: 优先使用 Tailwind CSS 和 Soft UI 类
5. **可访问性**: 添加适当的 ARIA 属性
6. **性能**: 使用 `useMemo`, `useCallback` 优化

### 示例

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

/**
 * Soft UI 按钮组件
 */
export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="soft-button px-6 py-3 rounded-lg transition-all"
      style={{ color: variant === 'primary' ? 'var(--accent)' : 'var(--text-primary)' }}
    >
      {label}
    </button>
  );
}
```

---

## 📚 相关文档

- [Markdown 书写指南](./MARKDOWN_GUIDE.md)
- [代码质量文档](./CODE_QUALITY.md)
- [部署文档](./DEPLOY.md)
- [项目说明](./README.md)

---

## 🆕 更新日志

### 2025-12-14
- ✅ 创建 `SectionFooter` 组件
- ✅ 集成到 `SectionDetail` 页面
- ✅ 自动在每个章节底部显示二维码
- ✅ 移除 Markdown 文件中的手动二维码
- ✅ 创建 `SectionNav` 左侧导航组件
- ✅ 支持章节内快速切换
- ✅ 响应式设计，移动端可折叠

