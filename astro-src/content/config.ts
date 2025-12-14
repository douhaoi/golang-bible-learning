import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const sections = defineCollection({
  loader: glob({ pattern: 'ch*/*.md', base: './src/content' }),
  // 确保使用 markdown 渲染器，Shiki 配置在 astro.config.mjs 中
});

export const collections = { sections };
