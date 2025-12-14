export const prerender = true;

export function GET({ site }: { site?: URL }) {
  const sitemap = site ? new URL('sitemap-index.xml', site).toString() : 'sitemap-index.xml';
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
