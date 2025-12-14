# Scripts 使用说明

本目录包含项目的各种脚本工具。

## 📥 内容爬虫

### crawler.js - 完整爬虫

爬取所有章节（1-14章）的内容。

**使用方法：**
```bash
pnpm run crawl
# 或
node scripts/crawler.js
```

**功能：**
- 从 [golang-china.github.io/gopl-zh](https://golang-china.github.io/gopl-zh) 爬取所有章节
- 自动将内容转换为 Markdown 格式
- 保存到对应的章节文件夹（`src/content/ch1/`, `src/content/ch2/`, ...）
- 文件命名格式：`ch1-01.md`, `ch1-02.md`, ...
- 生成索引文件 `index.json`

**输出示例：**
```
src/content/
├── ch1/
│   ├── ch1-01.md
│   ├── ch1-02.md
│   └── ...
├── ch2/
│   ├── ch2-01.md
│   └── ...
└── index.json
```

### crawl-ch14.js - 第14章爬虫

专门爬取第14章（附录）内容。

**使用方法：**
```bash
node scripts/crawl-ch14.js
```

**功能：**
- 爬取附录章节（14.1-14.4）
- 自动保存到 `src/content/ch14/` 目录
- 文件命名格式：`ch14-01.md`, `ch14-02.md`, ...

## 🖼️ 图片资源

图片资源需要手动从原仓库下载并放置到 `public/content/images/` 目录。

**原仓库图片地址：**
- https://github.com/gopl-zh/gopl-zh.github.com/tree/master/images

**图片路径格式：**
- Markdown 中: `![](../images/ch1-01.png)` 或 `![](images/ch1-01.png)`
- 实际位置: `public/content/images/ch1-01.png`
- 构建后: `dist/content/images/ch1-01.png`

## 📂 目录结构

爬虫和脚本遵循以下目录结构：

```
src/content/
├── ch1/                    # 第1章
│   ├── ch1-01.md          # 章节-小节（两位数）
│   ├── ch1-02.md
│   └── ...
├── ch2/                    # 第2章
│   ├── ch2-01.md
│   └── ...
├── images/                 # 图片资源
│   ├── ch1-01.png
│   ├── ch1-01.gif
│   └── ...
└── index.json             # 章节索引
```

## 🔧 配置

### 爬虫配置

在 `crawler.js` 中修改：

```javascript
const BASE_URL = 'https://golang-china.github.io/gopl-zh';
const OUTPUT_DIR = join(__dirname, '../src/content');
```

### 延迟设置

爬虫请求之间的延迟（避免请求过快）：

```javascript
await delay(500); // 500ms延迟
```

## ⚠️ 注意事项

1. **网络请求**：爬虫需要网络访问，请确保网络连接正常
2. **请求频率**：脚本已设置延迟，避免请求过快
3. **文件覆盖**：重新爬取会覆盖已存在的文件
4. **图片下载**：需要先爬取内容，再下载图片（图片引用在 Markdown 中）
5. **目录自动创建**：脚本会自动创建所需的章节文件夹

## 📝 开发流程

完整的内容获取流程：

```bash
# 1. 爬取所有章节内容
pnpm run crawl

# 2. 手动下载图片资源
# 从 https://github.com/gopl-zh/gopl-zh.github.com/tree/master/images
# 下载需要的图片到 public/content/images/ 目录

# 3. 启动开发服务器
pnpm dev
```

## 🆕 更新日志

### 2025-12-14
- ✅ 更新爬虫支持章节文件夹结构
- ✅ 文件命名格式从 `1-1.md` 改为 `ch1-01.md`
- ✅ 自动创建章节文件夹
- ✅ 移除自动图片下载脚本（改为手动下载）
- ✅ 输出目录调整为 `src/content/`

## 🐛 故障排查

### 爬虫失败

**问题**：爬取失败或超时

**解决**：
1. 检查网络连接
2. 增加超时时间（`timeout` 配置）
3. 检查目标网站是否可访问

### 文件保存失败

**问题**：无法写入文件

**解决**：
1. 检查目录权限
2. 确保磁盘空间充足
3. 检查文件路径是否正确

### 图片显示问题

**问题**：图片无法显示

**解决**：
1. 检查图片是否存在于 `public/content/images/` 目录
2. 确认图片路径格式正确（`../images/xxx.png`）

## 📚 相关文档

- [DEPLOY.md](../DEPLOY.md) - 部署文档
- [CODE_QUALITY.md](../CODE_QUALITY.md) - 代码质量文档
- [README.md](../README.md) - 项目说明
