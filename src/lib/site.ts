/** Base URL for canonical and Open Graph URLs. */
export const SITE_URL = 'https://vicheanath.github.io';

/**
 * Canonical URL for a route. Static hosts serve `posts/index.html` for
 * `/posts/`, so canonical links carry the trailing slash the host settles on.
 */
export function canonicalUrl(path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}

export const SITE_NAME = 'Vichea Nath';
export const SITE_TAGLINE = 'Personal bulletins and occasional notes';
export const DEFAULT_DESCRIPTION =
  'Original software notes on .NET, React, architecture, and side projects by Vichea Nath.';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/vicheanath/';
export const GITHUB_URL = 'https://github.com/vicheanath';
export const SOURCE_REPO_URL = 'https://github.com/vicheanath/vicheanath.github.io';
