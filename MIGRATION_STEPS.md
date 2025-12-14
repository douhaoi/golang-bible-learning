# 目录重构迁移步骤

由于terminal命令执行遇到问题，请手动执行以下步骤完成重构：

## 方法1: 使用 Node.js（推荐）

在**新终端窗口**中（不要打断 `pnpm dev`），运行：

```bash
cd /Users/douhao/code/workspace/golang-bible-learning

# 使用 Node.js 创建目录并复制文件
node << 'SCRIPT'
const fs = require('fs');
const path = require('path');

const contentDir = './src/content';

// 创建章节文件夹
for (let i = 1; i <= 14; i++) {
  const dir = path.join(contentDir, `ch${i}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 创建 images 目录
const imagesDir = path.join(contentDir, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('✅ 目录创建完成\n');

// 复制文件
const files = fs.readdirSync(contentDir).filter(f => /^\d+-\d+\.md$/.test(f));
let count = 0;

files.forEach(file => {
  const [, chapter, section] = file.match(/^(\d+)-(\d+)\.md$/) || [];
  if (!chapter || !section) return;
  
  const newName = `ch${chapter}-${section.padStart(2, '0')}.md`;
  const oldPath = path.join(contentDir, file);
  const newPath = path.join(contentDir, `ch${chapter}`, newName);
  
  fs.copyFileSync(oldPath, newPath);
  console.log(`  ${file} → ch${chapter}/${newName}`);
  count++;
});

console.log(`\n✨ 完成！复制了 ${count} 个文件`);
SCRIPT
```

## 方法2: 使用 Python

如果 Node.js 方法不行，试试 Python：

```bash
cd /Users/douhao/code/workspace/golang-bible-learning

python3 << 'SCRIPT'
import os
import shutil

content_dir = 'src/content'

# 创建章节文件夹
for i in range(1, 15):
    ch_dir = os.path.join(content_dir, f'ch{i}')
    os.makedirs(ch_dir, exist_ok=True)

os.makedirs(os.path.join(content_dir, 'images'), exist_ok=True)
print('✅ 目录创建完成\n')

# 复制文件
files = [f for f in os.listdir(content_dir) if f.endswith('.md') and '-' in f and f[0].isdigit()]
count = 0

for file in sorted(files):
    parts = file[:-3].split('-')
    if len(parts) == 2:
        chapter, section = parts
        new_name = f'ch{chapter}-{section.zfill(2)}.md'
        old_path = os.path.join(content_dir, file)
        new_path = os.path.join(content_dir, f'ch{chapter}', new_name)
        shutil.copy2(old_path, new_path)
        print(f'  {file} → ch{chapter}/{new_name}')
        count += 1

print(f'\n✨ 完成！复制了 {count} 个文件')
SCRIPT
```

## 方法3: 手动操作（Finder）

如果上述方法都不行，可以手动操作：

1. 在 `src/content/` 创建文件夹：
   - ch1, ch2, ch3, ..., ch14
   - images

2. 复制文件（示例）：
   - `1-1.md` 复制到 `ch1/ch1-01.md`
   - `1-2.md` 复制到 `ch1/ch1-02.md`
   - `2-1.md` 复制到 `ch2/ch2-01.md`
   - 依此类推...

## 下一步

迁移完成后：

1. **测试本地加载**
   ```bash
   # 访问 http://localhost:3000（dev 服务器应该还在运行）
   # 检查任意章节是否能正常加载
   ```

2. **下载图片资源**
   ```bash
   node scripts/download-images.js
   ```

3. **清理旧文件**（测试无误后）
   ```bash
   # 删除根目录下的旧文件
   cd src/content
   rm [0-9]*.md
   ```

4. **提交更改**
   ```bash
   git add .
   git commit -m "重构目录结构为章节文件夹"
   git push origin main
   ```

## 验证

检查目录结构：

```bash
ls -la src/content/ch1/
# 应该看到: ch1-01.md, ch1-02.md, ...

ls -la src/content/images/
# 下载图片后应该看到图片文件
```

## 遇到问题？

- **本地开发无法加载内容**：检查文件名格式是否正确（ch1-01.md, 两位数）
- **图片404**：先完成目录迁移，再运行 `node scripts/download-images.js`
- **路径错误**：确认 contentLoader.ts 已更新（应该已自动更新）

