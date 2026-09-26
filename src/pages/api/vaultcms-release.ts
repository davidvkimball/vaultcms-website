import type { APIRoute } from 'astro';

// On demand rather than prerendered: a version baked in at build time would go
// stale the moment a new vaultcms release ships without a site redeploy, and
// then disagree with what /api/download-latest actually hands out.
export const prerender = false;

const RELEASES_URL = 'https://github.com/davidvkimball/vaultcms/releases/latest';

// Netlify's CDN holds the answer so GitHub (60 unauthenticated requests an hour
// per IP) is asked at most about once an hour, not once per page view. A failed
// lookup is cached briefly so an outage does not pin a missing version for long.
function json(body: object, cdnMaxAge: number) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'Netlify-CDN-Cache-Control': `public, durable, s-maxage=${cdnMaxAge}, stale-while-revalidate=86400`,
    },
  });
}

export const GET: APIRoute = async () => {
  try {
    const res = await fetch('https://api.github.com/repos/davidvkimball/vaultcms/releases/latest', {
      headers: { 'User-Agent': 'vaultcms-website', Accept: 'application/vnd.github.v3+json' },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();
    if (typeof data.tag_name !== 'string' || !data.tag_name) throw new Error('No tag_name');
    return json({ tag_name: data.tag_name, html_url: data.html_url || RELEASES_URL }, 3600);
  } catch {
    // Still a 200: the page treats a null tag as "no version to show", and a
    // non-2xx status would put a failed-request error in every visitor's console.
    return json({ tag_name: null, html_url: RELEASES_URL }, 300);
  }
};
