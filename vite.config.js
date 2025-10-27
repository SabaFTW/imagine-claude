import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 🔥 Allow network access!
    port: 5173,
    open: true,
    // Fallback to index.html for all routes (SPA support)
    historyApiFallback: true
  },
  // GitHub Pages base path (only for production builds)
  base: process.env.NODE_ENV === 'production' ? '/imagine-claude/' : '/'
})
