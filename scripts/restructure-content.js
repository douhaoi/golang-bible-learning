// 重构内容目录结构，匹配原仓库
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const contentDir = join(projectRoot, 'src', 'content');

// 读取所有现有的 markdown 文件
const files = readdirSync(contentDir).filter(f => f.endsWith('.md') && f !== 'index.json');

console.log(`📂 找到 ${files.length} 个内容文件`);

// 按章节分组
const chapterGroups = {};
files.forEach(file => {
  const match = file.match(/^(\d+)-(\d+)\.md$/);
  if (match) {
    const [, chapterNum, sectionNum] = match;
    const chapterKey = `ch${chapterNum}`;
    if (!chapterGroups[chapterKey]) {
      chapterGroups[chapterKey] = [];
    }
    chapterGroups[chapterKey].push({
      original: file,
      chapter: chapterNum,
      section: sectionNum,
      newName: `ch${chapterNum}-${sectionNum.padStart(2, '0')}.md`
    });
  }
});

console.log(`📊 章节统计：`, Object.keys(chapterGroups).map(k => `${k}: ${chapterGroups[k].length}个`).join(', '));

// 创建新的目录结构
Object.keys(chapterGroups).forEach(chapterKey => {
  const chapterPath = join(contentDir, chapterKey);
  if (!existsSync(chapterPath)) {
    mkdirSync(chapterPath, { recursive: true });
    console.log(`✅ 创建目录: ${chapterKey}/`);
  }

  // 复制文件到新位置
  chapterGroups[chapterKey].forEach(({ original, newName }) => {
    const srcPath = join(contentDir, original);
    const destPath = join(chapterPath, newName);
    
    try {
      const content = readFileSync(srcPath, 'utf-8');
      writeFileSync(destPath, content, 'utf-8');
      console.log(`  📄 ${original} → ${chapterKey}/${newName}`);
    } catch (error) {
      console.error(`  ❌ 复制失败: ${original}`, error.message);
    }
  });
});

// 处理 index.json
const indexPath = join(contentDir, 'index.json');
if (existsSync(indexPath)) {
  const indexDestPath = join(contentDir, 'index.json.backup');
  cpSync(indexPath, indexDestPath);
  console.log(`📦 已备份 index.json → index.json.backup`);
}

console.log(`\n✨ 目录重构完成！`);
console.log(`\n⚠️  注意：旧文件仍在根目录，请手动删除或运行清理脚本`);
console.log(`   需要更新 contentLoader.ts 以支持新的路径结构`);

