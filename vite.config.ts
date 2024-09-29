import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
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
        target: 'http://localhost:3000',
        // 线上
        // target: 'http://114.132.217.213:8898',
        changeOrigin: true,
        ws: true, // 开启webSocket
        rewrite: (path: string) => path.replace(/^\/fs/, ''),
      },
    },
  },
})
