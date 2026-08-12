/**
 * Generates dist/rss.xml from the published posts. Run after vite build.
 * The feed is linked from every prerendered page via <link rel="alternate">.
 */
import fs from 'fs';
import path from 'path';
import { SITE_URL, escapeXml, loadPosts, projectRoot } from './site-routes.js';

const distDir = path.join(projectRoot, 'dist');
const feedPath = path.join(distDir, 'rss.xml');

const SITE_NAME = 'Vichea Nath';
const SITE_DESCRIPTION =
  'Original software notes on .NET, React, architecture, and side projects by Vichea Nath.';

if (!fs.existsSync(distDir)) {
  console.error('dist/ not found. Run the build first.');
  process.exit(1);
}

function rfc822(dateStr) {
  const parsed = new Date(dateStr);
  return (isNaN(parsed.getTime()) ? new Date() : parsed).toUTCString();
}

const posts = loadPosts().filter((post) => typeof post?.slug === 'string' && post.slug.trim());

const items = posts
  .map((post) => {
    const url = `${SITE_URL}/post/${post.slug}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${escapeXml(post.excerpt ?? '')}</description>
    </item>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

fs.writeFileSync(feedPath, xml, 'utf-8');
console.log('Generated', feedPath, 'with', posts.length, 'items.');
