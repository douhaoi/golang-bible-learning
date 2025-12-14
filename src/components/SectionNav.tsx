import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { chapters } from '../data/chapters'

/**
 * 章节导航侧边栏组件
 * 显示所有章节和小节，支持响应式设计
 */
export default function SectionNav() {
  const params = useParams({ from: '__root' })
  const sectionId = (params as any).sectionId || ''

  const [isOpen, setIsOpen] = useState(false)
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(() => {
    // 默认展开当前小节所在的章节
    const currentChapterId = sectionId.split('.')[0]
    return new Set([currentChapterId])
  })

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  return (
    <>
      {/* 移动端折叠按钮 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 soft-button p-3 rounded-lg"
        style={{ color: 'var(--text-primary)' }}
        aria-label="切换导航菜单"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* 遮罩层（移动端） */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="关闭导航"
        />
      )}

      {/* 侧边导航栏 */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen z-40
          w-80 lg:w-72 xl:w-80
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav className="h-full soft-card p-4 overflow-y-auto">
          {/* 标题 */}
          <div className="mb-4 px-2">
            <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
              Go语言圣经
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              全部章节
            </p>
          </div>

          {/* 分割线 */}
          <div
            className="h-px mb-4"
            style={{ background: 'var(--text-secondary)', opacity: 0.2 }}
          />

          {/* 所有章节列表 */}
          <ul className="space-y-2">
            {chapters.map((chapter) => {
              const isExpanded = expandedChapters.has(chapter.id)
              const hasCurrentSection = chapter.sections.some((s) => s.id === sectionId)
              return (
                <li key={chapter.id}>
                  {/* 章节标题（可折叠） */}
                  <button
                    type="button"
                    onClick={() => toggleChapter(chapter.id)}
                    className={`
                      w-full flex items-center justify-between
                      px-3 py-2 rounded-lg
                      transition-all duration-200
                      ${hasCurrentSection ? 'soft-raised' : 'hover:soft-raised'}
                    `}
                    style={{
                      color: hasCurrentSection ? 'var(--accent)' : 'var(--text-primary)',
                    }}
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <span className="text-sm font-semibold">第 {chapter.id} 章</span>
                      <span className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                        {chapter.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`
                        h-4 w-4 flex-shrink-0 ml-2
                        transition-transform duration-200
                        ${isExpanded ? 'rotate-180' : ''}
                      `}
                    />
                  </button>

                  {/* 小节列表（可折叠） */}
                  {isExpanded && (
                    <ul className="mt-1 ml-2 space-y-0.5">
                      {chapter.sections.map((section) => {
                        const isActive = section.id === sectionId
                        return (
                          <li key={section.id}>
                            <Link
                              to={section.path}
                              onClick={() => setIsOpen(false)}
                              className={`
                                group flex items-center justify-between
                                px-3 py-2 rounded-lg
                                transition-all duration-200
                                ${isActive ? 'soft-inset' : 'hover:bg-opacity-50'}
                              `}
                              style={{
                                color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                                backgroundColor: isActive ? 'transparent' : 'transparent',
                              }}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium truncate">{section.title}</div>
                              </div>
                              <ChevronRight
                                className={`
                                  h-3 w-3 flex-shrink-0 ml-2
                                  transition-all duration-200
                                  ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                                `}
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* 底部统计 */}
          <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--shadow-dark)' }}>
            <div className="text-xs px-2" style={{ color: 'var(--text-secondary)' }}>
              共 {chapters.length} 章 · {chapters.reduce((sum, ch) => sum + ch.sections.length, 0)}{' '}
              节
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
