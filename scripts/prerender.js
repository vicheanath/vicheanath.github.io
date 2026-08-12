/**
 * Static site generation. Runs after both Vite builds:
 *   1. `vite build`                       -> dist/ (client assets + HTML shell)
 *   2. `vite build --ssr src/entry-server.tsx --outDir .ssr-dist`
 *
 * Renders every known route with React on the server and writes real HTML —
 * headings, article text, links and per-page <head> tags — so crawlers and
 * social scrapers never depend on running the app's JavaScript.
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { allRoutes, projectRoot } from './site-routes.js';

const distDir = path.join(projectRoot, 'dist');
const templatePath = path.join(distDir, 'index.html');
const serverEntry = path.join(projectRoot, '.ssr-dist', 'entry-server.js');

const HEAD_START = '<!--app-head-start-->';
const HEAD_END = '<!--app-head-end-->';
const APP_HTML = '<!--app-html-->';

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

if (!fs.existsSync(serverEntry)) {
  console.error('.ssr-dist/entry-server.js not found. Run the SSR build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

for (const marker of [HEAD_START, HEAD_END, APP_HTML]) {
  if (!template.includes(marker)) {
    console.error(`index.html is missing the ${marker} placeholder.`);
    process.exit(1);
  }
}

const headPattern = new RegExp(`${HEAD_START}[\\s\\S]*?${HEAD_END}`);

const { render } = await import(pathToFileURL(serverEntry).href);

function buildPage({ html, head }) {
  return template.replace(headPattern, head).replace(APP_HTML, html);
}

function writePage(routePath, contents) {
  const outPath = routePath
    ? path.join(distDir, routePath, 'index.html')
    : path.join(distDir, 'index.html');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, contents, 'utf-8');
  return path.relative(distDir, outPath).replace(/\\/g, '/');
}

const written = [];

for (const route of allRoutes()) {
  const url = `/${route.path}`;

  try {
    written.push(writePage(route.path, buildPage(await render(url))));
  } catch (error) {
    console.error(`Failed to prerender ${url}:`, error);
    process.exit(1);
  }
}

// GitHub Pages serves 404.html for anything unmatched; render the real
// not-found page (which is marked noindex) rather than a copy of the home page.
try {
  const notFound = buildPage(await render('/404-not-found'));
  fs.writeFileSync(path.join(distDir, '404.html'), notFound, 'utf-8');
  written.push('404.html');
} catch (error) {
  console.error('Failed to prerender 404.html:', error);
  process.exit(1);
}

console.log(`Prerendered ${written.length} HTML files:\n  ${written.join('\n  ')}`);
