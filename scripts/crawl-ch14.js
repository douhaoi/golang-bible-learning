import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import axios from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://golang-china.github.io/gopl-zh';
const OUTPUT_DIR = join(__dirname, '../src/content');

// 第14章URL映射
const chapter14Urls = {
  14.1: 'appendix/appendix-a-errata.html',
  14.2: 'appendix/appendix-b-author.html',
  14.3: 'appendix/appendix-c-cpoyright.html',
  14.4: 'appendix/appendix-d-translations.html',
};

// 延迟函数
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 抓取单个页面
async function fetchSection(sectionId, url) {
  try {
    console.log(`正在抓取: ${sectionId} - ${url}`);
    const fullUrl = `${BASE_URL}/${url}`;
    const response = await axios.get(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 30000,
    });

    const $ = cheerio.load(response.data);

    // 提取主要内容
    let content = '';

    const contentSelectors = [
      'article',
      '.content',
      '#content',
      'main',
      'body > div.container',
      'body > div',
    ];

    let mainContent = null;
    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0 && element.text().trim().length > 100) {
        mainContent = element.first();
        break;
      }
    }

    if (!mainContent) {
      mainContent = $('body');
    }

    mainContent.find('script, style, nav, header, footer, .nav, .sidebar, .toc').remove();

    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });

    turndownService.addRule('codeBlock', {
      filter: ['pre'],
      replacement: (content, node) => {
        const code = node.querySelector('code');
        const lang = code ? (code.className.match(/language-(\w+)/) || [])[1] : '';
        return `\n\`\`\`${lang || ''}\n${content}\n\`\`\`\n`;
      },
    });

    content = turndownService.turndown(mainContent.html() || mainContent.text());

    content = content
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\s+|\s+$/g, '')
      .trim();

    return {
      sectionId,
      title: $('title').text() || $('h1').first().text() || sectionId,
      content,
      url: fullUrl,
    };
  } catch (error) {
    console.error(`抓取失败 ${sectionId}:`, error.message);
    return {
      sectionId,
      title: sectionId,
      content: `# ${sectionId}\n\n抓取失败: ${error.message}`,
      url: `${BASE_URL}/${url}`,
      error: error.message,
    };
  }
}

// 保存内容到文件
async function saveContent(sectionId, data) {
  try {
    // 解析章节号和小节号 (例如: 14.1 -> chapter: 14, section: 01)
    const [chapterNum, sectionNum] = sectionId.split('.');
    const chapterDir = `ch${chapterNum}`;
    const sectionPadded = sectionNum.padStart(2, '0');
    const fileName = `ch${chapterNum}-${sectionPadded}.md`;

    // 创建章节文件夹
    const chapterPath = join(OUTPUT_DIR, chapterDir);
    await mkdir(chapterPath, { recursive: true });

    // 保存文件
    const filePath = join(chapterPath, fileName);
    await writeFile(filePath, `# ${data.title}\n\n${data.content}\n`, 'utf-8');
    console.log(`✓ 已保存: ${chapterDir}/${fileName}`);
  } catch (error) {
    console.error(`保存失败 ${sectionId}:`, error.message);
  }
}

// 主函数
async function main() {
  console.log('开始抓取第14章（附录）内容...\n');

  await mkdir(OUTPUT_DIR, { recursive: true });

  let successCount = 0;
  let failCount = 0;

  console.log('=== 第 14 章 ===');

  for (const [sectionId, url] of Object.entries(chapter14Urls)) {
    const data = await fetchSection(sectionId, url);

    if (data.error) {
      failCount++;
    } else {
      successCount++;
      await saveContent(sectionId, data);
    }

    await delay(500);
  }

  console.log('\n=== 抓取完成 ===');
  console.log(`成功: ${successCount}`);
  console.log(`失败: ${failCount}`);
}

main().catch(console.error);
