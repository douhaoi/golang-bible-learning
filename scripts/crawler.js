import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import TurndownService from 'turndown';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://golang-china.github.io/gopl-zh';
const OUTPUT_DIR = join(__dirname, '../src/content');

// 章节URL映射
const chapterUrlMap = {
  '1': {
    '1.1': 'ch1/ch1-01.html',
    '1.2': 'ch1/ch1-02.html',
    '1.3': 'ch1/ch1-03.html',
    '1.4': 'ch1/ch1-04.html',
    '1.5': 'ch1/ch1-05.html',
    '1.6': 'ch1/ch1-06.html',
    '1.7': 'ch1/ch1-07.html',
    '1.8': 'ch1/ch1-08.html',
  },
  '2': {
    '2.1': 'ch2/ch2-01.html',
    '2.2': 'ch2/ch2-02.html',
    '2.3': 'ch2/ch2-03.html',
    '2.4': 'ch2/ch2-04.html',
    '2.5': 'ch2/ch2-05.html',
    '2.6': 'ch2/ch2-06.html',
    '2.7': 'ch2/ch2-07.html',
  },
  '3': {
    '3.1': 'ch3/ch3-01.html',
    '3.2': 'ch3/ch3-02.html',
    '3.3': 'ch3/ch3-03.html',
    '3.4': 'ch3/ch3-04.html',
    '3.5': 'ch3/ch3-05.html',
    '3.6': 'ch3/ch3-06.html',
  },
  '4': {
    '4.1': 'ch4/ch4-01.html',
    '4.2': 'ch4/ch4-02.html',
    '4.3': 'ch4/ch4-03.html',
    '4.4': 'ch4/ch4-04.html',
    '4.5': 'ch4/ch4-05.html',
    '4.6': 'ch4/ch4-06.html',
  },
  '5': {
    '5.1': 'ch5/ch5-01.html',
    '5.2': 'ch5/ch5-02.html',
    '5.3': 'ch5/ch5-03.html',
    '5.4': 'ch5/ch5-04.html',
    '5.5': 'ch5/ch5-05.html',
    '5.6': 'ch5/ch5-06.html',
    '5.7': 'ch5/ch5-07.html',
    '5.8': 'ch5/ch5-08.html',
    '5.9': 'ch5/ch5-09.html',
    '5.10': 'ch5/ch5-10.html',
  },
  '6': {
    '6.1': 'ch6/ch6-01.html',
    '6.2': 'ch6/ch6-02.html',
    '6.3': 'ch6/ch6-03.html',
    '6.4': 'ch6/ch6-04.html',
    '6.5': 'ch6/ch6-05.html',
    '6.6': 'ch6/ch6-06.html',
  },
  '7': {
    '7.1': 'ch7/ch7-01.html',
    '7.2': 'ch7/ch7-02.html',
    '7.3': 'ch7/ch7-03.html',
    '7.4': 'ch7/ch7-04.html',
    '7.5': 'ch7/ch7-05.html',
    '7.6': 'ch7/ch7-06.html',
    '7.7': 'ch7/ch7-07.html',
    '7.8': 'ch7/ch7-08.html',
    '7.9': 'ch7/ch7-09.html',
    '7.10': 'ch7/ch7-10.html',
    '7.11': 'ch7/ch7-11.html',
    '7.12': 'ch7/ch7-12.html',
    '7.13': 'ch7/ch7-13.html',
    '7.14': 'ch7/ch7-14.html',
    '7.15': 'ch7/ch7-15.html',
  },
  '8': {
    '8.1': 'ch8/ch8-01.html',
    '8.2': 'ch8/ch8-02.html',
    '8.3': 'ch8/ch8-03.html',
    '8.4': 'ch8/ch8-04.html',
    '8.5': 'ch8/ch8-05.html',
    '8.6': 'ch8/ch8-06.html',
    '8.7': 'ch8/ch8-07.html',
    '8.8': 'ch8/ch8-08.html',
    '8.9': 'ch8/ch8-09.html',
    '8.10': 'ch8/ch8-10.html',
  },
  '9': {
    '9.1': 'ch9/ch9-01.html',
    '9.2': 'ch9/ch9-02.html',
    '9.3': 'ch9/ch9-03.html',
    '9.4': 'ch9/ch9-04.html',
    '9.5': 'ch9/ch9-05.html',
    '9.6': 'ch9/ch9-06.html',
    '9.7': 'ch9/ch9-07.html',
    '9.8': 'ch9/ch9-08.html',
  },
  '10': {
    '10.1': 'ch10/ch10-01.html',
    '10.2': 'ch10/ch10-02.html',
    '10.3': 'ch10/ch10-03.html',
    '10.4': 'ch10/ch10-04.html',
    '10.5': 'ch10/ch10-05.html',
    '10.6': 'ch10/ch10-06.html',
    '10.7': 'ch10/ch10-07.html',
  },
  '11': {
    '11.1': 'ch11/ch11-01.html',
    '11.2': 'ch11/ch11-02.html',
    '11.3': 'ch11/ch11-03.html',
    '11.4': 'ch11/ch11-04.html',
    '11.5': 'ch11/ch11-05.html',
    '11.6': 'ch11/ch11-06.html',
  },
  '12': {
    '12.1': 'ch12/ch12-01.html',
    '12.2': 'ch12/ch12-02.html',
    '12.3': 'ch12/ch12-03.html',
    '12.4': 'ch12/ch12-04.html',
    '12.5': 'ch12/ch12-05.html',
    '12.6': 'ch12/ch12-06.html',
    '12.7': 'ch12/ch12-07.html',
    '12.8': 'ch12/ch12-08.html',
    '12.9': 'ch12/ch12-09.html',
  },
  '13': {
    '13.1': 'ch13/ch13-01.html',
    '13.2': 'ch13/ch13-02.html',
    '13.3': 'ch13/ch13-03.html',
    '13.4': 'ch13/ch13-04.html',
    '13.5': 'ch13/ch13-05.html',
  },
  '14': {
    '14.1': 'appendix/appendix-a-errata.html',
    '14.2': 'appendix/appendix-b-author.html',
    '14.3': 'appendix/appendix-c-cpoyright.html',
    '14.4': 'appendix/appendix-d-translations.html',
  },
};

