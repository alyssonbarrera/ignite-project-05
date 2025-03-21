import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@test': '/test',
    },
  },
  test: {
    root: './',
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/**'],
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
