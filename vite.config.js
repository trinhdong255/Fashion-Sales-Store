import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: "local", // CSS mặc định là scoped/local
      generateScopedName: "[name]__[local]___[hash:base64:5]", // Tên class CSS module
      localsConvention: "camelCase", // Tên class CSS module 
    },
  },
})
