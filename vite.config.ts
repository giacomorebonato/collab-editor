import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), VitePWA({ registerType: 'autoUpdate' })],
})
