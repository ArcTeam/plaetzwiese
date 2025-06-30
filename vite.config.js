import { defineConfig } from 'vite'

export default defineConfig({
  // Configurazione per GitHub Pages - IMPORTANTE!
  base: process.env.NODE_ENV === 'production' ? '/plaetzwiese/' : '/',
  root: '.',
  publicDir: 'public', // Sposta tutto in una cartella public/
  server: {
    port: 3001,
    open: true,
    host: true, // Espone il server sulla rete locale
    hmr: {
      overlay: true
    },
    watch: {
      usePolling: true // Utile per alcuni filesystem
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks: {
          // Separa le librerie principali in chunk dedicati
          'vendor-three': ['three'],
          'vendor-leaflet': ['leaflet'],
          'vendor-chart': ['chart.js'],
          // Raggruppa utility e moduli dell'app
          'app-modules': [
            './src/modules/MapManager.js',
            './src/modules/VideoManager.js',
            './src/modules/ChartManager.js',
            './src/modules/Viewer360.js'
          ]
        }
      }
    },
    // Ottimizzazioni per produzione
    minify: 'terser',
    sourcemap: false,
    reportCompressedSize: true,
    // Aumenta il limite per evitare warning (opzionale)
    chunkSizeWarningLimit: 1000
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
