import { visit } from 'unist-util-visit';

function stripMarker(alt, marker) {
  return alt.replace(new RegExp(`\\[?${marker}\\]?`, 'gi'), '').trim();
}

export default function markdownImageSizing() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      const alt = typeof node.alt === 'string' ? node.alt : '';
      const lower = alt.toLowerCase();

      let className = 'img-small';
      let cleanedAlt = alt;

      if (lower.includes('full-width') || lower.includes('full')) {
        className = 'img-full';
        cleanedAlt = stripMarker(cleanedAlt, 'full-width');
        cleanedAlt = stripMarker(cleanedAlt, 'full');
      } else if (lower.includes('large')) {
        className = 'img-large';
        cleanedAlt = stripMarker(cleanedAlt, 'large');
      } else if (lower.includes('medium')) {
        className = 'img-medium';
        cleanedAlt = stripMarker(cleanedAlt, 'medium');
      } else if (lower.includes('small')) {
        className = 'img-small';
        cleanedAlt = stripMarker(cleanedAlt, 'small');
      }

      node.alt = cleanedAlt;
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};

      const existing = node.data.hProperties.className;
      const merged = Array.isArray(existing)
        ? [...existing, className]
        : typeof existing === 'string'
          ? [existing, className]
          : [className];
      node.data.hProperties.className = merged;
      node.data.hProperties.loading = 'lazy';
      node.data.hProperties.decoding = 'async';
    });
  };
}
