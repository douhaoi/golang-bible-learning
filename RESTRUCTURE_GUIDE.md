# 内容目录重构指南

## 🎯 目标

将平铺的内容文件重构为章节文件夹结构，匹配原仓库 [gopl-zh/gopl-zh.github.com](https://github.com/gopl-zh/gopl-zh.github.com) 的组织方式。

## 📂 目录结构变化

### 之前（平铺结构）
```
src/content/
├── 1-1.md
├── 1-2.md
├── 2-1.md
├── 2-2.md
└── index.json
```

### 之后（章节文件夹结构）
```
src/content/
├── ch1/
│   ├── ch1-01.md  (原 1-1.md)
│   ├── ch1-02.md  (原 1-2.md)
│   └── ...
├── ch2/
│   ├── ch2-01.md  (原 2-1.md)
│   ├── ch2-02.md  (原 2-2.md)
│   └── ...
├── images/
│   ├── ch1-1.png
│   ├── ch2-5.png
│   └── ...
└── index.json
```

## 🚀 执行迁移

### 方式一：自动化脚本（推荐）

```bash
cd /Users/douhao/code/workspace/golang-bible-learning

# 1. 执行目录重构
./scripts/migrate-to-chapter-folders.sh

# 2. 下载图片资源
node scripts/download-images.js

# 3. 清理旧文件（可选，建议先测试）
# rm src/content/[0-9]*.md

# 4. 本地测试
pnpm dev
```

### 方式二：Node.js 脚本

```bash
# 执行重构
node scripts/restructure-content.js

# 下载图片
node scripts/download-images.js
```

## 📝 已更新的文件

### 1. contentLoader.ts
路径解析逻辑已更新：

```typescript
// 旧: 1.1 → 1-1.md
// 新: 1.1 → ch1/ch1-01.md

const [chapterNum, sectionNum] = sectionId.split('.');
const filePath = `ch${chapterNum}/ch${chapterNum}-${sectionNum.padStart(2, '0')}.md`;
```

### 2. 环境适配
- **开发环境**: 从 `src/content/ch1/` 动态 import
- **生产环境**: 从 `dist/content/ch1/` fetch

## 🖼️ 图片资源处理

### 图片路径规则

原仓库中，图片路径格式为：
- 在 markdown 中: `![](../images/ch1-1.png)`
- 实际位置: `images/ch1-1.png`

我们的结构：
- 在 markdown 中: `![](../images/ch1-1.png)` 或 `![](images/ch1-1.png)`
- 实际位置: `src/content/images/ch1-1.png`
- 构建后: `dist/content/images/ch1-1.png`

### 下载图片

```bash
node scripts/download-images.js
```

脚本会：
1. 扫描所有 markdown 文件中的图片引用
2. 从原仓库下载缺失的图片到 `src/content/images/`
3. 跳过已存在的图片

## 🔄 copy-content.js 更新

构建脚本已自动处理新的目录结构：

```javascript
// 复制整个 src/content 到 public/content
// 包括所有章节文件夹和 images 目录
cpSync(srcContentDir, publicContentDir, { recursive: true });
```

## ✅ 验证迁移

### 本地开发测试

```bash
pnpm dev
```

访问任意章节，检查：
- ✅ 内容能正常加载
- ✅ 图片能正常显示
- ✅ 路径正确（浏览器控制台无 404）

### 生产构建测试

```bash
# 构建
pnpm run build

# 预览
pnpm run preview
```

访问 http://localhost:4173，检查：
- ✅ 内容能正常加载
- ✅ 图片能正常显示
- ✅ 路径包含正确的 base

## 🐛 故障排查

### 问题 1: 本地开发内容无法加载

**检查：**
```bash
ls -la src/content/ch1/
```

确保文件命名格式正确：`ch1-01.md`, `ch1-02.md`（两位数）

### 问题 2: 图片 404

**检查图片路径：**
1. markdown 中: `![](../images/xxx.png)` 或 `![](images/xxx.png)`
2. 文件存在: `src/content/images/xxx.png`

**下载缺失的图片：**
```bash
node scripts/download-images.js
```

### 问题 3: 构建后内容无法加载

**检查：**
```bash
ls -la dist/content/ch1/
ls -la dist/content/images/
```

确保 `copy-content.js` 正确复制了所有文件。

## 📚 文件命名规范

### Markdown 文件
```
章节 X.Y → chX/chX-0Y.md

示例:
1.1  → ch1/ch1-01.md
1.2  → ch1/ch1-02.md
1.10 → ch1/ch1-10.md
2.1  → ch2/ch2-01.md
```

### 图片文件
```
保持原仓库命名: ch1-1.png, ch2-5.png, etc.
位置: src/content/images/
```

## 🔗 引用路径

### markdown 中的图片引用

```markdown
<!-- 方式 1: 相对于当前章节文件夹 -->
![描述](../images/ch1-1.png)

<!-- 方式 2: 相对于 content 根目录（需要调整） -->
![描述](images/ch1-1.png)
```

## 📦 package.json 脚本

无需修改，`prebuild` 会自动处理：

```json
{
  "prebuild": "node scripts/copy-content.js"
}
```

## ⏭️ 下一步

1. ✅ 运行迁移脚本
2. ✅ 下载图片资源
3. ✅ 本地测试
4. ✅ 删除旧文件
5. ✅ 提交并推送

```bash
git add .
git commit -m "重构目录结构为章节文件夹 + 下载图片资源"
git push origin main
```

## 🎉 好处

1. **匹配原仓库结构** - 便于同步更新
2. **更好的组织** - 每个章节独立文件夹
3. **图片支持** - 完整的图片资源
4. **路径一致性** - 与原仓库保持一致

## 📖 参考

- 原仓库: https://github.com/gopl-zh/gopl-zh.github.com
- 图片目录: https://github.com/gopl-zh/gopl-zh.github.com/tree/master/images

