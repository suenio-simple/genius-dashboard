import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/budget': {
        target: 'http://localhost:8080',
        rewrite: path => path.replace(/^\/api\/budget/, '/api'),
        changeOrigin: true
      },
      '/api/crm': {
        target: 'http://localhost:3000',
        rewrite: path => path.replace(/^\/api\/crm/, '/api'),
        changeOrigin: true
      }
    }
  }
})
