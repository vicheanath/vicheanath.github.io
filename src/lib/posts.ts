/**
 * Post data is generated at build time by scripts/generate-posts.js.
 * The app only imports static JSON — no gray-matter or Buffer in the browser.
 */
import postsData from '../generated/posts.json';

export interface Tag {
  name: string;
  slug: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: Tag[];
  body: string;
}

const posts = postsData as Post[];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  return posts.find((p) => p.slug === slug) ?? null;
}

export interface TagSummary extends Tag {
  count: number;
}

/** Every tag in use, most-used first, then alphabetical. */
export function getAllTags(): TagSummary[] {
  const byslug = new Map<string, TagSummary>();

  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      const existing = byslug.get(tag.slug);
      if (existing) {
        existing.count += 1;
      } else {
        byslug.set(tag.slug, { ...tag, count: 1 });
      }
    }
  }

  return [...byslug.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  );
}

export function getTagBySlug(slug: string): TagSummary | null {
  return getAllTags().find((tag) => tag.slug === slug) ?? null;
}

export function getPostsByTag(slug: string): Post[] {
  return posts.filter((post) => (post.tags ?? []).some((tag) => tag.slug === slug));
}

/** Rough reading time in minutes, ignoring code blocks. */
export function getReadingTimeMinutes(body: string): number {
  return Math.max(1, Math.round(countWords(body) / 220));
}

export function countWords(body: string): number {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

export function formatPostDate(date: string): string {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}
