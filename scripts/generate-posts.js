/**
 * Build-time script: reads markdown from src/content/posts/*.md,
 * parses frontmatter with gray-matter (Node only), writes src/generated/posts.json.
 * Run before dev/build so the app only loads static JSON (no Buffer in browser).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const postsDir = path.join(projectRoot, 'src', 'content', 'posts');
const outDir = path.join(projectRoot, 'src', 'generated');
const outFile = path.join(outDir, 'posts.json');

const files = fs.readdirSync(postsDir, { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.endsWith('.md'))
  .map((d) => d.name);

/** ".NET" -> "dotnet", "ASP.NET Core" -> "aspnet-core". */
function slugifyTag(name) {
  return String(name)
    .toLowerCase()
    .replace(/^\./, 'dot')
    .replace(/\./g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readTags(value) {
  const list = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : [];

  return list
    .map((name) => String(name).trim())
    .filter(Boolean)
    .map((name) => ({ name, slug: slugifyTag(name) }))
    .filter((tag) => tag.slug.length > 0);
}

const posts = files.map((name) => {
  const raw = fs.readFileSync(path.join(postsDir, name), 'utf-8');
  const { data, content } = matter(raw);
  const slug = name.replace(/\.md$/, '');
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    tags: readTags(data.tags),
    body: content,
  };
});

posts.sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0));

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(outFile, JSON.stringify(posts, null, 0), 'utf-8');
console.log('Generated', outFile, 'with', posts.length, 'posts');
