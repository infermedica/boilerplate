import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from "url";

import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        plugins: [
          'removeDimensions',
          'removeUselessStrokeAndFill',
          'convertStyleToAttrs',
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      { 
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  optimizeDeps: {
    include: ['fast-deep-equal'],
  },
});
