import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // For repositories named 'username.github.io', the base should be '/'
    base: '/',

    plugins: [react()],

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    define: {
      // Prioritize VITE_ prefix for standard Vite behavior, fallback to GEMINI_API_KEY
      'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY),
    },
  }
})