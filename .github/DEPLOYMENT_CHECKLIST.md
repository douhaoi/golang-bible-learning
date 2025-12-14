# GitHub Pages 部署检查清单

## ✅ 已完成的配置

- [x] GitHub Actions workflow (`.github/workflows/deploy.yml`)
- [x] Vite base 路径配置 (`vite.config.ts`)
- [x] React Router basename 配置 (`src/main.tsx`)
- [x] 资源加载路径修复 (`src/utils/contentLoader.ts`)
- [x] TypeScript 类型定义 (`src/vite-env.d.ts`)
- [x] `.nojekyll` 文件防止 Jekyll 处理

## 📝 部署前确认

### 1. 确认仓库名称

当前配置假设仓库名为 `golang-bible-learning`。如果不同，请修改：

- `vite.config.ts` 中的 `base` 配置
- `src/main.tsx` 中的 `basename` 配置

### 2. GitHub 仓库设置

推送代码后，需要在 GitHub 上进行以下设置：

1. 进入仓库的 **Settings** 标签
2. 点击左侧的 **Pages**
3. 在 **Source** 下选择 **GitHub Actions**

### 3. 权限设置（如果部署失败）

如果遇到权限错误，检查：

1. 仓库 **Settings** > **Actions** > **General**
2. **Workflow permissions** 选择 **Read and write permissions**
3. 勾选 **Allow GitHub Actions to create and approve pull requests**

## 🚀 部署流程

### 方式一：自动部署（推荐）

```bash
git add .
git commit -m "配置 GitHub Pages"
git push origin main
```

推送后，GitHub Actions 会自动构建和部署。

### 方式二：手动触发

1. 进入仓库的 **Actions** 标签
2. 点击左侧的 **Deploy to GitHub Pages**
3. 点击右上角的 **Run workflow**
4. 选择 `main` 分支
5. 点击 **Run workflow**

## 🔍 验证部署

### 查看部署状态

1. 进入仓库的 **Actions** 标签
2. 查看最新的 workflow 运行状态
3. 如果失败，点击查看详细日志

### 访问站点

部署成功后，访问：
```
https://<你的用户名>.github.io/golang-bible-learning/
```

## 🐛 常见问题

### 问题 1: 页面显示 404

**原因：** base 路径配置不正确

**解决：** 
1. 检查 `vite.config.ts` 中的 `base` 是否与仓库名匹配
2. 检查 `src/main.tsx` 中的 `basename` 是否一致

### 问题 2: 资源加载失败（CSS/JS 404）

**原因：** 静态资源路径不正确

**解决：**
1. 确保 `public/.nojekyll` 文件存在
2. 清除浏览器缓存
3. 检查浏览器控制台的错误信息

### 问题 3: 内容文件加载失败（markdown 404）

**原因：** contentLoader 中的路径不正确

**解决：**
1. 确认 `src/utils/contentLoader.ts` 使用了 `import.meta.env.BASE_URL`
2. 检查 `src/content/` 目录下的文件是否被正确打包到 `dist/` 中
3. 可能需要将 markdown 文件移到 `public/` 目录

### 问题 4: 部署 workflow 失败

**原因：** 权限不足或依赖安装失败

**解决：**
1. 检查 Actions 的详细日志
2. 确认 **Workflow permissions** 设置正确
3. 确认 `pnpm-lock.yaml` 已提交到仓库

## 📚 本地测试生产构建

在推送前测试：

```bash
# 构建
pnpm run build

# 预览（会在本地模拟生产环境）
pnpm run preview
```

注意：本地预览时路径可能与 GitHub Pages 不完全一致，以实际部署为准。

## 🌐 自定义域名（可选）

如果要使用自定义域名：

1. 在 `public/` 创建 `CNAME` 文件，内容为你的域名
2. 修改 `vite.config.ts` 和 `src/main.tsx` 中的路径配置为 `/`
3. 在域名 DNS 设置中添加 CNAME 记录

详见 `DEPLOY.md`。

