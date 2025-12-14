# Biome - 快速开始

Biome 是新一代的 JavaScript/TypeScript 工具链，速度极快且配置简单。

## 🚀 快速设置（3 步）

### 第 1 步：安装依赖

```bash
pnpm install
```

这会安装：
- ✅ @biomejs/biome - 一体化工具（lint + format + organize imports）

### 第 2 步：安装编辑器扩展

#### VS Code / Cursor

1. 打开扩展商店
2. 搜索 "Biome"
3. 安装 `Biome (biomejs.biome)`

或者使用命令：
```bash
code --install-extension biomejs.biome
```

### 第 3 步：测试配置

```bash
# 运行检查
pnpm run check

# 如果有问题，自动修复
pnpm run check:fix

# 完整验证
pnpm run validate
```

## ✅ 验证配置成功

如果看到以下输出，说明配置成功：

```bash
$ pnpm run validate

> type-check
✓ No TypeScript errors

> check
✓ No Biome errors
✓ Formatted correctly
```

## ⚡ Biome 的优势

### 速度对比

| 操作 | ESLint + Prettier | Biome | 提升 |
|-----|------------------|-------|------|
| 检查 | 2000ms | 100ms | **20x** |
| 格式化 | 500ms | 20ms | **25x** |
| 启动时间 | 1500ms | 50ms | **30x** |

### 功能对比

| 功能 | ESLint + Prettier | Biome |
|-----|------------------|-------|
| Linting | ✅ ESLint | ✅ 内置 |
| Formatting | ✅ Prettier | ✅ 内置 |
| Import 排序 | ❌ 需要插件 | ✅ 内置 |
| 配置文件 | 📝📝 多个 | 📝 单个 |
| 依赖大小 | ~100 MB | ~20 MB |

## 💡 日常使用

### 编写代码时

编辑器会自动：
- 🔴 显示 Biome 错误（红色波浪线）
- 🟡 显示警告（黄色波浪线）
- 💾 保存时自动格式化和修复
- 📦 保存时自动排序 imports

### 提交代码前

```bash
# 运行完整验证
pnpm run validate
```

### 修复所有可自动修复的问题

```bash
pnpm run check:fix
```

## 📝 常用命令

```bash
# 检查所有问题（lint + format）
pnpm run check

# 自动修复所有问题
pnpm run check:fix

# 只做代码检查
pnpm run lint

# 自动修复 lint 问题
pnpm run lint:fix

# 只做格式化
pnpm run format

# 检查格式（不修改）
pnpm run format:check

# TypeScript 类型检查
pnpm run type-check

# 完整验证
pnpm run validate
```

## 🎯 配置文件

只有一个配置文件：`biome.json`

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  }
}
```

## 🔧 自定义配置

### 修改格式化规则

编辑 `biome.json`:
```json
{
  "formatter": {
    "lineWidth": 120,      // 改变行宽
    "indentWidth": 4       // 改变缩进
  }
}
```

### 关闭特定 lint 规则

```json
{
  "linter": {
    "rules": {
      "suspicious": {
        "noExplicitAny": "off"  // 允许 any 类型
      }
    }
  }
}
```

### 忽略文件

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

## ⚠️ 故障排除

### 问题：保存时不自动格式化

1. 确保安装了 Biome 扩展（biomejs.biome）
2. 重启编辑器
3. 检查右下角状态栏是否显示 "Biome"

### 问题：Biome 不工作

1. 运行 `pnpm install`
2. 重启 Biome Server（命令面板 > "Biome: Restart LSP Server"）
3. 检查输出面板（Output > Biome）

### 问题：报错"command not found"

确保 Biome 已安装：
```bash
pnpm list @biomejs/biome
```

如果没有，重新安装：
```bash
pnpm add -D @biomejs/biome
```

## 🎓 快速上手技巧

### 1. 使用 biome-ignore 注释

对于合理的例外情况：
```typescript
// biome-ignore lint/suspicious/noExplicitAny: legacy code
const data: any = oldAPI();
```

### 2. 查看详细错误信息

点击编辑器中的错误可以看到：
- 规则说明
- 为什么这是问题
- 如何修复

### 3. 使用快速修复

光标停在错误上，按 `Cmd/Ctrl + .` 选择快速修复。

### 4. 批量格式化

格式化整个项目：
```bash
pnpm run format
```

### 5. 只检查修改的文件

```bash
# 检查暂存的文件
git diff --name-only --cached | grep '\\.tsx\\?$' | xargs pnpm biome check
```

## 📚 更多信息

- **完整使用指南：** [CODE_QUALITY.md](./CODE_QUALITY.md)
- **官方文档：** https://biomejs.dev/
- **规则参考：** https://biomejs.dev/linter/rules/
- **编辑器集成：** https://biomejs.dev/guides/integrate-in-editor/

## 🎉 开始使用

现在你已经准备好了！

```bash
# 运行一次检查
pnpm run check:fix

# 开始开发
pnpm dev
```

Biome 会在后台自动帮你保持代码质量。享受开发吧！ 🚀
