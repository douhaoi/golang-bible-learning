import { createFileRoute } from '@tanstack/react-router'
import SectionDetail from '../../../pages/SectionDetail'
import { loadSectionContent, loadSectionContentClient } from '../../../utils/serverContentLoader'

export const Route = createFileRoute()({
  loader: async ({ params }) => {
    // 尝试在服务端加载内容
    let content = null

    // 检查是否在服务端环境
    if (typeof window === 'undefined') {
      // 服务端：直接读取文件系统
      content = await loadSectionContent(params.sectionId)
    } else {
      // 客户端：使用 fetch
      content = await loadSectionContentClient(params.sectionId)
    }

    return { content }
  },

  component: () => <SectionDetail />,

  // 启用 SSR
  ssr: true,
})
