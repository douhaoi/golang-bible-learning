import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const sections = defineCollection({
  loader: glob({ pattern: 'ch*/*.md', base: './src/content' }),
});

export const collections = { sections };
