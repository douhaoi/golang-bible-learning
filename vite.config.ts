import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署时需要设置 base 路径
  // 如果仓库名是 golang-bible-learning，则 base 为 '/golang-bible-learning/'
  // 本地开发时使用 '/'
  base: process.env.NODE_ENV === 'production' ? '/golang-bible-learning/' : '/',
  server: {
    port: 3000,
    open: true
  },
  assetsInclude: ['**/*.md'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 确保 source map 在生产环境中不生成（可选，减小体积）
    sourcemap: false,
  },
})
