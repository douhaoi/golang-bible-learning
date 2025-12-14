import { Router } from '@tanstack/react-router'
import { routeTree } from 'virtual:tanstack/router-options'

// 创建并导出路由实例
export const router = new Router({
  routeTree,
  defaultNotFoundComponent: () => (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">404 - 页面未找到</h1>
      <p>抱歉，您访问的页面不存在。</p>
    </div>
  ),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

