import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  // 设置scss的api类型为modern-compiler(暂时移除答应警告The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.)
  css: {  
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  server: {
    host: true,
    port: 8100,
    proxy: {
      '/infra': {
        target: 'http://101.200.243.192:624',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/infra/, '')
      }
    }
  },
})
