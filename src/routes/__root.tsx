import { Outlet, createRootRoute } from '@tanstack/react-router'
import Layout from '../components/Layout'
import SectionNav from '../components/SectionNav'
import { ThemeProvider } from '../contexts/ThemeContext'

export const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider>
      <Layout>
        <div className="flex gap-6 max-w-7xl mx-auto px-4 py-8">
          <aside className="hidden lg:block flex-shrink-0 w-64">
            <SectionNav />
          </aside>
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </Layout>
    </ThemeProvider>
  ),
})
