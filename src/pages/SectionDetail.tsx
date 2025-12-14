import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link, useLoaderData, useParams } from '@tanstack/react-router'
import MarkdownContent from '../components/MarkdownContent'
import SectionFooter from '../components/SectionFooter'
import { chapters, getSectionById } from '../data/chapters'

export default function SectionDetail() {
  const { sectionId } = useParams({ from: '/chapters/$chapterId/$sectionId' })
  const { content: loaderContent } = useLoaderData({ from: '/chapters/$chapterId/$sectionId' })

  const sectionData = getSectionById(sectionId || '')

  if (!sectionData) {
    return (
      <div className="text-center py-12">
        <p style={{ color: 'var(--text-secondary)' }}>小节不存在</p>
        <Link to="/chapters" className="mt-4 inline-block" style={{ color: 'var(--accent)' }}>
          返回章节列表
        </Link>
      </div>
    )
  }

  const { chapter, section } = sectionData;
  const currentSectionIndex = chapter.sections.findIndex((s) => s.id === sectionId);
  const prevSection = currentSectionIndex > 0 ? chapter.sections[currentSectionIndex - 1] : null;
  const nextSection =
    currentSectionIndex < chapter.sections.length - 1
      ? chapter.sections[currentSectionIndex + 1]
      : null;

  const currentChapterIndex = chapters.findIndex((ch) => ch.id === chapter.id);
  const prevChapter = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null;
  const nextChapter =
    currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null;

  const actualNextSection = nextSection
    ? nextSection
    : nextChapter
      ? nextChapter.sections[0]
      : null;

  return (
    <div>
      {/* 主内容区域 */}
        {/* Navigation */}
        <div className="mb-6 space-y-3 lg:mt-0 mt-16">
          <Link
            to={`/chapter/${chapter.id}`}
            className="soft-button inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ color: 'var(--accent)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>返回第 {chapter.id} 章</span>
          </Link>
          <div className="soft-raised px-4 py-3 rounded-xl">
            <div className="flex items-center space-x-2 text-sm flex-wrap">
              <Link
                to="/"
                className="hover:opacity-80 transition-opacity font-medium"
                style={{ color: 'var(--accent)' }}
              >
                首页
              </Link>
              <span style={{ color: 'var(--text-secondary)' }}>/</span>
              <Link
                to="/chapters"
                className="hover:opacity-80 transition-opacity font-medium"
                style={{ color: 'var(--accent)' }}
              >
                章节
              </Link>
              <span style={{ color: 'var(--text-secondary)' }}>/</span>
              <Link
                to={`/chapter/${chapter.id}`}
                className="hover:opacity-80 transition-opacity font-medium"
                style={{ color: 'var(--accent)' }}
              >
                第 {chapter.id} 章
              </Link>
              <span style={{ color: 'var(--text-secondary)' }}>/</span>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {section.title}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="soft-card p-8 md:p-10">
          <header className="mb-8 pb-6" style={{ borderBottom: '2px solid var(--bg-primary)' }}>
            <div
              className="flex items-center space-x-2 text-sm mb-2"
              style={{ color: 'var(--accent)' }}
            >
              <span>第 {chapter.id} 章</span>
              <span>·</span>
              <span>{section.id}</span>
            </div>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {section.title}
            </h1>
          </header>

          <div className="content">
            {loaderContent?.content ? (
              <>
                <MarkdownContent content={loaderContent.content} />
                <SectionFooter />
              </>
            ) : (
              <div className="soft-raised rounded-lg p-4 my-6">
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  <strong>提示：</strong> 内容文件不存在
                </p>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  请运行爬虫脚本抓取内容：
                  <code className="soft-inset px-2 py-1 rounded text-xs">pnpm run crawl</code>
                </p>
              </div>
            )}
          </div>
        </article>

        {/* Navigation Footer */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex-1">
            {prevSection ? (
              <Link
                to={prevSection.path}
                className="soft-button inline-flex items-center space-x-2 px-4 py-3 rounded-xl"
              >
                <ChevronLeft className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                <div className="text-left">
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    上一节
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {prevSection.title}
                  </div>
                </div>
              </Link>
            ) : prevChapter ? (
              <Link
                to={prevChapter.sections[prevChapter.sections.length - 1].path}
                className="soft-button inline-flex items-center space-x-2 px-4 py-3 rounded-xl"
              >
                <ChevronLeft className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                <div className="text-left">
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    上一章最后一节
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {prevChapter.sections[prevChapter.sections.length - 1].title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="flex-1 flex justify-end">
            {actualNextSection ? (
              <Link
                to={actualNextSection.path}
                className="soft-button inline-flex items-center space-x-2 px-4 py-3 rounded-xl"
              >
                <div className="text-right">
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    下一节
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {actualNextSection.title}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      {/* 结束主内容区域 */}
    </div>
  )
}
