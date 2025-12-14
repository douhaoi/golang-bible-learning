import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
// @ts-check
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import markdownImageSizing from './astro-src/remark/markdownImageSizing.mjs';
import rewriteMarkdownImages from './astro-src/remark/rewriteMarkdownImages.mjs';

const site = process.env.SITE;

// Root Astro config (SSG) for GitHub Pages.
// We intentionally isolate Astro source into `astro-src/` to avoid conflicts with the legacy Vite SPA under `src/`.
export default defineConfig({
  output: 'static',
  srcDir: './astro-src',
  // GitHub Pages 仓库路径部署（与当前仓库名保持一致）。
  // 如果仓库名不是 golang-bible-learning，请同步修改这里。
  base: process.env.NODE_ENV === 'production' ? '/golang-bible-learning/' : '/',
  site,
  integrations: [tailwind(), ...(site ? [sitemap()] : [])],
  markdown: {
    syntaxHighlight: 'shiki',
    remarkPlugins: [
      remarkGfm,
      // Keep markdown image URLs working under GitHub Pages subpath deployments.
      [
        rewriteMarkdownImages,
        { base: process.env.NODE_ENV === 'production' ? '/golang-bible-learning/' : '/' },
      ],
      markdownImageSizing,
    ],
    shikiConfig: {
      theme: {
        light: 'github-light',
        dark: 'github-dark',
      },
      langAlias: {
        C: 'c',
        Go: 'go',
        Golang: 'go',
        Json: 'json',
        JSON: 'json',
        sh: 'bash',
        shell: 'bash',
      },
      wrap: false,
    },
  },
});
