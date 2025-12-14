import { BookOpen, ChevronRight, Code, Sparkles, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';

export default function Home() {
  const totalSections = chapters.reduce((sum, ch) => sum + ch.sections.length, 0);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <div className="soft-card p-8 md:p-12 mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
            Go语言圣经
          </h1>
          <p
            className="text-xl md:text-2xl mb-2 font-light"
            style={{ color: 'var(--text-secondary)' }}
          >
            The Go Programming Language
          </p>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            一个现代化的Go语言学习平台，基于《Go语言圣经》构建，帮助你系统学习Go语言编程
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: BookOpen, value: chapters.length, label: '章节' },
          { icon: Code, value: totalSections, label: '小节' },
          { icon: Zap, value: '100%', label: '免费' },
        ].map((stat) => (
          <div key={stat.label} className="soft-card p-6">
            <div className="flex items-center space-x-4">
              <div className="soft-raised p-3 rounded-xl">
                <stat.icon className="h-8 w-8" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="soft-card p-8 md:p-10">
        <div className="flex items-center space-x-2 mb-6">
          <div className="soft-raised p-2 rounded-lg">
            <Sparkles className="h-6 w-6" style={{ color: 'var(--accent)' }} />
          </div>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            学习特色
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: BookOpen,
              title: '系统化学习',
              desc: '从基础到高级，14个章节循序渐进，全面覆盖Go语言核心知识点',
            },
            { icon: Code, title: '实践导向', desc: '每个章节都包含丰富的示例代码和实际应用场景' },
            {
              icon: Zap,
              title: '现代化界面',
              desc: '清晰美观的阅读体验，支持响应式设计，随时随地学习',
            },
            {
              icon: Users,
              title: '开源免费',
              desc: '完全开源，基于Go语言圣经中文版，仅供学习交流使用',
            },
          ].map((feature) => (
            <div key={feature.title} className="soft-raised p-5 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="soft-inset p-2 rounded-lg flex-shrink-0">
                  <feature.icon className="h-6 w-6" style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start */}
      <div className="soft-card p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          开始学习
        </h2>
        <p className="mb-8 text-lg" style={{ color: 'var(--text-secondary)' }}>
          准备好开始你的Go语言学习之旅了吗？点击下方按钮查看所有章节
        </p>
        <Link
          to="/chapters"
          className="soft-button inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold"
          style={{ color: 'var(--accent)' }}
        >
          <span>查看所有章节</span>
          <Zap className="h-5 w-5" />
        </Link>
      </div>

      {/* Chapter Preview */}
      <div className="soft-card p-8 md:p-10">
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          章节预览
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.slice(0, 6).map((chapter) => (
            <Link
              key={chapter.id}
              to={`/chapter/${chapter.id}`}
              className="soft-raised p-5 rounded-xl block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                  第 {chapter.id} 章
                </span>
                <span
                  className="text-xs soft-inset px-2 py-1 rounded"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {chapter.sections.length} 小节
                </span>
              </div>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {chapter.title}
              </h3>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/chapters"
            className="inline-flex items-center space-x-2 font-medium"
            style={{ color: 'var(--accent)' }}
          >
            <span>查看全部章节</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
