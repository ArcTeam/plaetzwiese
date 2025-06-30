import { defineConfig } from 'vite'

export default defineConfig({
  // Configurazione per GitHub Pages - IMPORTANTE!
  base: process.env.NODE_ENV === 'production' ? '/plaetzwiese/' : '/',
  root: '.',
  publicDir: 'public', // Sposta tutto in una cartella public/
  server: {
    port: 3001,
    open: true,
    host: true // Espone il server sulla rete locale
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    },
    // Ottimizzazioni per produzione
    minify: 'terser',
    sourcemap: false,
    reportCompressedSize: true
  },
  preview: {
    port: 3001,
    open: true
  },
  optimizeDeps: {
    include: ['three', 'leaflet', 'chart.js']
  },
  // Alias per import più puliti (opzionale)
  resolve: {
    alias: {
      '@': '/src',
      '@data': '/src/data',
      '@modules': '/src/modules',
      '@utils': '/src/utils'
    }
  }
})
