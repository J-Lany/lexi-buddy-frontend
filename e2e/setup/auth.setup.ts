import { test as setup } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '../.auth/user.json');

const EMAIL = process.env.E2E_USER_EMAIL ?? 'anna.ivanovna@example.com';
const PASSWORD = process.env.E2E_USER_PASSWORD ?? 'Password123';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.locator('input[autocomplete="email"]').fill(EMAIL);
  await page.locator('input[autocomplete="current-password"]').fill(PASSWORD);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForURL('/students', { timeout: 10_000 });

  // Persist cookies (includes refresh_token) for all tests in the chromium project.
  await page.context().storageState({ path: AUTH_FILE });
});
