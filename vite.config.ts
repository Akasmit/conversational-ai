import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite.config.ts
server: { port: 5174, proxy: { "/api": "http://localhost:8787" } },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
