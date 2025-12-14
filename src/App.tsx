import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ChapterList from './pages/ChapterList'
import SectionDetail from './pages/SectionDetail'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapters" element={<ChapterList />} />
        <Route path="/chapter/:chapterId" element={<ChapterList />} />
        <Route path="/chapter/:chapterId/section/:sectionId" element={<SectionDetail />} />
      </Routes>
    </Layout>
  )
}

export default App

