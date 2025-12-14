// @ts-ignore - Node APIs are only available on server
import { existsSync, readFileSync } from 'fs'
// @ts-ignore - Node APIs are only available on server
import { join } from 'path'

export interface SectionContent {
  sectionId: string
  title: string
  content: string
}

function normalizeMarkdownContent(markdown: string): string {
  let result = markdown
  let prev: string
  do {
    prev = result
    result = result.replace(
      /(!\[[^\]]*\]\([^)]+\))\s*\n\s*\n+\s*(!\[[^\]]*\]\([^)]+\))/g,
      '$1\n$2'
    )
  } while (result !== prev)

  return result
}

export async function loadSectionContent(sectionId: string): Promise<SectionContent | null> {
  try {
    // 在服务端，直接从文件系统读取
    const [chapterNum, sectionNum] = sectionId.split('.')
    const fileName = `ch${chapterNum}-${sectionNum.padStart(2, '0')}.md`
    const filePath = join(process.cwd(), 'src', 'content', `ch${chapterNum}`, fileName)

    if (!existsSync(filePath)) {
      console.warn(`Content file not found: ${filePath}`)
      return null
    }

    const content = readFileSync(filePath, 'utf-8')

    const lines = content.split('\n')
    const title = lines[0].replace(/^#+\s*/, '') || sectionId
    const body = normalizeMarkdownContent(lines.slice(1).join('\n').trim())

    return {
      sectionId,
      title,
      content: body,
    }
  } catch (error) {
    console.warn(`Failed to load content for ${sectionId}:`, error)
    return null
  }
}

// 客户端 fallback 加载器（使用 fetch）
export async function loadSectionContentClient(sectionId: string): Promise<SectionContent | null> {
  try {
    const [chapterNum, sectionNum] = sectionId.split('.')
    const fileName = `ch${chapterNum}-${sectionNum.padStart(2, '0')}.md`
    const filePath = `ch${chapterNum}/${fileName}`

    const basePath = typeof window !== 'undefined' ? window.location.pathname.split('/').slice(0, -1).join('/') : '/'
    const response = await fetch(`${basePath}/content/${filePath}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const content = await response.text()

    const lines = content.split('\n')
    const title = lines[0].replace(/^#+\s*/, '') || sectionId
    const body = normalizeMarkdownContent(lines.slice(1).join('\n').trim())

    return {
      sectionId,
      title,
      content: body,
    }
  } catch (error) {
    console.warn(`Failed to load content for ${sectionId}:`, error)
    return null
  }
}
