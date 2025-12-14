// 内容加载器 - 从Markdown文件加载内容

export interface SectionContent {
  sectionId: string;
  title: string;
  content: string;
}

function normalizeMarkdownContent(markdown: string): string {
  // 将相邻"纯图片段落"合并为同一个段落，便于页面把多张图片（如章节底部二维码）排成同一行。
  // 典型输入：
  // ![](a)
  //
  // ![](b)
  // 输出（去掉空行）：
  // ![](a)
  // ![](b)
  //
  // 策略：匹配"图片行 + 一个或多个空行 + 图片行"，把中间的空行都去掉
  // 循环替换直到没有更多可合并的（支持3张以上图片）
  let result = markdown;
  let prev: string;
  do {
    prev = result;
    result = result.replace(
      /(!\[[^\]]*\]\([^)]+\))\s*\n\s*\n+\s*(!\[[^\]]*\]\([^)]+\))/g,
      '$1\n$2'
    );
  } while (result !== prev);

  return result;
}

// 动态导入Markdown内容
export async function loadSectionContent(sectionId: string): Promise<SectionContent | null> {
  // 将 sectionId 转换为路径格式
  // 例如: 1.1 -> ch1/ch1-01.md
  const [chapterNum, sectionNum] = sectionId.split('.');
  const fileName = `ch${chapterNum}-${sectionNum.padStart(2, '0')}.md`;
  const filePath = `ch${chapterNum}/${fileName}`;

  // 开发环境：使用 Vite 的 import.meta.glob 预定义导入
  // 生产环境：使用 fetch（从 dist/content 加载）
  if (import.meta.env.DEV) {
    try {
      // Vite 要求 glob 模式必须是静态字符串
      // 所以我们预先定义所有可能的导入路径
      const contentModules = import.meta.glob('../content/ch*/*.md', {
        query: '?raw',
        import: 'default',
      });

      const modulePath = `../content/${filePath}`;
      const loadModule = contentModules[modulePath];

      if (!loadModule) {
        throw new Error(`Module not found: ${modulePath}`);
      }

      const content = (await loadModule()) as string;

      const lines = content.split('\n');
      const title = lines[0].replace(/^#+\s*/, '') || sectionId;
      const body = normalizeMarkdownContent(lines.slice(1).join('\n').trim());

      return {
        sectionId,
        title,
        content: body,
      };
    } catch (error) {
      console.warn(`无法加载内容 ${sectionId} (${filePath})`, error);
      return null;
    }
  }

  // 生产环境：使用 fetch 加载打包后的文件
  try {
    const basePath = import.meta.env.BASE_URL || '/';
    const response = await fetch(`${basePath}content/${filePath}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();

    const lines = content.split('\n');
    const title = lines[0].replace(/^#+\s*/, '') || sectionId;
    const body = normalizeMarkdownContent(lines.slice(1).join('\n').trim());

    return {
      sectionId,
      title,
      content: body,
    };
  } catch (error) {
    console.warn(`无法加载内容 ${sectionId}`, error);
    return null;
  }
}

// 加载索引文件（目前不使用，保留供将来扩展）
export async function loadContentIndex(): Promise<unknown> {
  // 开发环境：从 src/content 加载
  // 生产环境：从 dist/content 加载
  if (import.meta.env.DEV) {
    try {
      const module = await import('../content/index.json');
      return module.default;
    } catch (error) {
      console.warn('无法加载内容索引（文件可能不存在）:', error);
      return null;
    }
  }

  // 生产环境
  try {
    const basePath = import.meta.env.BASE_URL || '/';
    const response = await fetch(`${basePath}content/index.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('无法加载内容索引:', error);
    return null;
  }
}