// 延迟函数，避免请求过快
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    
    // 尝试不同的选择器来找到主要内容
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

    // 如果没找到，使用body
    if (!mainContent) {
      mainContent = $('body');
    }

    // 移除不需要的元素
    mainContent.find('script, style, nav, header, footer, .nav, .sidebar, .toc').remove();
    
    // 转换HTML为Markdown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });

    // 自定义规则：保留代码块
    turndownService.addRule('codeBlock', {
      filter: ['pre'],
      replacement: function (content, node) {
        const code = node.querySelector('code');
        const lang = code ? (code.className.match(/language-(\w+)/) || [])[1] : '';
        return `\n\`\`\`${lang || ''}\n${content}\n\`\`\`\n`;
      },
    });

    content = turndownService.turndown(mainContent.html() || mainContent.text());

    // 清理内容
    content = content
      .replace(/\n{3,}/g, '\n\n') // 移除多余空行
      .replace(/^\s+|\s+$/g, '') // 移除首尾空白
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
    // 解析章节号和小节号 (例如: 1.1 -> chapter: 1, section: 01)
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
  console.log('开始抓取 Go语言圣经 内容...\n');

  // 创建输出目录
  try {
    await mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    // 目录可能已存在
  }

  const allSections = [];
  let successCount = 0;
  let failCount = 0;

  // 遍历所有章节
  for (const [chapterId, sections] of Object.entries(chapterUrlMap)) {
    console.log(`\n=== 第 ${chapterId} 章 ===`);
    
    for (const [sectionId, url] of Object.entries(sections)) {
      const data = await fetchSection(sectionId, url);
      allSections.push(data);
      
      if (data.error) {
        failCount++;
      } else {
        successCount++;
        await saveContent(sectionId, data);
      }

      // 延迟，避免请求过快
      await delay(500);
    }
  }

  // 保存索引文件
  const indexData = {
    total: allSections.length,
    success: successCount,
    failed: failCount,
    sections: allSections.map(s => ({
      id: s.sectionId,
      title: s.title,
      url: s.url,
      hasError: !!s.error,
    })),
  };

  await writeFile(
    join(OUTPUT_DIR, 'index.json'),
    JSON.stringify(indexData, null, 2),
    'utf-8'
  );

  console.log('\n=== 抓取完成 ===');
  console.log(`总计: ${allSections.length}`);
  console.log(`成功: ${successCount}`);
  console.log(`失败: ${failCount}`);
}

// 运行
main().catch(console.error);

