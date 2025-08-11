import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isProductionMode = mode === 'production'

  return {
    plugins: [
      vue(),
    ],
    base: isProductionMode
        ? '/sites/lk/'
        : '/',
    build: {
      manifest: true,
      target: [
        'esnext',
        'chrome100',
        'edge100',
        'firefox100',
        'safari15'
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
