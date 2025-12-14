#!/usr/bin/env node
/**
 * 从原仓库下载图片资源
 * 使用方法：node scripts/download-images.cjs
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/gopl-zh/gopl-zh.github.com/master/images/';
const IMAGES_DIR = path.join(projectRoot, 'src', 'content', 'images');

// 确保 images 目录存在
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log('✅ 创建目录: src/content/images/');
}

// 下载单个图片
function downloadImage(imageName) {
  return new Promise((resolve) => {
    const url = GITHUB_RAW_BASE + imageName;
    const filePath = path.join(IMAGES_DIR, imageName);

    // 如果文件已存在，跳过
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  跳过（已存在）: ${imageName}`);
      resolve();
      return;
    }

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(`❌ 下载失败: ${imageName} (${response.statusCode})`);
        resolve(); // 不阻断其他下载
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ 下载成功: ${imageName}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {});
        console.error(`❌ 写入失败: ${imageName}`, err.message);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`❌ 网络错误: ${imageName}`, err.message);
      resolve();
    });
  });
}

// 扫描所有 markdown 文件，提取图片引用
function extractImagesFromMarkdown() {
  const images = new Set();
  const contentDir = path.join(projectRoot, 'src', 'content');
  
  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.name.endsWith('.md')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          // 匹配 ![...](...) 格式的图片
          const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
          let match;
          
          while ((match = regex.exec(content)) !== null) {
            const imgPath = match[2];
            // 只处理相对路径的图片（包含 images/ 或 ../images/）
            if (imgPath.includes('images/') && !imgPath.startsWith('http')) {
              const imgName = imgPath.split('/').pop();
              if (imgName) {
                images.add(imgName);
              }
            }
          }
        } catch (error) {
          console.warn(`警告：无法读取文件 ${fullPath}`);
        }
      }
    }
  }
  
  scanDir(contentDir);
  return Array.from(images);
}

// 主函数
async function main() {
  console.log('🔍 扫描 markdown 文件中的图片引用...\n');
  
  const foundImages = extractImagesFromMarkdown();
  
  if (foundImages.length === 0) {
    console.log('ℹ️  未找到需要下载的图片引用');
    console.log('💡 提示：图片路径格式应为 ![](images/xxx.png) 或 ![](../images/xxx.png)');
    console.log('');
    console.log('📝 如果您刚刚完成了目录迁移，请先刷新开发服务器');
    console.log('   章节文件可能还在旧位置，需要等待迁移完成后再运行此脚本');
    return;
  }

  console.log(`📋 找到 ${foundImages.length} 个图片引用:\n`);
  foundImages.forEach(img => console.log(`   - ${img}`));
  console.log('');

  console.log('📥 开始下载图片...\n');
  
  // 批量下载，限制并发数
  const batchSize = 3;
  for (let i = 0; i < foundImages.length; i += batchSize) {
    const batch = foundImages.slice(i, i + batchSize);
    await Promise.all(batch.map(downloadImage));
  }

  console.log(`\n✨ 图片下载完成！保存在: src/content/images/`);
  console.log('');
  console.log('🎯 提示：刷新浏览器查看图片效果');
}

main().catch(console.error);

