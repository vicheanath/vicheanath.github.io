/**
 * Head data captured during the build-time render (see src/entry-server.tsx).
 *
 * On the client the <Seo> component mutates document.head directly; on the
 * server there is no DOM, so <Seo> records what it wants instead and the
 * prerenderer turns that into real <head> markup. Crawlers therefore get the
 * title, canonical, Open Graph and JSON-LD in the served HTML rather than
 * after a JavaScript run.
 */
import { SITE_NAME, SITE_URL } from './site';

export interface HeadData {
  title: string;
  description: string;
  url: string;
  type: 'website' | 'article' | 'profile';
  publishedTime?: string;
  noindex?: boolean;
  jsonLd: Record<string, unknown>[];
}

let captured: HeadData | null = null;

export function beginHeadCapture() {
  captured = null;
}

/** First <Seo> in a tree wins; the page owns its head, not the layout. */
export function collectHead(data: HeadData) {
  if (!captured) {
    captured = data;
  }
}

export function takeHead(): HeadData | null {
  const head = captured;
  captured = null;
  return head;
}

function escapeAttr(value: string) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function meta(name: string, content: string, isProperty = false) {
  return `<meta ${isProperty ? 'property' : 'name'}="${name}" content="${escapeAttr(content)}" />`;
}

/** Serializes captured head data into markup for the <head> of a static page. */
export function renderHeadTags(head: HeadData): string {
  const robots = head.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large';

  const tags = [
    `<title>${escapeAttr(head.title)}</title>`,
    meta('description', head.description),
    meta('robots', robots),
    meta('author', SITE_NAME),
    `<link rel="canonical" href="${escapeAttr(head.url)}" />`,
    meta('og:title', head.title, true),
    meta('og:description', head.description, true),
    meta('og:url', head.url, true),
    meta('og:type', head.type === 'article' ? 'article' : 'website', true),
    meta('og:site_name', SITE_NAME, true),
    meta('og:locale', 'en_US', true),
    meta('twitter:card', 'summary'),
    meta('twitter:title', head.title),
    meta('twitter:description', head.description),
    `<link rel="alternate" type="application/rss+xml" title="${escapeAttr(SITE_NAME)}" href="${SITE_URL}/rss.xml" />`,
  ];

  if (head.publishedTime) {
    tags.push(meta('article:published_time', head.publishedTime, true));
  }

  for (const item of head.jsonLd) {
    // </script> inside a JSON string would close the tag early.
    const json = JSON.stringify(item).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json" data-seo-jsonld="true">${json}</script>`);
  }

  return tags.join('\n    ');
}
