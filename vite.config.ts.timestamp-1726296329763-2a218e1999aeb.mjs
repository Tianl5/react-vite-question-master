// vite.config.ts
import { defineConfig } from "file:///D:/360MoveData/Users/linziliang/Desktop/%E7%BB%B4%E6%8A%A4%E9%A1%B9%E7%9B%AE/react-typescript-nest/my-vite-react/node_modules/vite/dist/node/index.js";
import react from "file:///D:/360MoveData/Users/linziliang/Desktop/%E7%BB%B4%E6%8A%A4%E9%A1%B9%E7%9B%AE/react-typescript-nest/my-vite-react/node_modules/@vitejs/plugin-react/dist/index.mjs";

// src/axios/index.ts
import axios from "file:///D:/360MoveData/Users/linziliang/Desktop/%E7%BB%B4%E6%8A%A4%E9%A1%B9%E7%9B%AE/react-typescript-nest/my-vite-react/node_modules/axios/index.js";
import { message } from "file:///D:/360MoveData/Users/linziliang/Desktop/%E7%BB%B4%E6%8A%A4%E9%A1%B9%E7%9B%AE/react-typescript-nest/my-vite-react/node_modules/antd/lib/index.js";
var baseUrl = "/fs";
var proxyRewrite = "fs";
var api = axios.create({
  timeout: 1 * 1e3
});
api.interceptors.response.use(
  (res) => {
    const resData = res.data || {};
    const { errno, msg, data } = resData;
    console.log(resData, "resDataresData");
    console.log(errno, "errnoerrnoerrno");
    if (errno !== 0) {
      if (msg) {
        message.error(msg);
      }
      throw new Error(msg);
    }
    return data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    react()
    // viteEslint({
    //   failOnError: false
    // })
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  server: {
    host: "0.0.0.0",
    open: true,
    hmr: true,
    port: 5173,
    //启动端口
    // 设置 https 代理
    proxy: {
      [baseUrl]: {
        //本地
        target: "http://localhost:3001",
        // 线上
        // target: 'http://114.132.217.213:8898',
        changeOrigin: true,
        ws: true,
        // 开启webSocket
        rewrite: (path) => path.replace(`/^/${proxyRewrite}/`, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL2F4aW9zL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcMzYwTW92ZURhdGFcXFxcVXNlcnNcXFxcbGluemlsaWFuZ1xcXFxEZXNrdG9wXFxcXFx1N0VGNFx1NjJBNFx1OTg3OVx1NzZFRVxcXFxyZWFjdC10eXBlc2NyaXB0LW5lc3RcXFxcbXktdml0ZS1yZWFjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcMzYwTW92ZURhdGFcXFxcVXNlcnNcXFxcbGluemlsaWFuZ1xcXFxEZXNrdG9wXFxcXFx1N0VGNFx1NjJBNFx1OTg3OVx1NzZFRVxcXFxyZWFjdC10eXBlc2NyaXB0LW5lc3RcXFxcbXktdml0ZS1yZWFjdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMzYwTW92ZURhdGEvVXNlcnMvbGluemlsaWFuZy9EZXNrdG9wLyVFNyVCQiVCNCVFNiU4QSVBNCVFOSVBMSVCOSVFNyU5QiVBRS9yZWFjdC10eXBlc2NyaXB0LW5lc3QvbXktdml0ZS1yZWFjdC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyBiYXNlVXJsLCBwcm94eVJld3JpdGUgfSBmcm9tICcuL3NyYy9heGlvcy9pbmRleCdcbi8vIGltcG9ydCB2aXRlRXNsaW50IGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCdcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICAvLyB2aXRlRXNsaW50KHtcbiAgICAvLyAgIGZhaWxPbkVycm9yOiBmYWxzZVxuICAgIC8vIH0pXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiAnL3NyYycsXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogJzAuMC4wLjAnLFxuICAgIG9wZW46IHRydWUsXG4gICAgaG1yOiB0cnVlLFxuICAgIHBvcnQ6IDUxNzMsIC8vXHU1NDJGXHU1MkE4XHU3QUVGXHU1M0UzXG4gICAgLy8gXHU4QkJFXHU3RjZFIGh0dHBzIFx1NEVFM1x1NzQwNlxuICAgIHByb3h5OiB7XG4gICAgICBbYmFzZVVybF06IHtcbiAgICAgICAgLy9cdTY3MkNcdTU3MzBcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAxJyxcbiAgICAgICAgLy8gXHU3RUJGXHU0RTBBXG4gICAgICAgIC8vIHRhcmdldDogJ2h0dHA6Ly8xMTQuMTMyLjIxNy4yMTM6ODg5OCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgd3M6IHRydWUsIC8vIFx1NUYwMFx1NTQyRndlYlNvY2tldFxuICAgICAgICByZXdyaXRlOiAocGF0aDogc3RyaW5nKSA9PiBwYXRoLnJlcGxhY2UoYC9eXFwvJHtwcm94eVJld3JpdGV9L2AsICcnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXDM2ME1vdmVEYXRhXFxcXFVzZXJzXFxcXGxpbnppbGlhbmdcXFxcRGVza3RvcFxcXFxcdTdFRjRcdTYyQTRcdTk4NzlcdTc2RUVcXFxccmVhY3QtdHlwZXNjcmlwdC1uZXN0XFxcXG15LXZpdGUtcmVhY3RcXFxcc3JjXFxcXGF4aW9zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwzNjBNb3ZlRGF0YVxcXFxVc2Vyc1xcXFxsaW56aWxpYW5nXFxcXERlc2t0b3BcXFxcXHU3RUY0XHU2MkE0XHU5ODc5XHU3NkVFXFxcXHJlYWN0LXR5cGVzY3JpcHQtbmVzdFxcXFxteS12aXRlLXJlYWN0XFxcXHNyY1xcXFxheGlvc1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMzYwTW92ZURhdGEvVXNlcnMvbGluemlsaWFuZy9EZXNrdG9wLyVFNyVCQiVCNCVFNiU4QSVBNCVFOSVBMSVCOSVFNyU5QiVBRS9yZWFjdC10eXBlc2NyaXB0LW5lc3QvbXktdml0ZS1yZWFjdC9zcmMvYXhpb3MvaW5kZXgudHNcIjtpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcbmltcG9ydCB7IG1lc3NhZ2UgfSBmcm9tICdhbnRkJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGJhc2VVcmwgPSAnL2ZzJ1xyXG5leHBvcnQgY29uc3QgcHJveHlSZXdyaXRlID0gJ2ZzJ1xyXG5jb25zdCBhcGkgPSBheGlvcy5jcmVhdGUoe1xyXG4gIHRpbWVvdXQ6IDEgKiAxMDAwLFxyXG59KVxyXG5cclxuLy8gXHU2MkU2XHU2MjJBXHU1NjY4LCBcdTdFREZcdTRFMDBcdTU5MDRcdTc0MDZlcnJub1x1NTQ4Q21zZ1xyXG5hcGkuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShcclxuICAocmVzKSA9PiB7XHJcbiAgICBjb25zdCByZXNEYXRhID0gKHJlcy5kYXRhIHx8IHt9KSBhcyBSZXNUeXBlXHJcbiAgICBjb25zdCB7IGVycm5vLCBtc2csIGRhdGEgfSA9IHJlc0RhdGFcclxuICAgIGNvbnNvbGUubG9nKHJlc0RhdGEsICdyZXNEYXRhcmVzRGF0YScpXHJcbiAgICBjb25zb2xlLmxvZyhlcnJubywgJ2Vycm5vZXJybm9lcnJubycpXHJcbiAgICBpZiAoZXJybm8gIT09IDApIHtcclxuICAgICAgaWYgKG1zZykge1xyXG4gICAgICAgIG1lc3NhZ2UuZXJyb3IobXNnKVxyXG4gICAgICB9XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YSBhcyBhbnlcclxuICB9LFxyXG4gIChlcnIpID0+IHtcclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXHJcbiAgfSxcclxuKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpXHJcblxyXG5leHBvcnQgdHlwZSBSZXNUeXBlID0ge1xyXG4gIGVycm5vOiBudW1iZXJcclxuICBkYXRhPzogUmVzRGF0YVR5cGVcclxuICBtc2c/OiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUmVzRGF0YVR5cGUgPSB7XHJcbiAgW2tleTogc3RyaW5nXTogYW55XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrZCxTQUFTLG9CQUFvQjtBQUMvZSxPQUFPLFdBQVc7OztBQ0RzZCxPQUFPLFdBQVc7QUFDMWYsU0FBUyxlQUFlO0FBRWpCLElBQU0sVUFBVTtBQUNoQixJQUFNLGVBQWU7QUFDNUIsSUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLEVBQ3ZCLFNBQVMsSUFBSTtBQUNmLENBQUM7QUFHRCxJQUFJLGFBQWEsU0FBUztBQUFBLEVBQ3hCLENBQUMsUUFBUTtBQUNQLFVBQU0sVUFBVyxJQUFJLFFBQVEsQ0FBQztBQUM5QixVQUFNLEVBQUUsT0FBTyxLQUFLLEtBQUssSUFBSTtBQUM3QixZQUFRLElBQUksU0FBUyxnQkFBZ0I7QUFDckMsWUFBUSxJQUFJLE9BQU8saUJBQWlCO0FBQ3BDLFFBQUksVUFBVSxHQUFHO0FBQ2YsVUFBSSxLQUFLO0FBQ1AsZ0JBQVEsTUFBTSxHQUFHO0FBQUEsTUFDbkI7QUFDQSxZQUFNLElBQUksTUFBTSxHQUFHO0FBQUEsSUFDckI7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsQ0FBQyxRQUFRO0FBQ1AsV0FBTyxRQUFRLE9BQU8sR0FBRztBQUFBLEVBQzNCO0FBQ0Y7OztBRHRCQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUE7QUFBQTtBQUFBLElBRU4sT0FBTztBQUFBLE1BQ0wsQ0FBQyxPQUFPLEdBQUc7QUFBQTtBQUFBLFFBRVQsUUFBUTtBQUFBO0FBQUE7QUFBQSxRQUdSLGNBQWM7QUFBQSxRQUNkLElBQUk7QUFBQTtBQUFBLFFBQ0osU0FBUyxDQUFDLFNBQWlCLEtBQUssUUFBUSxNQUFPLFlBQVksS0FBSyxFQUFFO0FBQUEsTUFDcEU7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
