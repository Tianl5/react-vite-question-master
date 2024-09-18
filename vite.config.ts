import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { baseUrl, proxyRewrite } from './src/axios/index'
// import viteEslint from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // viteEslint({
    //   failOnError: false
    // })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: '0.0.0.0',
    open: true,
    hmr: true,
    port: 5173, //启动端口
    // 设置 https 代理
    proxy: {
      '/fs': {
        //本地
        target: 'http://localhost:3001',
        // 线上
        // target: 'http://114.132.217.213:8898',
        changeOrigin: true,
        ws: true, // 开启webSocket
        rewrite: (path: string) => path.replace(/^\/fs/, ''),
      },
    },
  },
})
