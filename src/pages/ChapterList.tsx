import { useParams, Link } from 'react-router-dom'
import { ChevronRight, BookOpen } from 'lucide-react'
import { chapters, getChapterById } from '../data/chapters'

export default function ChapterList() {
  const { chapterId } = useParams<{ chapterId?: string }>()

  if (chapterId) {
    const chapter = getChapterById(chapterId)
    if (!chapter) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">章节不存在</p>
          <Link to="/chapters" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            返回章节列表
          </Link>
        </div>
      )
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/chapters"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4 inline-block"
          >
            ← 返回章节列表
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            第 {chapter.id} 章：{chapter.title}
          </h1>
          <p className="text-gray-600 mt-2">
            共 {chapter.sections.length} 个小节
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
          {chapter.sections.map((section, index) => (
            <Link
              key={section.id}
              to={section.path}
              className="block p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">{section.id}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">所有章节</h1>
        <p className="text-gray-600">
          选择章节开始学习，共 {chapters.length} 个章节
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            to={`/chapter/${chapter.id}`}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-primary-600">第 {chapter.id} 章</div>
                  <h2 className="text-xl font-bold text-gray-900 mt-1">{chapter.title}</h2>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{chapter.sections.length} 个小节</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

