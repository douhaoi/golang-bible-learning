import { Book, Home, List, Moon, Sun } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { useTheme } from '../contexts/ThemeContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="soft-raised p-2 rounded-xl">
                <Book className="h-6 w-6" style={{ color: 'var(--accent)' }} />
              </div>
              <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Go语言圣经
              </span>
            </Link>
            <nav className="flex items-center space-x-3">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location.pathname === '/' ? 'soft-inset' : 'soft-button'
                }`}
                style={{ color: 'var(--text-primary)' }}
              >
                <Home className="h-4 w-4" />
                <span>首页</span>
              </Link>
              <Link
                to="/chapters"
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location.pathname.startsWith('/chapters') ||
                  location.pathname.startsWith('/chapter')
                    ? 'soft-inset'
                    : 'soft-button'
                }`}
                style={{ color: 'var(--text-primary)' }}
              >
                <List className="h-4 w-4" />
                <span>章节</span>
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle flex items-center justify-center"
                aria-label="切换主题"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                ) : (
                  <Sun className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      {/* Footer */}
      <footer className="mt-12 py-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            <p>
              基于{' '}
              <a
                href="https://golang-china.github.io/gopl-zh/index.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)' }}
                className="underline hover:opacity-80 transition-opacity"
              >
                Go语言圣经
              </a>{' '}
              构建的学习站点
            </p>
            <p className="mt-2">
              原版官网:{' '}
              <a
                href="http://gopl.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)' }}
                className="underline hover:opacity-80 transition-opacity"
              >
                gopl.io
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
