import { ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Chapter } from '../data/chapters';

interface SectionNavProps {
  chapter: Chapter;
  currentSectionId: string;
}

/**
 * 章节导航侧边栏组件
 * 支持响应式设计，移动端可折叠
 */
export default function SectionNav({ chapter, currentSectionId }: SectionNavProps) {
  const [isOpen, setIsOpen] = useState(false);

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
          w-72 lg:w-64 xl:w-72
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav className="h-full soft-card p-6 overflow-y-auto">
          {/* 章节标题 */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              第 {chapter.id} 章
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {chapter.title}
            </p>
          </div>

          {/* 分割线 */}
          <div className="h-px mb-4" style={{ background: 'var(--text-secondary)', opacity: 0.2 }} />

          {/* 小节列表 */}
          <ul className="space-y-1">
            {chapter.sections.map((section) => {
              const isActive = section.id === currentSectionId;
              return (
                <li key={section.id}>
                  <Link
                    to={section.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      group flex items-center justify-between
                      px-3 py-2.5 rounded-lg
                      transition-all duration-200
                      ${isActive ? 'soft-inset' : 'hover:soft-raised'}
                    `}
                    style={{
                      color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs mb-0.5 opacity-70">{section.id}</div>
                      <div className="text-sm font-medium truncate">{section.title}</div>
                    </div>
                    <ChevronRight
                      className={`
                        h-4 w-4 flex-shrink-0 ml-2
                        transition-transform duration-200
                        ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                      `}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* 章节统计 */}
          <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--shadow-dark)' }}>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              共 {chapter.sections.length} 个小节
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

