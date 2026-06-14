import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const AUTH_FILE = path.join(__dirname, 'e2e/.auth/user.json');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    // Logs in once with real credentials, saves cookies to e2e/.auth/user.json.
    // Requires a running backend. Set E2E_USER_EMAIL / E2E_USER_PASSWORD in env.
    { name: 'setup', testMatch: '**/setup/auth.setup.ts' },

    // All spec files start as authenticated (storageState from setup).
    // Tests that need unauthenticated state call:
    //   test.use({ storageState: { cookies: [], origins: [] } })
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: AUTH_FILE },
      dependencies: ['setup'],
    },
  ],
});
