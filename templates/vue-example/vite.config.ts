import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import juno from '@junobuild/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), juno({ container: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
