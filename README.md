# vicheanath.github.io

Personal blog and profile site. React + TypeScript + Vite, **prerendered to static HTML** at build time and deployed to GitHub Pages.

Every route ships as a real HTML document with its content, headings, `<title>`, canonical link, Open Graph tags and JSON-LD already in the markup — crawlers and social scrapers never have to run JavaScript. The client bundle hydrates that HTML for navigation, code copy buttons, search, and diagrams.

## Commands

```bash
pnpm dev
```

```bash
pnpm build
```

```bash
pnpm preview
```

Note: `pnpm preview` falls back to `index.html` for extension-less paths (`/posts`), which GitHub Pages does not do. Use trailing slashes (`/posts/`) when checking the prerendered output locally.

## Build pipeline

`pnpm build` runs these steps in order:

1. `scripts/generate-posts.js` — reads `src/content/posts/*.md`, parses frontmatter (title, date, excerpt, tags) and writes `src/generated/posts.json`.
2. `tsc -b` — type check.
3. `vite build` — client bundle + `dist/index.html` shell.
4. `vite build --ssr src/entry-server.tsx --outDir .ssr-dist` — server bundle used only by the prerenderer.
5. `scripts/prerender.js` — renders every route with React and writes `dist/<route>/index.html`, plus `404.html`.
6. `scripts/generate-sitemap.js` — `dist/sitemap.xml`.
7. `scripts/generate-rss.js` — `dist/rss.xml`.

`scripts/site-routes.js` is the single source of truth for which URLs exist (static pages, posts, tag pages); the prerenderer and the sitemap both read from it.

## Adding a post

Create `src/content/posts/my-post.md`:

```markdown
---
title: "My Post Title"
date: 2026-08-12
excerpt: "One or two sentences used for the list, meta description and RSS."
tags: [".NET", "Architecture"]
---

Markdown body. Fenced code blocks are syntax-highlighted at build time,
and ```mermaid blocks render as diagrams in the browser.
```

The build picks it up automatically: post page, home/archive listings, tag pages, sitemap and RSS.

## Structure

| Path | Purpose |
| --- | --- |
| `src/routes.tsx` | Route table shared by the browser router and the prerenderer |
| `src/entry-server.tsx` | Build-time render entry (`render(url) -> { html, head }`) |
| `src/lib/head.ts` | Collects `<Seo>` metadata during prerender and emits head markup |
| `src/lib/posts.ts` | Post/tag queries and reading-time helpers |
| `src/content/profile.ts` | Typed profile data with computed periods and durations |
| `src/components/Seo.tsx` | Per-page title, canonical, OG, Twitter and JSON-LD |

## Hydration rules

Prerendered markup must match the first client render exactly. Anything derived
from the current date or the browser is rendered client-side only —
see `Layout.tsx` (masthead date) and `LiveDuration.tsx` (résumé durations),
both using `useSyncExternalStore` with a `null` server snapshot.

## Deployment

`.github/workflows` builds on push to `main` and publishes `dist/` to GitHub Pages.
