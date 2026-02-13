import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Proxy API requests to backend to avoid cross-origin cookie issues in dev
      '/api': {
        target: 'http://192.168.1.99:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
