import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Book, Home, List } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Go语言圣经</span>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>首页</span>
              </Link>
              <Link
                to="/chapters"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/chapters') || location.pathname.startsWith('/chapter')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
                <span>章节</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              基于{' '}
              <a
                href="https://golang-china.github.io/gopl-zh/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                Go语言圣经
              </a>
              {' '}构建的学习站点
            </p>
            <p className="mt-2">
              原版官网: <a href="http://gopl.io" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">gopl.io</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

