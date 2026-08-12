/**
 * Build-time entry point. Bundled separately (`vite build --ssr`) and executed
 * by scripts/prerender.js to turn every route into a static HTML file.
 */
import { renderToString } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom';
import { routes } from './routes';
import { beginHeadCapture, renderHeadTags, takeHead } from './lib/head';
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from './lib/site';

const handler = createStaticHandler(routes);

export interface RenderResult {
  html: string;
  head: string;
}

/** Renders one route. `url` is a site-relative path such as "/" or "/post/x". */
export async function render(url: string): Promise<RenderResult> {
  const context = await handler.query(new Request(`${SITE_URL}${url}`));

  if (context instanceof Response) {
    throw new Error(`Route ${url} returned a Response (${context.status}) instead of markup.`);
  }

  const router = createStaticRouter(handler.dataRoutes, context);

  beginHeadCapture();
  // hydrate={false}: no loaders are used, and the hydration-data <script> it
  // would inject into the root has no counterpart in the client render, which
  // would fail hydration on every page.
  const html = renderToString(
    <StaticRouterProvider router={router} context={context} hydrate={false} />
  );
  const head = takeHead() ?? {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: `${SITE_URL}${url === '/' ? '' : url}`,
    type: 'website' as const,
    jsonLd: [],
  };

  return { html, head: renderHeadTags(head) };
}
