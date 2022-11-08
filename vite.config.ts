import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvg } from './src/icons/index'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import compressPlugin from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvg('./src/icons/svg/'),
    Components({
      resolvers: [VantResolver()],
      dts: 'src/types/components.d.ts'
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/types/auto-import.d.ts'
    }),
    createStyleImportPlugin({
      libs: [{ libraryName: 'vant', esModule: true, resolveStyle: (name) => `../es/${name}/style/index` }]
    }),
    compressPlugin({
      ext: '.gz', //gz br
      algorithm: 'gzip', //brotliCompress gzip
      deleteOriginFile: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: { // 配置scss全局变量
      scss: {
        additionalData: '@import "@/styles/config.scss";' // 引入全局scss
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8888,
    open: true,
    https: false,
    proxy: {}
  }
})
