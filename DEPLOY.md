# GitHub Pages 部署指南

本项目已配置自动部署到 GitHub Pages。

## 部署步骤

### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "配置 GitHub Pages 部署"
git push origin main
```

### 2. 在 GitHub 仓库中启用 Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** > **Pages**
3. 在 **Source** 下拉菜单中选择 **GitHub Actions**
4. 保存设置

### 3. 触发部署

部署会在以下情况自动触发：
- 推送到 `main` 分支
- 手动触发（在 Actions 页面点击 "Run workflow"）

### 4. 访问站点

部署完成后，你的站点将可以通过以下地址访问：
```
https://<你的用户名>.github.io/golang-bible-learning/
```

例如：
```
https://douhao.github.io/golang-bible-learning/
```

## 重要配置说明

### 修改仓库名称

如果你的仓库名称**不是** `golang-bible-learning`，需要修改以下文件：

1. **vite.config.ts**
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/你的仓库名/' : '/',
   ```

2. **src/main.tsx**
   ```typescript
   const basename = import.meta.env.MODE === 'production' ? '/你的仓库名/' : '/'
   ```

### 使用自定义域名

如果想使用自定义域名（如 `gobook.example.com`）：

1. 在 `public/` 目录下创建 `CNAME` 文件，内容为你的域名：
   ```
   gobook.example.com
   ```

2. 修改 `vite.config.ts`：
   ```typescript
   base: '/',  // 使用自定义域名时，base 设为 '/'
   ```

3. 修改 `src/main.tsx`：
   ```typescript
   const basename = '/'  // 使用自定义域名时，basename 设为 '/'
   ```

4. 在你的域名 DNS 设置中添加 CNAME 记录指向 `<你的用户名>.github.io`

## 本地测试生产构建

在推送前，可以本地测试生产构建：

```bash
# 构建
pnpm run build

# 预览构建结果
pnpm run preview
```

## 故障排查

### 部署失败

1. 检查 GitHub Actions 日志（仓库的 Actions 标签页）
2. 确保 Pages 设置为使用 GitHub Actions
3. 确保有足够的权限（Settings > Actions > General > Workflow permissions 选择 "Read and write permissions"）

### 页面 404

1. 确认 `base` 和 `basename` 配置正确
2. 检查 `public/.nojekyll` 文件存在
3. 等待几分钟让 GitHub Pages 完全部署

### 资源加载失败

1. 检查浏览器控制台的错误信息
2. 确认所有资源路径都是相对路径或使用了正确的 base
3. 检查 `contentLoader.ts` 中的路径是否需要调整

## 持续更新

每次推送到 `main` 分支，GitHub Actions 会自动重新构建和部署站点。

