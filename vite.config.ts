import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.*'],
      },
      manifest: {
        name: 'collab-editor',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
})
