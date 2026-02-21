import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For GitHub Project Pages (site at /repo-name/), set base: '/vicheanath.github.io/'
export default defineConfig({
  plugins: [react()],
  // base: '/vicheanath.github.io/',
})
