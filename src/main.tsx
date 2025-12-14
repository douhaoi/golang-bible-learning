import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

// GitHub Pages 部署时需要设置 basename
// 如果仓库名是 golang-bible-learning，则 basename 为 '/golang-bible-learning/'
const basename = import.meta.env.MODE === 'production' ? '/golang-bible-learning/' : '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
