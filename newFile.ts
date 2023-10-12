import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

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
// resolve: {
//   alias: {
//     '@': path.resolve(__dirname, './src'),
//   },
// },
resolve: {
alias: [
{
'@': path.resolve(__dirname, './src'),
},
]
},
optimizeDeps: {
include: ['fast-deep-equal'],
},
});
