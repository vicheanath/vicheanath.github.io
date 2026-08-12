import { useEffect } from 'react';
import { SITE_NAME, DEFAULT_DESCRIPTION, canonicalUrl } from '../lib/site';
import { collectHead } from '../lib/head';

interface SeoProps {
  title: string;
  description?: string;
  /** Path without leading slash, e.g. "posts" or "post/my-slug". */
  path?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  /** Keep the page out of search results (error pages, thin utility pages). */
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(name: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  document.querySelector(`meta[${attr}="${name}"]`)?.remove();
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"][href]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function syncJsonLd(items: Record<string, unknown>[]) {
  const scripts = Array.from(document.querySelectorAll<HTMLScriptElement>('script[data-seo-jsonld="true"]'));

  items.forEach((item, index) => {
    const script = scripts[index] ?? document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoJsonld = 'true';
    script.textContent = JSON.stringify(item);
    if (!scripts[index]) {
      document.head.appendChild(script);
    }
  });

  scripts.slice(items.length).forEach((script) => script.remove());
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  type = 'website',
  publishedTime,
  noindex = false,
  jsonLd,
}: SeoProps) {
  const url = canonicalUrl(path);
  const jsonLdItems = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  if (import.meta.env.SSR) {
    // Prerender pass: hand the metadata to the build instead of the DOM.
    collectHead({ title, description, url, type, publishedTime, noindex, jsonLd: jsonLdItems });
  }

  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:type', type === 'article' ? 'article' : 'website', true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', 'en_US', true);
    setMeta('robots', noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large');
    setMeta('author', SITE_NAME);
    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setLink('canonical', url);

    if (publishedTime) {
      setMeta('article:published_time', publishedTime, true);
    } else {
      removeMeta('article:published_time', true);
    }

    syncJsonLd(jsonLdItems);
    // jsonLdItems is rebuilt every render; the JSON string is the real input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, url, type, publishedTime, noindex, JSON.stringify(jsonLdItems)]);

  return null;
}
