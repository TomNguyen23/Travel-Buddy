import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // define: {
  //   // "process.env": process.env,
  //   // // By default, Vite doesn't include shims for NodeJS/
  //   // // necessary for segment analytics lib to work
  //   global: {},
  // },
  define: {
    global: 'window',
  },
  // server: {
  //   proxy: {
  //     '/ws': {
  //       target: 'https://travel-buddy-production-6a3f.up.railway.app/',
  //       changeOrigin: true,
  //       ws: true,
  //     },
  //   },
  // },
})

