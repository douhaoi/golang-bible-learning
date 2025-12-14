import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import ChapterList from './pages/ChapterList';
import Home from './pages/Home';
import SectionDetail from './pages/SectionDetail';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // 处理从 404.html 重定向来的路由
    const redirect = sessionStorage.redirect;
    if (redirect) {
      // 清理 sessionStorage
      sessionStorage.redirect = undefined;
      sessionStorage.removeItem('__spa_redirect_handled__');
      // 获取 basename
      const basename = import.meta.env.MODE === 'production' ? '/golang-bible-learning/' : '/';
      // 移除 basename 获取相对路径
      const relativePath = redirect.startsWith(basename)
        ? redirect.slice(basename.length)
        : redirect;
      // 导航到对应路由
      navigate(relativePath || '/');
    }
  }, [navigate]);

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
