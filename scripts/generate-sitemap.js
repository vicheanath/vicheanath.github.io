/**
 * Generates sitemap.xml at dist/sitemap.xml. Run after vite build.
 * Uses SITE_URL (default https://vicheanath.github.io) for absolute URLs.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const postsPath = path.join(projectRoot, 'src', 'generated', 'posts.json');

const SITE_URL = (process.env.SITE_URL || 'https://vicheanath.github.io').replace(/\/$/, '');

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function isoDate(dateStr) {
  if (!dateStr) return new Date().toISOString().slice(0, 10);
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
}

if (!fs.existsSync(distDir)) {
  console.error('dist/ not found. Run the build first.');
  process.exit(1);
}

const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'about', priority: '0.8', changefreq: 'monthly' },
  { path: 'posts', priority: '0.9', changefreq: 'weekly' },
  { path: 'projects', priority: '0.8', changefreq: 'weekly' },
  { path: 'contact', priority: '0.7', changefreq: 'monthly' },
  { path: 'advertising', priority: '0.5', changefreq: 'yearly' },
  { path: 'privacy', priority: '0.4', changefreq: 'yearly' },
  { path: 'publishing-policy', priority: '0.5', changefreq: 'yearly' },
];

let posts = [];
if (fs.existsSync(postsPath)) {
  try {
    posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
  } catch (_) {}
}

const urls = [
  ...staticRoutes.map((r) => ({
    loc: `${SITE_URL}/${r.path}`,
    lastmod: new Date().toISOString().slice(0, 10),
    changefreq: r.changefreq,
    priority: r.priority,
  })),
  ...posts.map((p) => ({
    loc: `${SITE_URL}/post/${p.slug}`,
    lastmod: isoDate(p.date),
    changefreq: 'monthly',
    priority: '0.7',
  })),
];

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
