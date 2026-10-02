/** Base URL for canonical and Open Graph URLs. */
export const SITE_URL = 'https://example.com';

/**
 * Canonical URL for a route. Static hosts serve `posts/index.html` for
 * `/posts/`, so canonical links carry the trailing slash the host settles on.
 */
export function canonicalUrl(path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}

export const SITE_NAME = 'Vichea Nath';
export const SITE_TAGLINE = 'Simple notes on software';
export const DEFAULT_DESCRIPTION =
  'Personal website and technical notes by Vichea Nath covering .NET, React, architecture, and practical software engineering.';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/vicheanath/';
export const GITHUB_URL = '';
export const SOURCE_REPO_URL = '';
