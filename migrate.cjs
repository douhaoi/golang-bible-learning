#!/usr/bin/env node
/**
 * 目录重构脚本：将平铺的内容文件移动到章节文件夹
 * 使用方法：node migrate.cjs
 */

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'src', 'content');

console.log('📂 开始重构目录结构...\n');

// 创建章节文件夹 ch1-ch14
for (let i = 1; i <= 14; i++) {
  const chapterPath = path.join(contentDir, `ch${i}`);
  if (!fs.existsSync(chapterPath)) {
    fs.mkdirSync(chapterPath, { recursive: true });
    console.log(`✅ 创建目录: ch${i}/`);
  } else {
    console.log(`⏭️  目录已存在: ch${i}/`);
  }
}

// 创建 images 目录
const imagesPath = path.join(contentDir, 'images');
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
  console.log(`✅ 创建目录: images/`);
} else {
  console.log(`⏭️  目录已存在: images/`);
}

console.log('\n📄 复制文件到章节文件夹...\n');

// 读取所有文件
const files = fs.readdirSync(contentDir)
  .filter(f => /^[0-9]+-[0-9]+\.md$/.test(f))
  .sort();

let successCount = 0;
let skipCount = 0;

// 复制文件
files.forEach(file => {
  const match = file.match(/^(\d+)-(\d+)\.md$/);
  if (!match) return;

  const [, chapter, section] = match;
  
  // 格式化为两位数
  const sectionPadded = section.padStart(2, '0');
  const newName = `ch${chapter}-${sectionPadded}.md`;
  const newPath = path.join(contentDir, `ch${chapter}`, newName);
  const oldPath = path.join(contentDir, file);

  try {
    // 检查目标文件是否已存在
    if (fs.existsSync(newPath)) {
      console.log(`  ⏭️  跳过（已存在）: ${file} → ch${chapter}/${newName}`);
      skipCount++;
    } else {
      fs.copyFileSync(oldPath, newPath);
      console.log(`  ✅ ${file} → ch${chapter}/${newName}`);
      successCount++;
    }
  } catch (error) {
    console.error(`  ❌ 失败: ${file}`, error.message);
  }
});

console.log('\n✨ 迁移完成！');
console.log(`   成功: ${successCount} 个`);
if (skipCount > 0) {
  console.log(`   跳过: ${skipCount} 个`);
}

console.log('\n🎯 下一步：');
console.log('1. 刷新浏览器（http://localhost:3000），检查内容是否能正常加载');
console.log('2. 如果正常，可以删除旧文件：');
console.log('   cd src/content && rm [0-9]*-[0-9]*.md');
console.log('3. 下载图片资源：');
console.log('   node scripts/download-images.js');
console.log('4. 提交更改：');
console.log('   git add . && git commit -m "重构目录结构为章节文件夹"');
console.log('');

