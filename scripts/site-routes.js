/**
 * Single source of truth for the URLs the build knows about.
 * Used by prerender.js, generate-sitemap.js and generate-rss.js so a new page
 * cannot end up prerendered but missing from the sitemap (or the reverse).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.resolve(__dirname, '..');

export const SITE_URL = (process.env.SITE_URL || 'https://vicheanath.github.io').replace(/\/$/, '');

/** Paths are relative to the site root, without a leading slash. */
export const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'blog', priority: '0.9', changefreq: 'weekly' },
  { path: 'posts', priority: '0.8', changefreq: 'weekly' },
  { path: 'about', priority: '0.8', changefreq: 'monthly' },
  { path: 'projects', priority: '0.8', changefreq: 'weekly' },
  { path: 'contact', priority: '0.7', changefreq: 'monthly' },
  { path: 'privacy', priority: '0.4', changefreq: 'yearly' },
  { path: 'publishing-policy', priority: '0.5', changefreq: 'yearly' },
];

export function loadPosts() {
  const postsPath = path.join(projectRoot, 'src', 'generated', 'posts.json');

  if (!fs.existsSync(postsPath)) {
    console.warn('src/generated/posts.json not found — run scripts/generate-posts.js first.');
    return [];
  }

  try {
    return JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
  } catch (error) {
    console.warn('Unable to parse generated posts:', error);
    return [];
  }
}

/** Absolute canonical URL for a route path (mirrors src/lib/site.ts). */
export function canonicalUrl(routePath = '') {
  const clean = String(routePath).replace(/^\/+|\/+$/g, '');
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}

export function postRoutes(posts = loadPosts()) {
  const valid = posts.filter((post) => typeof post?.slug === 'string' && post.slug.trim().length > 0);
  const blogRoutes = valid.map((post) => ({
    path: `blog/${post.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    post,
  }));
  const legacyRoutes = valid.map((post) => ({
    path: `post/${post.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    post,
  }));
  return [...blogRoutes, ...legacyRoutes];
}

/** Distinct tags across all posts, each becoming its own static page. */
export function tagRoutes(posts = loadPosts()) {
  const seen = new Map();

  for (const post of posts) {
    for (const tag of post?.tags ?? []) {
      if (tag?.slug && !seen.has(tag.slug)) {
        seen.set(tag.slug, {
          path: `tag/${tag.slug}`,
          priority: '0.6',
          changefreq: 'weekly',
        });
      }
    }
  }

  return [...seen.values()];
}

/** Every route that should become a static HTML file. */
export function allRoutes() {
  const posts = loadPosts();
  return [...staticRoutes, ...postRoutes(posts), ...tagRoutes(posts)];
}

export function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function isoDate(dateStr) {
  const fallback = new Date().toISOString().slice(0, 10);
  if (!dateStr) return fallback;
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? fallback : parsed.toISOString().slice(0, 10);
}
