// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { visualizer } from 'rollup-plugin-visualizer';
// import viteImagemin from 'vite-plugin-imagemin';
// import { createHtmlPlugin } from 'vite-plugin-html';
// import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// export default defineConfig({
//   optimizeDeps: {
//     include: ['react', 'react-dom', '@fortawesome/fontawesome-svg-core'],
//     exclude: ['some-heavy-module'], // Exclude heavy modules
//   },
//   build: {
//     cssCodeSplit: true, // Split CSS into separate files
//     sourcemap: false, // Disable source maps for production
//     minify: 'terser', // Minify JavaScript
//     cssMinify: true, // Minify CSS
//     assetsInlineLimit: 4096, // Inline small assets (less than 4KB)
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           react: ['react', 'react-dom'], // Create a separate chunk for React
//           vendor: ['lodash', 'axios'], // Create a separate chunk for other large dependencies
//         },
//       },
//     },
//   },
//   plugins: [
//     react(), // Enable React plugin
//     visualizer(), // Visualize bundle size
//     viteImagemin({
//       gifsicle: { optimizationLevel: 3 }, // Optimize GIFs
//       mozjpeg: { quality: 80 }, // Optimize JPEGs
//       pngquant: { quality: [0.8, 0.9] }, // Optimize PNGs
//       svgo: false,
//     }),
//     createHtmlPlugin({
//       minify: true, // Minify HTML
//       inject: {
//         data: {
//           title: 'CipherShield Tech', // Inject title
//           injectScript: `<style>
//             /* Critical CSS */
//             body { background: #fff; color: #000; }
//             .hero { display: flex; align-items: center; }
//           </style>`,
//         },
//       },
//     }),
//     ViteImageOptimizer({
//       include: ['**/*.{png,jpg,jpeg,svg,gif,webp,avif}'], // Include image formats
//       exclude: ['**/node_modules/**'], // Exclude node_modules
//       optimizerOptions: {
//         png: { quality: 80 }, // Optimize PNGs
//         jpeg: { quality: 80 }, // Optimize JPEGs
//         svg: { multipass: true }, // Optimize SVGs
//         webp: { quality: 80 }, // Optimize WebP
//       },
//     }),
//   ],
//   server: { proxy: {
//     '/api': {
//       target: 'http://localhost:8000',
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api/, '')
//     }
//   },
//     hmr: {
//       overlay: false, // Disable HMR overlay
//     },
//     watch: {
//       usePolling: true, // Enable polling for file changes
//       interval: 1000, // Set polling interval to 1 second
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteImagemin from 'vite-plugin-imagemin';
import { createHtmlPlugin } from 'vite-plugin-html';
import { compression } from 'vite-plugin-compression2';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: '/',
  optimizeDeps: {
    include: [
      'react', 
      'react-dom',
      'react-router-dom',
      '@fortawesome/fontawesome-svg-core'
    ],
    exclude: ['js-big-decimal']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: isProduction ? false : true,
    minify: isProduction ? 'terser' : false,
    cssMinify: isProduction,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('lodash') || id.includes('axios')) {
              return 'vendor-utils';
            }
            return 'vendor';
          }
        },
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`
      }
    },
    terserOptions: {
      compress: {
        drop_console: isProduction,
        drop_debugger: isProduction
      }
    }
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    
    visualizer({
      open: !isProduction,
      filename: 'bundle-analysis.html'
    }),
    
    // Safe image optimization configuration
    viteImagemin({
      gifsicle: {
        optimizationLevel: 1, // Safer optimization
        interlaced: false,
        colors: 128 // Reduce color palette
      },
      mozjpeg: {
        quality: 75, // Slightly reduced quality
        progressive: true
      },
      optipng: {
        optimizationLevel: 3, // Reduced from 5
        bitDepthReduction: true,
        colorTypeReduction: true
      },
      svgo: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                removeDimensions: true
              }
            }
          }
        ]
      },
      // Disable problematic formats
      webp: false,
      pngquant: false
    }),
    
    createHtmlPlugin({
      minify: isProduction,
      inject: {
        data: {
          title: 'CipherShield Tech',
          description: 'Secure your digital assets with CipherShield',
          injectScript: `
            <link rel="preload" href="/assets/main.css" as="style">
            <link rel="preload" href="/assets/main.js" as="script">
            <style>
              body { margin: 0; font-family: system-ui, sans-serif; }
              .app-loading { height: 100vh; display: grid; place-items: center; }
            </style>
          `
        }
      }
    }),
    
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br|gz)$/, /\.(png|jpg|jpeg|webp)$/],
      deleteOriginalAssets: false
    })
  ],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      }
    },
    hmr: {
      overlay: false
    },
    watch: {
      usePolling: true,
      interval: 1000
    }
  },
  css: {
    devSourcemap: !isProduction,
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@assets': '/src/assets'
    }
  }
});