import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/FloodGuard/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'FloodGuard',
        short_name: 'FloodGuard',
        description: 'AI-Powered Urban Flood Nowcasting and Early Warning System',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/FloodGuard/',
        scope: '/FloodGuard/',
        icons: [
          {
            src: '/FloodGuard/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/FloodGuard/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },

      workbox: {
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})