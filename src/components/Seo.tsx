import { useEffect } from 'react';
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from '../lib/site';

interface SeoProps {
  title: string;
  description?: string;
  /** Path without leading slash, e.g. "posts" or "post/my-slug". */
  path?: string;
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

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"][href]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({ title, description = DEFAULT_DESCRIPTION, path = '' }: SeoProps) {
  const url = path ? `${SITE_URL}/${path}` : SITE_URL;

  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setLink('canonical', url);
  }, [title, description, url]);

  return null;
}
