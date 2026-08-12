import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import Router from './router'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <Router />
  </StrictMode>
)

// Production HTML is prerendered (scripts/prerender.js), so hydrate it.
// `vite dev` serves an empty shell, so fall back to a client render there.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
