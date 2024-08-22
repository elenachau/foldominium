import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
// import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs(),
    // createHtmlPlugin({
    //   inject: {
    //     data: {
    //       injectScript: '<script src="cpedit.js"></script>'
    //     },
    //   },
    // }),
  ]
})
