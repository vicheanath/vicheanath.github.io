import { defineConfig, mergeConfig } from 'vite'
import base from './vite.config'
export default defineConfig((env) =>
  mergeConfig(typeof base === 'function' ? base(env) : base, {
    define: { 'process.env.NODE_ENV': '"development"' },
    build: { minify: false },
  })
)
