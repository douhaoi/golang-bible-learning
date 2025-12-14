// 复制 content 目录到 public
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const srcContentDir = join(projectRoot, 'src', 'content');
const publicDir = join(projectRoot, 'public');
const publicContentDir = join(publicDir, 'content');

// 确保 public 目录存在
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// 复制 content 目录
try {
  cpSync(srcContentDir, publicContentDir, { recursive: true });
  console.log('✅ Content 目录已复制到 public/content');
} catch (error) {
  console.error('❌ 复制失败:', error);
  process.exit(1);
}

