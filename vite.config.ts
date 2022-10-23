import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvg } from './src/icons/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvg('./src/icons/svg/'),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/main.scss";'
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
