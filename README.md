# Go语言圣经 - 学习站点

一个基于 React + TypeScript + Vite 构建的现代化 Go 语言学习平台，内容来源于 [Go语言圣经中文版](https://golang-china.github.io/gopl-zh/index.html)。

## 功能特性

- 📚 **完整的章节结构** - 包含14个主要章节，涵盖Go语言从入门到高级的所有内容
- 🎨 **现代化UI设计** - Soft UI 设计风格，深色/浅色主题切换
- 💻 **增强语法高亮** - 支持 Go、Bash、JSON 等多种语言的语法高亮
- 🖼️ **灵活图片控制** - 支持多种图片尺寸（全宽、大、中、小）
- 🚀 **快速加载** - 基于 Vite 构建，提供极速的开发和生产体验
- 📱 **响应式设计** - 完美支持桌面端和移动端访问
- 🔍 **便捷导航** - 清晰的章节导航和前后章节切换功能
- 🕷️ **内容爬虫** - 自动抓取原网站内容并转换为Markdown格式

## 技术栈

- **React 18** - 现代化的前端框架
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 下一代前端构建工具
- **React Router** - 单页应用路由
- **Tailwind CSS** - 实用优先的CSS框架
- **Lucide React** - 精美的图标库
- **React Markdown** - Markdown渲染组件
- **Cheerio** - 服务器端HTML解析
- **Axios** - HTTP客户端

## 快速开始

### 安装依赖

```bash
pnpm install
```

或使用 npm:

```bash
npm install
```

### 抓取网站内容

在启动开发服务器之前，建议先运行爬虫脚本抓取网站内容：

```bash
pnpm run crawl
```

或使用 npm:

```bash
npm run crawl
```

爬虫会将内容保存到 `src/content/` 目录下，每个小节对应一个Markdown文件。

### 启动开发服务器

```bash
pnpm run dev
```

开发服务器将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
pnpm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
pnpm run preview
```

## 项目结构

```
.
├── src/
│   ├── components/          # 可复用组件
│   │   ├── Layout.tsx       # 布局组件
│   │   └── MarkdownContent.tsx  # Markdown渲染组件
│   ├── pages/               # 页面组件
│   │   ├── Home.tsx         # 首页
│   │   ├── ChapterList.tsx  # 章节列表
│   │   └── SectionDetail.tsx # 小节详情
│   ├── data/                # 数据文件
│   │   └── chapters.ts      # 章节数据结构
│   ├── utils/               # 工具函数
│   │   └── contentLoader.ts # 内容加载器
│   ├── content/             # 内容目录（章节文件夹结构）
│   │   ├── ch1/            # 第1章
│   │   │   ├── ch1-01.md
│   │   │   └── ...
│   │   ├── ch2/            # 第2章
│   │   ├── images/         # 图片资源
│   │   └── index.json      # 章节索引
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 应用入口
│   └── index.css            # 全局样式
├── scripts/
│   ├── crawler.js           # 完整爬虫脚本
│   ├── crawl-ch14.js        # 第14章爬虫
│   ├── copy-content.js      # 内容复制脚本
│   └── README.md            # 脚本使用说明
├── index.html               # HTML模板
├── package.json             # 项目配置
├── vite.config.ts           # Vite配置
├── tailwind.config.js       # Tailwind配置
├── MARKDOWN_GUIDE.md        # Markdown书写指南
└── DEPLOY.md                # 部署文档
```

## 章节内容

当前项目包含了完整的章节结构，包括：

1. 入门
2. 程序结构
3. 基础数据类型
4. 复合数据类型
5. 函数
6. 方法
7. 接口
8. Goroutines和Channels
9. 基于共享变量的并发
10. 包和工具
11. 测试
12. 反射
13. 底层编程
14. 附录

## 爬虫使用说明

爬虫脚本 (`scripts/crawler.js`) 会自动：

1. 访问 [Go语言圣经中文版](https://golang-china.github.io/gopl-zh/index.html) 网站
2. 抓取所有章节的内容
3. 将HTML转换为Markdown格式
4. 保存到 `src/content/` 目录

### 运行爬虫

```bash
pnpm run crawl
```

### 爬虫配置

爬虫脚本包含以下特性：

- **自动延迟** - 每次请求间隔500ms，避免对服务器造成压力
- **错误处理** - 自动处理网络错误和解析错误
- **内容清理** - 自动移除导航、脚本等无关内容
- **Markdown转换** - 使用 Turndown 将HTML转换为Markdown

### 内容格式

每个小节的内容会保存到对应章节文件夹中，文件名格式为：`ch{章节号}-{小节号}.md`

例如：
- `ch1/ch1-01.md` - 第1章第1节
- `ch2/ch2-03.md` - 第2章第3节
- `ch14/ch14-01.md` - 第14章第1节（附录）

## Markdown 书写指南

项目支持增强版 Markdown，包括：

### 图片尺寸控制

通过 alt 文本标记控制图片显示尺寸：

```markdown
![full-width](image.png)    # 100% 宽度（架构图、流程图）
![large](image.png)          # 80% 宽度（重要图表）
![medium](image.png)         # 600px（示例图）
![](image.png)               # 300px（默认，二维码等）
```

### 代码高亮

支持多种语言的语法高亮：

```markdown
​```go
package main
​```

​```bash
$ go run main.go
​```
```

完整的 Markdown 书写指南请查看 [MARKDOWN_GUIDE.md](./MARKDOWN_GUIDE.md)。

## 内容集成

内容加载器 (`src/utils/contentLoader.ts`) 会自动：

1. 根据小节ID查找对应的Markdown文件
2. 解析文件内容
3. 在页面中渲染Markdown

如果内容文件不存在，页面会显示提示信息，引导用户运行爬虫脚本。

## 参考资源

- [Go语言圣经中文版](https://golang-china.github.io/gopl-zh/index.html)
- [Go语言圣经 GitHub](https://github.com/gopl-zh)
- [原版官网](http://gopl.io)

## 许可证

本项目仅供学习交流使用，内容来源于 Go语言圣经中文版。

## 贡献

欢迎提交 Issue 和 Pull Request！
