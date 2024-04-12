import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import juno from '@junobuild/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), juno({ container: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
