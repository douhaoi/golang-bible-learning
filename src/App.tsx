import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ChapterList from './pages/ChapterList';
import Home from './pages/Home';
import SectionDetail from './pages/SectionDetail';

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
  );
}

export default App;
