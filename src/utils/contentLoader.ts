// 内容加载器 - 从Markdown文件加载内容

export interface SectionContent {
  sectionId: string;
  title: string;
  content: string;
}

function normalizeMarkdownContent(markdown: string): string {
  // 将相邻“纯图片段落”合并为同一个段落，便于页面把多张图片（如章节底部二维码）排成同一行。
  // 典型输入：
  // ![](a)
  //
  // ![](b)
  // 输出（去掉空行）：
  // ![](a)
  // ![](b)
  return markdown.replace(
    /(^!\[[^\]]*\]\([^)]+\)\s*)\n(?:[ \t]*\n)+(?=!\[[^\]]*\]\([^)]+\))/gm,
    '$1\n'
  );
}

// 动态导入Markdown内容
export async function loadSectionContent(sectionId: string): Promise<SectionContent | null> {
  // 将 sectionId 转换为文件名格式 (例如: 1.1 -> 1-1)
  const fileName = sectionId.replace(/\./g, '-');
  
  try {
    // 优先使用 fetch 加载（开发和生产环境都支持）
    const response = await fetch(`/src/content/${fileName}.md`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const content = await response.text();
    
    // 解析Markdown内容
    const lines = content.split('\n');
    const title = lines[0].replace(/^#+\s*/, '') || sectionId;
    const body = normalizeMarkdownContent(lines.slice(1).join('\n').trim());
    
    return {
      sectionId,
      title,
      content: body,
    };
  } catch (error) {
    // 如果fetch失败，尝试使用动态import（仅在文件存在时）
    try {
      // 使用动态 import，Vite 会在运行时处理
      const module = await import(/* @vite-ignore */ `../content/${fileName}.md?raw`);
      const content = module.default as string;
      
      const lines = content.split('\n');
      const title = lines[0].replace(/^#+\s*/, '') || sectionId;
      const body = normalizeMarkdownContent(lines.slice(1).join('\n').trim());
      
      return {
        sectionId,
        title,
        content: body,
      };
    } catch (importError) {
      // 文件不存在时静默失败
      console.warn(`无法加载内容 ${sectionId}（文件可能不存在，请先运行爬虫）`);
      return null;
    }
  }
}

// 加载索引文件
export async function loadContentIndex(): Promise<any> {
  try {
    // 使用 fetch 而不是 import，避免构建时解析错误
    const response = await fetch('/src/content/index.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // 文件不存在时静默失败
    console.warn('无法加载内容索引（文件可能不存在，请先运行爬虫）:', error);
    return null;
  }
}

