# 安装代码语法高亮依赖

代码语法高亮功能已集成，需要安装以下依赖：

## 安装命令

```bash
npm install react-syntax-highlighter @types/react-syntax-highlighter
```

或使用 pnpm：

```bash
pnpm install react-syntax-highlighter @types/react-syntax-highlighter
```

## 功能特性

安装完成后，代码块将具有以下功能：

1. **语法高亮** - 支持多种编程语言（Go、JavaScript、Python、Bash等）
2. **暗色主题** - 使用 VS Code Dark Plus 主题，与原网站风格一致
3. **复制功能** - 鼠标悬停在代码块上时显示复制按钮
4. **自动识别语言** - 根据代码块的语言标识符自动应用高亮

## 支持的语言

- Go (`go`)
- JavaScript (`javascript`, `js`)
- TypeScript (`typescript`, `ts`)
- Python (`python`, `py`)
- Bash (`bash`, `sh`)
- 以及其他常见编程语言

## 使用示例

在 Markdown 中使用代码块：

````markdown
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, 世界")
}
```
````

会自动渲染为带语法高亮的代码块。

