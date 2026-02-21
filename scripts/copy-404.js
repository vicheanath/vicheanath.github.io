/**
 * Copy dist/index.html to dist/404.html so GitHub Pages serves the SPA
 * for any path (e.g. /posts, /post/slug). The server returns 404.html for
 * unknown routes, and the React app loads and handles the URL.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const indexHtml = path.join(dist, 'index.html');
const notFoundHtml = path.join(dist, '404.html');

if (!fs.existsSync(indexHtml)) {
  console.error('dist/index.html not found. Run the build first.');
  process.exit(1);
}
fs.copyFileSync(indexHtml, notFoundHtml);
console.log('Copied index.html to 404.html for GitHub Pages SPA routing.');
