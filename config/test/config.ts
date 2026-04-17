import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    restoreMocks: true,
    environment: 'jsdom',
    setupFiles: ['./config/test/setup.ts'],
    exclude: [
      'playwright/**/*.spec.ts',
      'cypress/**/*.cy.{js,ts,jsx,tsx}',
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/coverage/**',
    ],
  },
});
