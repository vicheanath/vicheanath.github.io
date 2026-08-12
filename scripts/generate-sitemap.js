/**
 * Generates sitemap.xml at dist/sitemap.xml. Run after vite build.
 * Uses SITE_URL (default https://vicheanath.github.io) for absolute URLs.
 */
import fs from 'fs';
import path from 'path';
import {
  SITE_URL,
  allRoutes,
  escapeXml,
  isoDate,
  projectRoot,
} from './site-routes.js';

const distDir = path.join(projectRoot, 'dist');
const sitemapPath = path.join(distDir, 'sitemap.xml');

if (!fs.existsSync(distDir)) {
  console.error('dist/ not found. Run the build first.');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const urls = allRoutes().map((route) => ({
  loc: `${SITE_URL}/${route.path}`,
  lastmod: route.post ? isoDate(route.post.date) : today,
  changefreq: route.changefreq,
  priority: route.priority,
}));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(sitemapPath, xml, 'utf-8');
console.log('Generated', sitemapPath, 'with', urls.length, 'URLs.');
