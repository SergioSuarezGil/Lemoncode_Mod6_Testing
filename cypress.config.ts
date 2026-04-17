import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:5173',
    setupNodeEvents(on, config) {},
  },
});
