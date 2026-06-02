import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // DYNAMIC BASE-URL:
  // if VITE_IS_PREVIEW is set to "true" in our GitHub Action, use a relative base for PR previews.
  base: process.env.VITE_IS_PREVIEW === 'true' ? './' : '/utilities/',
  plugins: [react()],
})
