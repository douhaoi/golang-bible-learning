import { createFileRoute } from '@tanstack/react-router'
import ChapterList from '../../pages/ChapterList'

export const Route = createFileRoute()({
  component: () => <ChapterList />,
})
