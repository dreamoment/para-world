import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'


export default defineConfig({
  plugins: [
    vue(),
    dts()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'package/index.ts'),
      formats: [ 'es' ],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [ 'three' ],
    },
  },
})
