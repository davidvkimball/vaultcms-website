import type { APIRoute } from 'astro';

// Opt out of static generation for this single endpoint
export const prerender = false;

const CACHE_MAX_AGE = 3600; // 1 hour

export const GET: APIRoute = async ({ redirect }) => {
  try {
    const res = await fetch('https://api.github.com/repos/davidvkimball/vaultcms/releases/latest', {
      headers: { 'User-Agent': 'vaultcms-website', 'Accept': 'application/vnd.github.v3+json' }
    });
    
    if (!res.ok) throw new Error(`GitHub API error`);
    const data = await res.json();
    
    let downloadUrl = '';
    const zipAsset = data.assets?.find((a: any) => a.name === 'vaultcms.zip');
    
    if (zipAsset) {
        downloadUrl = zipAsset.browser_download_url;
    } else {
        downloadUrl = `https://github.com/davidvkimball/vaultcms/archive/refs/tags/${data.tag_name}.zip`;
    }

    // Astro provides a built-in redirect method on the context.
    const response = redirect(downloadUrl, 302);
    response.headers.set('Cache-Control', `public, max-age=${CACHE_MAX_AGE}`);
    return response;
    
  } catch (err) {
    return redirect('https://github.com/davidvkimball/vaultcms/releases/latest', 302);
  }
};
