import { defineConfig, mergeConfig } from 'vite'
import base from './vite.config'

// Temporary: builds with the development React so hydration mismatches are logged in full.
export default defineConfig((env) =>
  mergeConfig(typeof base === 'function' ? base(env) : base, {
    define: { 'process.env.NODE_ENV': '"development"' },
    build: { minify: false },
  })
)
