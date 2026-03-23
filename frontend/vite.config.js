import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  server: {
    https: true, host: true, port: 5173,
    proxy: {
      "/api": "http://backend:3000"
    }
  },
  plugins: [react(), basicSsl(), tailwindcss()],
})
