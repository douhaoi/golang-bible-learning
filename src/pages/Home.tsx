import { Link } from 'react-router-dom'
import { BookOpen, Code, Zap, Users } from 'lucide-react'
import { chapters } from '../data/chapters'

export default function Home() {
  const totalSections = chapters.reduce((sum, ch) => sum + ch.sections.length, 0)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Go语言圣经
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          The Go Programming Language
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          一个现代化的Go语言学习平台，基于《Go语言圣经》构建，帮助你系统学习Go语言编程
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{chapters.length}</div>
              <div className="text-sm text-gray-600">章节</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <Code className="h-8 w-8 text-primary-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalSections}</div>
              <div className="text-sm text-gray-600">小节</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-primary-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">免费</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">学习特色</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">系统化学习</h3>
              <p className="text-gray-600">
                从基础到高级，14个章节循序渐进，全面覆盖Go语言核心知识点
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-primary-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">实践导向</h3>
              <p className="text-gray-600">
                每个章节都包含丰富的示例代码和实际应用场景
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">现代化界面</h3>
              <p className="text-gray-600">
                清晰美观的阅读体验，支持响应式设计，随时随地学习
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">开源免费</h3>
              <p className="text-gray-600">
                完全开源，基于Go语言圣经中文版，仅供学习交流使用
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">开始学习</h2>
        <p className="text-primary-100 mb-6">
          准备好开始你的Go语言学习之旅了吗？点击下方按钮查看所有章节
        </p>
        <Link
          to="/chapters"
          className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          查看所有章节 →
        </Link>
      </div>

      {/* Chapter Preview */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">章节预览</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.slice(0, 6).map((chapter) => (
            <Link
              key={chapter.id}
              to={`/chapter/${chapter.id}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary-600">第 {chapter.id} 章</span>
                <span className="text-xs text-gray-500">{chapter.sections.length} 小节</span>
              </div>
              <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/chapters"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            查看全部章节 →
          </Link>
        </div>
      </div>
    </div>
  )
}

