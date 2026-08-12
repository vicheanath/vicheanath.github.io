import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For GitHub Project Pages (site at /repo-name/), set base: '/vicheanath.github.io/'
export default defineConfig({
  plugins: [react()],
  // base: '/vicheanath.github.io/',
  build: {
    // Prerendered HTML inlines the critical markup; keep source maps off and
    // assets hashed for long-lived caching.
    sourcemap: false,
  },
  ssr: {
    // The prerender bundle runs standalone in Node. Bundle everything so a
    // single React instance is used, except the browser-only diagram library,
    // which is dynamically imported and never executed during prerendering.
    noExternal: true,
    external: ['mermaid'],
  },
})
