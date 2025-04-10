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

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { visualizer } from 'rollup-plugin-visualizer';
// import viteImagemin from 'vite-plugin-imagemin';
// import { createHtmlPlugin } from 'vite-plugin-html';
// import { compression } from 'vite-plugin-compression2';
// import { fileURLToPath } from 'url';
// import path from 'path';
// import autoprefixer from 'autoprefixer';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const isProduction = process.env.NODE_ENV === 'production';

// export default defineConfig({
//   base: '/',
//   optimizeDeps: {
//     include: [
//       'react', 
//       'react-dom',
//       'react-router-dom',
//       '@fortawesome/fontawesome-svg-core',
//       '@emotion/react',
//       '@emotion/styled',
//       'react-dom/client'
//     ],
//     exclude: ['js-big-decimal']
//   },
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//     emptyOutDir: true,
//     cssCodeSplit: true,
//     sourcemap: isProduction ? false : true,
//     minify: isProduction ? 'terser' : 'esbuild',
//     cssMinify: isProduction,
//     assetsInlineLimit: 4096,
//     chunkSizeWarningLimit: 1500,
//     commonjsOptions: {
//       transformMixedEsModules: true,
//       requireReturnsDefault: 'auto',
//       esmExternals: true
//     },
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             if (id.includes('react') || id.includes('react-dom')) {
//               return 'vendor-react';
//             }
//             if (id.includes('@emotion')) {
//               return 'vendor-emotion';
//             }
//             if (id.includes('react-dom/client')) {
//               return 'vendor-react-dom';
//             }
//             if (id.includes('lodash') || id.includes('axios')) {
//               return 'vendor-utils';
//             }
//             return 'vendor';
//           }
//         },
//         entryFileNames: `assets/[name]-[hash].js`,
//         chunkFileNames: `assets/[name]-[hash].js`,
//         assetFileNames: `assets/[name]-[hash].[ext]`,
//         hoistTransitiveImports: false
//       },
//       external: ['react-dom/client'],
//       preserveEntrySignatures: 'strict'
//     },
//     terserOptions: {
//       compress: {
//         hoist_vars: true,
//         keep_fnames: true,
//         keep_classnames: true,
//         passes: 2,
//         drop_console: isProduction,
//         drop_debugger: isProduction,
//         pure_funcs: ['console.log']
//       },
//       format: {
//         comments: false
//       },
//       mangle: {
//         reserved: ['$', 'exports', 'require']
//       }
//     }
//   },
//   plugins: [
//     react({
//       jsxImportSource: '@emotion/react',
//       babel: {
//         plugins: [
//           ['@emotion/babel-plugin', {
//             autoLabel: 'dev-only',
//             labelFormat: '[local]',
//             cssPropOptimization: true,
//             sourceMap: !isProduction
//           }]
//         ],
//         parserOpts: {
//           plugins: ['jsx']
//         }
//       }
//     }),
    
//     visualizer({
//       open: !isProduction,
//       filename: 'bundle-analysis.html',
//       gzipSize: true,
//       brotliSize: true
//     }),
    
//     viteImagemin({
//       gifsicle: false,
//       mozjpeg: {
//         quality: 80,
//         progressive: true
//       },
//       optipng: {
//         optimizationLevel: 3,
//         bitDepthReduction: true,
//         colorTypeReduction: true,
//         paletteReduction: true
//       },
//       svgo: {
//         plugins: [
//           {
//             name: 'preset-default',
//             params: {
//               overrides: {
//                 removeViewBox: false,
//                 cleanupIDs: false
//               }
//             }
//           }
//         ]
//       },
//       webp: false,
//       pngquant: false
//     }),
    
//     createHtmlPlugin({
//       minify: isProduction,
//       inject: {
//         data: {
//           title: 'CipherShield Tech',
//           description: 'Secure your digital assets with CipherShield',
//           injectScript: `
//             <link rel="preload" href="/assets/main.css" as="style">
//             <link rel="preload" href="/assets/main.js" as="script">
//             <style>
//               body { margin: 0; font-family: system-ui, sans-serif; }
//               .app-loading { height: 100vh; display: grid; place-items: center; }
//             </style>
//           `,
//           buildTime: new Date().toISOString()
//         }
//       },
//       template: 'public/index.html'
//     }),
    
//     compression({
//       algorithm: 'brotliCompress',
//       exclude: [/\.(br|gz)$/, /\.(png|jpg|jpeg|webp|svg)$/],
//       deleteOriginalAssets: false,
//       threshold: 10240,
//       compressionOptions: {
//         level: 11
//       }
//     })
//   ],
//   server: {
//     port: 3000,
//     strictPort: true,
//     host: true,
//     open: true,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//         secure: false,
//         ws: true
//       }
//     },
//     hmr: {
//       overlay: false,
//       protocol: 'ws',
//       host: 'localhost'
//     },
//     watch: {
//       usePolling: true,
//       interval: 1000,
//       ignored: ['**/node_modules/**', '**/.git/**']
//     }
//   },
//   css: {
//     devSourcemap: !isProduction,
//     modules: {
//       localsConvention: 'camelCaseOnly',
//       generateScopedName: isProduction ? '[hash:base64:8]' : '[name]__[local]--[hash:base64:5]'
//     },
//     preprocessorOptions: {
//       scss: {
//         additionalData: `@import "./src/styles/variables.scss";`,
//         charset: false
//       }
//     },
//     postcss: {
//       plugins: [autoprefixer()]
//     }
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//       '@components': path.resolve(__dirname, './src/components'),
//       '@assets': path.resolve(__dirname, './src/assets'),
//       '@emotion/react': path.dirname(require.resolve('@emotion/react/package.json')),
//       '@emotion/styled': path.dirname(require.resolve('@emotion/styled/package.json')),
//       'react/jsx-runtime': path.dirname(require.resolve('react/jsx-runtime/package.json'))
//     },
//     extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
//     preserveSymlinks: false,
//     dedupe: ['react', 'react-dom', '@emotion/react', '@emotion/styled']
//   },
//   define: {
//     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
//     'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
//     __BUILD_TIME__: JSON.stringify(new Date().toISOString())
//   }
// });


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