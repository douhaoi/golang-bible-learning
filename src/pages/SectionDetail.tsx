import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowLeft, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { chapters, getSectionById } from '../data/chapters'
import { loadSectionContent } from '../utils/contentLoader'
import MarkdownContent from '../components/MarkdownContent'

export default function SectionDetail() {
  const { chapterId, sectionId } = useParams<{ chapterId: string; sectionId: string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const sectionData = getSectionById(sectionId || '')
  
  useEffect(() => {
    if (sectionId) {
      setLoading(true)
      setError(null)
      loadSectionContent(sectionId)
        .then((data) => {
          if (data) {
            setContent(data.content)
          } else {
            setError('内容未找到')
          }
          setLoading(false)
        })
        .catch((err) => {
          setError('加载内容失败')
          setLoading(false)
          console.error(err)
        })
    }
  }, [sectionId])

  if (!sectionData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">小节不存在</p>
        <Link to="/chapters" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          返回章节列表
        </Link>
      </div>
    )
  }

  const { chapter, section } = sectionData
  const currentSectionIndex = chapter.sections.findIndex((s) => s.id === sectionId)
  const prevSection = currentSectionIndex > 0 ? chapter.sections[currentSectionIndex - 1] : null
  const nextSection =
    currentSectionIndex < chapter.sections.length - 1
      ? chapter.sections[currentSectionIndex + 1]
      : null

  // 获取相邻章节
  const currentChapterIndex = chapters.findIndex((ch) => ch.id === chapter.id)
  const prevChapter = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null
  const nextChapter =
    currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null

  // 如果没有下一节，尝试下一章的第一节
  const actualNextSection = nextSection
    ? nextSection
    : nextChapter
    ? nextChapter.sections[0]
    : null

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6">
        <Link
          to={`/chapter/${chapter.id}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回第 {chapter.id} 章
        </Link>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-primary-600">首页</Link>
          <span>/</span>
          <Link to="/chapters" className="hover:text-primary-600">章节</Link>
          <span>/</span>
          <Link to={`/chapter/${chapter.id}`} className="hover:text-primary-600">
            第 {chapter.id} 章
          </Link>
          <span>/</span>
          <span className="text-gray-900">{section.title}</span>
        </div>
      </div>

      {/* Content */}
      <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose">
        <header className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-primary-600 mb-2">
            <span>第 {chapter.id} 章</span>
            <span>·</span>
            <span>{section.id}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{section.title}</h1>
        </header>

        <div className="content">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              <span className="ml-3 text-gray-600">加载内容中...</span>
            </div>
          ) : error ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="text-yellow-800">
                <strong>提示：</strong> {error}
              </p>
              <p className="text-yellow-800 mt-2 text-sm">
                请运行 <code className="bg-yellow-100 px-2 py-1 rounded">npm run crawl</code> 或 <code className="bg-yellow-100 px-2 py-1 rounded">pnpm run crawl</code> 来抓取内容。
              </p>
            </div>
          ) : content ? (
            <MarkdownContent content={content} />
          ) : (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-blue-800 text-sm">
                <strong>提示：</strong> 内容文件不存在
              </p>
              <p className="text-blue-800 mt-2 text-sm">
                请运行爬虫脚本抓取内容：<code className="bg-blue-100 px-2 py-1 rounded">npm run crawl</code>
              </p>
            </div>
          )}
        </div>
      </article>

      {/* Navigation Footer */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex-1">
          {prevSection ? (
            <Link
              to={prevSection.path}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-gray-500">上一节</div>
                <div className="text-sm font-medium text-gray-900">{prevSection.title}</div>
              </div>
            </Link>
          ) : prevChapter ? (
            <Link
              to={prevChapter.sections[prevChapter.sections.length - 1].path}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-gray-500">上一章最后一节</div>
                <div className="text-sm font-medium text-gray-900">
                  {prevChapter.sections[prevChapter.sections.length - 1].title}
                </div>
              </div>
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        <div className="flex-1 flex justify-end">
          {actualNextSection ? (
            <Link
              to={actualNextSection.path}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className="text-right">
                <div className="text-xs text-gray-500">下一节</div>
                <div className="text-sm font-medium text-gray-900">{actualNextSection.title}</div>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}

