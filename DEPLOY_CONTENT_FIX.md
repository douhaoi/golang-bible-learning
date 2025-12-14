# 部署内容加载修复

## 🐛 问题

部署到 GitHub Pages 后，章节内容无法正确显示，提示"内容未找到"。

## 🔍 原因

在生产环境中，`src/content` 目录下的 markdown 文件不会被 Vite 打包到 `dist` 目录中，导致部署后无法通过 HTTP 访问这些文件。

## ✅ 解决方案

### 1. 内容文件管理

- **开发时**: 内容文件保留在 `src/content` 目录
- **构建时**: 自动复制到 `public/content` 目录
- **部署后**: 文件在 `dist/content` 目录，可通过 HTTP 访问

### 2. 实现方式

#### 创建复制脚本
`scripts/copy-content.js` - 在构建前自动复制 content 目录到 public

#### 更新 package.json
```json
{
  "scripts": {
    "prebuild": "node scripts/copy-content.js",
    "build": "tsc && vite build"
  }
}
```

`prebuild` 会在 `build` 之前自动运行。

#### 更新 GitHub Actions
在 CI/CD 中显式运行复制脚本：

```yaml
- name: Copy content files
  run: node scripts/copy-content.js

- name: Run type check
  run: pnpm run type-check
```

#### 更新 contentLoader.ts
修改文件路径从 `src/content/` 改为 `content/`：

```typescript
// 修改前
const response = await fetch(`${basePath}src/content/${fileName}.md`);

// 修改后
const response = await fetch(`${basePath}content/${fileName}.md`);
```

## 📂 目录结构

### 开发环境
```
golang-bible-learning/
├── src/
│   └── content/          # 原始内容文件
│       ├── 1-1.md
│       ├── 1-2.md
│       └── ...
└── public/
    └── .nojekyll
```

### 构建后
```
dist/
├── content/              # 从 public/content 复制
│   ├── 1-1.md
│   ├── 1-2.md
│   └── ...
├── assets/              # JS/CSS
└── index.html
```

## 🚀 使用方式

### 本地测试

```bash
# 运行复制脚本
node scripts/copy-content.js

# 构建并预览
pnpm run build
pnpm run preview
```

### 部署

直接推送到 GitHub，CI/CD 会自动处理：

```bash
git add .
git commit -m "修复部署后内容加载问题"
git push origin main
```

## 🔄 为什么不直接把 content 放在 public？

保持 content 在 `src/` 的好处：

1. **IDE 支持**: 更好的文件引用和搜索
2. **开发体验**: 与其他源代码一起管理
3. **类型安全**: 如果将来需要类型化 markdown frontmatter
4. **版本控制**: 更清晰的源码结构

自动复制脚本保证了开发和部署的一致性。

## ✅ 验证修复

部署成功后，访问：
```
https://<你的用户名>.github.io/golang-bible-learning/
```

选择任意章节，应该能正常显示内容了！

## 📝 相关文件

- `scripts/copy-content.js` - 内容复制脚本
- `src/utils/contentLoader.ts` - 内容加载器（已更新路径）
- `package.json` - 添加了 prebuild 脚本
- `.github/workflows/deploy.yml` - CI/CD 配置（已更新）

