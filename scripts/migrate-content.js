// 将平铺的内容文件重构为章节文件夹结构
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const contentDir = join(projectRoot, 'src', 'content');

console.log('📂 开始重构目录结构...\n');

// 创建章节文件夹 ch1-ch14
for (let i = 1; i <= 14; i++) {
  const chapterPath = join(contentDir, `ch${i}`);
  if (!existsSync(chapterPath)) {
    mkdirSync(chapterPath, { recursive: true });
    console.log(`✅ 创建目录: ch${i}/`);
  }
}

// 创建 images 目录
const imagesPath = join(contentDir, 'images');
if (!existsSync(imagesPath)) {
  mkdirSync(imagesPath, { recursive: true });
  console.log(`✅ 创建目录: images/`);
}

console.log('');

// 读取所有文件
const files = readdirSync(contentDir).filter(f => {
  return f.match(/^(\d+)-(\d+)\.md$/) !== null;
});

console.log(`📄 找到 ${files.length} 个内容文件，开始迁移...\n`);

let successCount = 0;
let failCount = 0;

// 移动文件
files.forEach(file => {
  const match = file.match(/^(\d+)-(\d+)\.md$/);
  if (!match) return;

  const [, chapter, section] = match;
  const sectionPadded = section.padStart(2, '0');
  const newName = `ch${chapter}-${sectionPadded}.md`;
  const newPath = join(contentDir, `ch${chapter}`, newName);
  const oldPath = join(contentDir, file);

  try {
    const content = readFileSync(oldPath, 'utf-8');
    writeFileSync(newPath, content, 'utf-8');
    console.log(`  ✅ ${file} → ch${chapter}/${newName}`);
    successCount++;
  } catch (error) {
    console.error(`  ❌ 失败: ${file}`, error.message);
    failCount++;
  }
});

console.log('');
console.log(`✨ 迁移完成！`);
console.log(`   成功: ${successCount} 个`);
if (failCount > 0) {
  console.log(`   失败: ${failCount} 个`);
}

console.log('');
console.log('⚠️  注意事项：');
console.log('1. 旧文件已复制到新位置，原文件仍保留在根目录');
console.log('2. 测试无误后，可手动删除根目录下的旧文件（1-1.md, 1-2.md 等）');
console.log('3. 运行 `node scripts/download-images.js` 下载图片资源');
console.log('4. 运行 `pnpm dev` 测试本地加载');
console.log('');

