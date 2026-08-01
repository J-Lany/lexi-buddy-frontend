import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    // Auth setup — runs before chromium to create e2e/.auth/user.json.
    // Requires backend + E2E_USER_EMAIL / E2E_USER_PASSWORD in env.
    // Failure here blocks chromium (see dependencies below) so we can catch
    // auth problems early without silently running tests in a bad state.
    { name: 'setup', testMatch: '**/setup/auth.setup.ts' },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    // Touch/mobile projects for bug repro + regression specs that need a real
    // touch input pipeline (tap vs click) and, for webkit-mobile, WebKit's
    // pointer/focus event handling — jsdom/Chrome can't stand in for either.
    // No `dependencies: ['setup']`: these specs mock the API themselves
    // (see e2e/fixtures) so they don't need a live backend to authenticate.
    // Scoped via testMatch so the existing chromium-only suites don't get
    // tripled in CI runtime by running under these too.
    {
      name: 'chromium-touch',
      testMatch: [
        '**/lesson-tooltips*.spec.ts',
        '**/entity-lists.spec.ts',
        '**/radix-neighbors.spec.ts',
      ],
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'webkit-mobile',
      testMatch: [
        '**/lesson-tooltips*.spec.ts',
        '**/entity-lists.spec.ts',
        '**/radix-neighbors.spec.ts',
      ],
      use: { ...devices['iPhone 13'] },
    },
    // Desktop mouse/keyboard coverage for the same mocked specs, without the
    // `setup` -> live backend dependency the plain `chromium` project has.
    // radix-neighbors.spec.ts is touch-only (uses `.tap()` throughout, no
    // desktop/click path) so it's deliberately not included here.
    {
      name: 'chromium-desktop-mocked',
      testMatch: ['**/lesson-tooltips*.spec.ts', '**/entity-lists.spec.ts'],
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
