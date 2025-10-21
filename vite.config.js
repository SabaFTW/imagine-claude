import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Fallback to index.html for all routes (SPA support)
    historyApiFallback: true
  },
  // Ensure base URL is correct for hash routing
  base: './'
})
