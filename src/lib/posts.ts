/**
 * Post data is generated at build time by scripts/generate-posts.js.
 * The app only imports static JSON — no gray-matter or Buffer in the browser.
 */
import postsData from '../generated/posts.json';

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
}

const posts = postsData as Post[];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  return posts.find((p) => p.slug === slug) ?? null;
}
