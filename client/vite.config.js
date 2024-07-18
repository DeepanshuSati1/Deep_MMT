import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      'node_modules/.vite/deps/chunk-2SCRIXUQ.js',
      'node_modules/.vite/deps/chunk-OBKFDZH2.js',
    ],
  },
})
