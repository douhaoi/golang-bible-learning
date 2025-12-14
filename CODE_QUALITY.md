# 代码质量工具使用指南

本项目使用 **Biome** - 新一代的 JavaScript/TypeScript 工具链，比 ESLint + Prettier 更快更简单。

## 🚀 为什么选择 Biome？

- ⚡ **极快** - 比 ESLint + Prettier 快 **10-100 倍**
- 🎯 **一体化** - 代码检查 + 格式化 + import 排序
- 🔧 **零配置** - 开箱即用，合理的默认设置
- 🛠️ **易迁移** - 兼容 ESLint/Prettier 配置

## 🛠️ 已配置的工具

### 1. **TypeScript**
- 严格类型检查
- 编译时错误检测

### 2. **Biome**
- 代码规范检查（Linting）
- 自动代码格式化（Formatting）
- Import 语句自动排序
- 潜在错误检测

## 📝 常用命令

### 开发时使用

```bash
# 启动开发服务器
pnpm dev

# 类型检查
pnpm run type-check

# Biome 检查（lint + format）
pnpm run check

# 自动修复所有问题
pnpm run check:fix

# 只做代码检查（lint）
pnpm run lint

# 自动修复 lint 问题
pnpm run lint:fix

# 只做格式化
pnpm run format

# 检查格式（不修改文件）
pnpm run format:check

# 完整验证（类型 + Biome）
pnpm run validate
```

### 提交前检查

```bash
# 推荐：提交前运行完整验证
pnpm run validate

# 如果有问题，自动修复
pnpm run check:fix
```

## 🔧 编辑器配置

### VS Code / Cursor

1. **安装扩展：**
   - Biome（biomejs.biome）
   - Tailwind CSS IntelliSense

2. **设置已自动配置在 `.vscode/settings.json`：**
   - ✅ 保存时自动格式化
   - ✅ 保存时自动修复问题
   - ✅ 保存时自动排序 imports
   - ✅ 使用 Biome 作为默认格式化工具

### 其他编辑器

Biome 支持通过 LSP 协议集成到各种编辑器：
- Neovim
- Sublime Text
- Zed
- 详见：https://biomejs.dev/guides/integrate-in-editor/

## 📋 代码风格规范

### 格式化规则

```json
{
  "indentStyle": "space",       // 使用空格缩进
  "indentWidth": 2,             // 缩进 2 空格
  "lineWidth": 100,             // 每行最大长度 100
  "quoteStyle": "single",       // 使用单引号
  "jsxQuoteStyle": "double",    // JSX 使用双引号
  "trailingComma": "es5",       // 尾随逗号（ES5）
  "semicolons": "always"        // 总是使用分号
}
```

### Linter 规则

- ✅ 推荐规则默认启用
- ❌ 未使用的变量会报错
- ⚠️ `any` 类型会警告
- ✅ React Hooks 规则检查
- ✅ 可访问性（a11y）检查

## 🚀 CI/CD 检查

GitHub Actions 会在部署前自动运行：

1. **类型检查** - `tsc --noEmit`
2. **Biome 检查** - `biome check`（包含 lint + format）
3. **构建测试** - `pnpm run build`

**只有所有检查通过才会部署！**

## 🎯 Biome vs ESLint + Prettier

| 特性 | Biome | ESLint + Prettier |
|-----|-------|-------------------|
| 速度 | ⚡⚡⚡ 极快 | 🐌 较慢 |
| 配置 | 📝 单个文件 | 📝📝 多个文件 |
| 功能 | Lint + Format + Organize Imports | 需要多个工具 |
| 安装大小 | ~20 MB | ~100+ MB |
| 启动时间 | <100ms | 1-2s |

## 🐛 常见问题

### 问题 1: Biome 报错 "command not found"

**解决：** 确保安装了依赖
```bash
pnpm install
```

### 问题 2: 保存时不自动格式化

**解决：**
1. 确保安装了 Biome 扩展（biomejs.biome）
2. 检查 `.vscode/settings.json` 是否正确
3. 重启编辑器

### 问题 3: 某些规则太严格

**解决：** 在 `biome.json` 中关闭特定规则
```json
{
  "linter": {
    "rules": {
      "suspicious": {
        "noExplicitAny": "off"  // 关闭 any 类型警告
      }
    }
  }
}
```

### 问题 4: 如何忽略特定文件？

**方式 1 - 配置文件：**
编辑 `biome.json`:
```json
{
  "files": {
    "ignore": [
      "src/legacy/**",
      "**/*.config.js"
    ]
  }
}
```

**方式 2 - 注释：**
```typescript
// biome-ignore lint/suspicious/noExplicitAny: legacy code
const data: any = {};
```

## 📚 最佳实践

### 1. 提交前检查

养成提交前运行 `pnpm run validate` 的习惯。

### 2. 使用编辑器自动修复

启用"保存时自动格式化"可以避免大部分问题。

### 3. 理解规则

遇到报错时，点击错误信息查看详细说明。

### 4. 使用 biome-ignore

对于少数合理的例外情况，使用注释忽略：
```typescript
// biome-ignore lint/style/useTemplate: 性能优化
const str = 'Hello ' + name;
```

### 5. 定期更新

Biome 发展迅速，定期更新以获取新功能和修复：
```bash
pnpm update @biomejs/biome
```

## 🔄 从 ESLint/Prettier 迁移

本项目已完成迁移！如果你需要了解迁移过程：

1. **删除旧工具：**
   ```bash
   pnpm remove eslint prettier eslint-config-prettier
   pnpm remove @typescript-eslint/eslint-plugin @typescript-eslint/parser
   pnpm remove eslint-plugin-react eslint-plugin-react-hooks
   ```

2. **安装 Biome：**
   ```bash
   pnpm add -D @biomejs/biome
   ```

3. **初始化配置：**
   ```bash
   pnpm biome init
   ```

4. **迁移配置：**
   - Biome 可以读取部分 ESLint/Prettier 配置
   - 手动调整 `biome.json` 以匹配你的偏好

## 📖 参考文档

- [Biome 官方文档](https://biomejs.dev/)
- [Biome vs Prettier](https://biomejs.dev/blog/biome-wins-prettier-challenge/)
- [Biome Rules 参考](https://biomejs.dev/linter/rules/)
- [编辑器集成指南](https://biomejs.dev/guides/integrate-in-editor/)

## 💡 命令速查

```bash
# 检查所有问题
pnpm run check

# 自动修复所有问题
pnpm run check:fix

# 只检查 lint
pnpm run lint

# 只格式化
pnpm run format

# 完整验证（type + biome）
pnpm run validate
```
