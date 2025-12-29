import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Fix for __dirname in ESM environment
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  // Fix for 'cwd' does not exist on type 'Process' by importing process from node:process
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/Spain-2026.github.io/',

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    plugins: [react()],

    // Removed manual API_KEY definitions to prevent overwriting platform-injected process.env.API_KEY
    define: {
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  }
})
