/**
 * Prepare static HTML entry points for known routes on GitHub Pages.
 * This keeps direct visits to routes like /posts and /post/my-slug on a
 * real 200 HTML file instead of relying on the 404 fallback.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const indexHtml = path.join(dist, 'index.html');
const notFoundHtml = path.join(dist, '404.html');
const postsJson = path.join(__dirname, '..', 'src', 'generated', 'posts.json');

const staticRoutes = ['posts', 'projects', 'contact', 'privacy', 'publishing-policy'];

if (!fs.existsSync(indexHtml)) {
  console.error('dist/index.html not found. Run the build first.');
  process.exit(1);
}

let postRoutes = [];
if (fs.existsSync(postsJson)) {
  try {
    const posts = JSON.parse(fs.readFileSync(postsJson, 'utf-8'));
    postRoutes = posts
      .filter((post) => typeof post?.slug === 'string' && post.slug.trim().length > 0)
      .map((post) => `post/${post.slug}`);
  } catch (error) {
    console.warn('Unable to read generated posts for static route copies:', error);
  }
}

for (const route of [...staticRoutes, ...postRoutes]) {
  const routeDir = path.join(dist, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.copyFileSync(indexHtml, path.join(routeDir, 'index.html'));
}

fs.copyFileSync(indexHtml, notFoundHtml);
console.log('Prepared static route entry points and copied index.html to 404.html.');
