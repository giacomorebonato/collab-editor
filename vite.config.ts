import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['**/*'],
      outDir: './dist/assets',
    }),
  ],
})
