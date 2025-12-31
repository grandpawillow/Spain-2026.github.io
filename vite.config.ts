import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    base: '/',
    server: {
      base: '/',
      port: 3000,
      host: '0.0.0.0',
    },
    define: {
      // Prioritize VITE_ prefix for standard Vite behavior, fallback to injected API_KEY
      'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.API_KEY || process.env.API_KEY || ''),
    },
    build: {
      outDir: 'dist',
    }
  }
})