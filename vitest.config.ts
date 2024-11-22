import react from '@vitejs/plugin-react'
import path from 'path'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'lcov', 'html', 'json'],
      exclude: [
        '**/*.config.**',
        '**/*.stories.{ts,tsx}',
        '**/app/**/*',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
