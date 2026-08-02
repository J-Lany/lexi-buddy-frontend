import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const AUTH_FILE = path.join(__dirname, 'e2e/.auth/user.json');

// Specs that mock the API themselves (see e2e/fixtures) and run under
// chromium-touch / webkit-mobile / chromium-desktop-mocked instead of the
// live-backend `chromium` project. Named explicitly (not inferred from "not
// a desktop project" or similar) so a new live-backend spec added later
// defaults to running under `chromium`, and a new mocked spec has to be added
// here deliberately rather than leaking into `chromium` by accident.
const MOCKED_SPECS = [
  '**/lesson-tooltips*.spec.ts',
  '**/entity-lists.spec.ts',
  '**/radix-neighbors.spec.ts',
];

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
      // All spec files start as authenticated (storageState from setup).
      // Tests that need unauthenticated state call:
      //   test.use({ storageState: { cookies: [], origins: [] } })
      use: { ...devices['Desktop Chrome'], storageState: AUTH_FILE },
      dependencies: ['setup'],
      // Explicitly excludes the mocked specs (see MOCKED_SPECS above) —
      // this project requires a live backend via `setup` and has no
      // `hasTouch`, so it must never run tap()-based or mock-only specs.
      testIgnore: MOCKED_SPECS,
    },
    // Touch/mobile projects for bug repro + regression specs that need a real
    // touch input pipeline (tap vs click) and, for webkit-mobile, WebKit's
    // pointer/focus event handling — jsdom/Chrome can't stand in for either.
    // No `dependencies: ['setup']`: these specs mock the API themselves
    // (see e2e/fixtures) so they don't need a live backend to authenticate.
    // Scoped via testMatch (allowlist) rather than relying on `chromium`
    // excluding them, so this remains correct even if `chromium`'s
    // testIgnore is ever changed independently.
    {
      name: 'chromium-touch',
      testMatch: MOCKED_SPECS,
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'webkit-mobile',
      testMatch: MOCKED_SPECS,
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
