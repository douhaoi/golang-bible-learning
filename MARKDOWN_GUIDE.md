# Markdown 书写指南

本项目使用增强版 Markdown，支持特殊的图片尺寸控制和代码高亮。

## 📐 图片尺寸控制

### 支持的尺寸标记

通过在图片的 `alt` 文本中添加特殊标记来控制图片显示尺寸：

#### 1. 全宽图片（100%）

适合需要完整展示的大图、架构图、流程图等。

**语法：**
```markdown
![full-width](../images/architecture.png)
![full](../images/diagram.png)
```

**效果：**
- 最大宽度：100%（占满容器）
- 适用场景：架构图、流程图、大型示意图

#### 2. 大尺寸图片（80%）

适合重要的插图。

**语法：**
```markdown
![large](../images/important-chart.png)
```

**效果：**
- 最大宽度：80%
- 适用场景：重要图表、关键示意图

#### 3. 中等尺寸图片（600px）

适合一般的示例图片。

**语法：**
```markdown
![medium](../images/example.png)
```

**效果：**
- 最大宽度：600px
- 适用场景：代码截图、一般示例图

#### 4. 小尺寸图片（300px，默认）

适合二维码、小图标等。

**语法：**
```markdown
![](../images/qr-code.png)
![small](../images/icon.png)
```

**效果：**
- 最大宽度：300px
- 适用场景：二维码、Logo、小图标
- **默认尺寸**：不添加任何标记时使用此尺寸

### 带描述的图片

尺寸标记可以与图片描述文字组合使用：

```markdown
![full-width 系统架构图](../images/architecture.png)
![large 重要流程](../images/flow.png)
![medium 代码示例](../images/code-example.png)
```

显示时会自动去除尺寸标记，只保留描述文字。

### 示例对比

```markdown
<!-- 默认小尺寸（300px） - 适合二维码 -->
![](../images/qr-code.png)

<!-- 中等尺寸（600px） - 适合示例图 -->
![medium 示例效果](../images/example.png)

<!-- 大尺寸（80%） - 适合重要图表 -->
![large 系统流程](../images/flow-chart.png)

<!-- 全宽（100%） - 适合架构图 -->
![full-width 完整架构](../images/architecture-full.png)
```

## 💻 代码块增强

### 支持的语言

项目已配置多种语言的语法高亮：

- **Go**: `go`, `golang`
- **Shell**: `bash`, `shell`, `sh`
- **JavaScript**: `javascript`, `js`
- **TypeScript**: `typescript`, `ts`
- **Python**: `python`, `py`
- **JSON**: `json`
- **Markdown**: `markdown`, `md`
- **Text**: `text`, `txt`（纯文本）

### 代码块示例

#### Go 代码

```markdown
​```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, 世界")
}
​```
```

#### Bash 命令

```markdown
​```bash
$ go run main.go
Hello, 世界
​```
```

#### 纯文本输出

```markdown
​```text
Hello, 世界
​```
```

### 代码块特性

- ✅ 自动语法高亮
- ✅ 语言标签显示（带图标）
- ✅ 一键复制按钮
- ✅ 深色/浅色主题适配
- ✅ Soft UI 卡片样式

## 📝 其他 Markdown 功能

### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 列表

```markdown
- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2
```

### 强调

```markdown
**粗体文字**
*斜体文字*
`行内代码`
```

### 链接

```markdown
[链接文字](https://example.com)
```

### 引用

```markdown
> 这是一段引用文字
```

### 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
```

## 🎨 样式特性

### 自动样式

所有内容都会自动应用 Soft UI 风格：

- **代码块**：柔和的内凹效果
- **图片**：圆角卡片 + 轻微凸起效果
- **行内代码**：柔和背景 + 轻微凸起
- **主题适配**：自动适应深色/浅色模式

### 图片排列

多张图片在同一段落中会自动横向排列（响应式）：

```markdown
![](../images/qr1.png)
![](../images/qr2.png)
```

在大屏幕上会并排显示，小屏幕上会自动换行。

## 📖 最佳实践

### 图片使用建议

1. **二维码、Logo** → 使用默认尺寸或 `[small]`
2. **代码截图** → 使用 `[medium]`
3. **流程图表** → 使用 `[large]`
4. **完整架构图** → 使用 `[full-width]`

### 代码块建议

1. 始终指定语言类型（便于高亮）
2. Go 代码使用 `go` 标记
3. Shell 命令使用 `bash` 标记
4. 输出结果使用 `text` 标记

### 文档结构建议

```markdown
# 章节标题

## 主要内容

文字说明...

​```go
// 示例代码
​```

![medium 效果演示](../images/demo.png)

## 要点总结

- 要点1
- 要点2

![](../images/qr-code.png)
```

## 🔍 图片路径规则

### 相对路径

从当前章节文件夹引用图片：

```markdown
<!-- 当前文件：src/content/ch1/ch1-01.md -->
![](../images/ch1-01.png)
```

路径解析：
- `../images/` → 返回上级目录，进入 images 文件夹
- 实际位置：`src/content/images/ch1-01.png`

### 图片命名规范

建议使用以下命名格式：

- 章节插图：`ch1-01.png`, `ch2-05.png`
- 通用资源：`logo.png`, `favicon.ico`
- 动图：`ch1-01.gif`

## 🚀 快速参考

```markdown
<!-- 图片尺寸 -->
![](image.png)              默认 300px
![small](image.png)         300px
![medium](image.png)        600px
![large](image.png)         80%
![full-width](image.png)    100%

<!-- 代码块 -->
​```go
Go 代码
​```

​```bash
Shell 命令
​```

​```text
纯文本输出
​```
```

## 📚 更多资源

- [Markdown 基础语法](https://www.markdownguide.org/basic-syntax/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [项目 README](./README.md)
- [部署文档](./DEPLOY.md)

