import { useParams, Link } from 'react-router-dom'
import { ChevronRight, BookOpen, ArrowLeft } from 'lucide-react'
import { chapters, getChapterById } from '../data/chapters'

export default function ChapterList() {
  const { chapterId } = useParams<{ chapterId?: string }>()

  if (chapterId) {
    const chapter = getChapterById(chapterId)
    if (!chapter) {
      return (
        <div className="text-center py-12">
          <p style={{ color: 'var(--text-secondary)' }}>章节不存在</p>
          <Link to="/chapters" className="mt-4 inline-block" style={{ color: 'var(--accent)' }}>
            返回章节列表
          </Link>
        </div>
      )
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 space-y-4">
          <Link
            to="/chapters"
            className="soft-button inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ color: 'var(--accent)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>返回章节列表</span>
          </Link>
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              第 {chapter.id} 章：{chapter.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              共 {chapter.sections.length} 个小节
            </p>
          </div>
        </div>

        <div className="soft-card p-6 md:p-8">
          <div className="space-y-4">
            {chapter.sections.map((section, index) => (
              <Link
                key={section.id}
                to={section.path}
                className="block p-5 md:p-6 soft-raised rounded-xl transition-all duration-200 hover:scale-[1.02]"
              >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="soft-inset w-12 h-12 rounded-lg flex items-center justify-center">
                    <span className="font-semibold" style={{ color: 'var(--accent)' }}>{index + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{section.id}</span>
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{section.title}</h3>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} />
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>所有章节</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          选择章节开始学习，共 {chapters.length} 个章节
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            to={`/chapter/${chapter.id}`}
            className="soft-card p-6 block"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="soft-raised p-3 rounded-lg">
                  <BookOpen className="h-6 w-6" style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--accent)' }}>第 {chapter.id} 章</div>
                  <h2 className="text-xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{chapter.title}</h2>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: 'var(--text-secondary)' }}>{chapter.sections.length} 个小节</span>
              <ChevronRight className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
