import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteImagemin from 'vite-plugin-imagemin';
import { createHtmlPlugin } from 'vite-plugin-html';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  optimizeDeps: {
    include: ['react', 'react-dom', '@fortawesome/fontawesome-svg-core'],
    exclude: ['some-heavy-module'], // Exclude heavy modules
  },
  build: {
    cssCodeSplit: true, // Split CSS into separate files
    sourcemap: false, // Disable source maps for production
    minify: 'terser', // Minify JavaScript
    cssMinify: true, // Minify CSS
    assetsInlineLimit: 4096, // Inline small assets (less than 4KB)
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'], // Create a separate chunk for React
          vendor: ['lodash', 'axios'], // Create a separate chunk for other large dependencies
        },
      },
    },
  },
  plugins: [
    react(), // Enable React plugin
    visualizer(), // Visualize bundle size
    viteImagemin({
      gifsicle: { optimizationLevel: 3 }, // Optimize GIFs
      mozjpeg: { quality: 80 }, // Optimize JPEGs
      pngquant: { quality: [0.8, 0.9] }, // Optimize PNGs
      svgo: false,
    }),
    createHtmlPlugin({
      minify: true, // Minify HTML
      inject: {
        data: {
          title: 'CipherShield Tech', // Inject title
          injectScript: `<style>
            /* Critical CSS */
            body { background: #fff; color: #000; }
            .hero { display: flex; align-items: center; }
          </style>`,
        },
      },
    }),
    ViteImageOptimizer({
      include: ['**/*.{png,jpg,jpeg,svg,gif,webp,avif}'], // Include image formats
      exclude: ['**/node_modules/**'], // Exclude node_modules
      optimizerOptions: {
        png: { quality: 80 }, // Optimize PNGs
        jpeg: { quality: 80 }, // Optimize JPEGs
        svg: { multipass: true }, // Optimize SVGs
        webp: { quality: 80 }, // Optimize WebP
      },
    }),
  ],
  server: { proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  },
    hmr: {
      overlay: false, // Disable HMR overlay
    },
    watch: {
      usePolling: true, // Enable polling for file changes
      interval: 1000, // Set polling interval to 1 second
    },
  },
});