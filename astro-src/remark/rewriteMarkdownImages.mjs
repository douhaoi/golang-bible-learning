import { visit } from 'unist-util-visit';

export default function rewriteMarkdownImages(options = {}) {
  const base = typeof options.base === 'string' ? options.base : '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  return (tree) => {
    visit(tree, 'image', (node) => {
      const url = node?.url;
      if (!url || typeof url !== 'string') return;
      if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:'))
        return;

      if (!url.includes('images/')) return;

      const filename = url.split('/').pop();
      if (!filename) return;

      // Emit an absolute URL that already includes the configured base (GitHub Pages subpath).
      node.url = `${normalizedBase}content/images/${filename}`;
    });
  };
}
