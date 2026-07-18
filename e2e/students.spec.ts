import { expect, test } from '@playwright/test';

// Middleware checks cookie existence only — a fake token is enough.
const FAKE_TOKEN = 'test-refresh-token';

test.describe('Students page', () => {
  // Override the global authenticated storageState so we control the cookie ourselves.
  // This makes the tests runnable without a real backend (no auth.setup needed).
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      { name: 'refresh_token', value: FAKE_TOKEN, domain: 'localhost', path: '/' },
    ]);
  });

  test('does not redirect to /login', async ({ page }) => {
    await page.goto('/students');
    await expect(page).toHaveURL(/\/students/);
  });

  test('document title contains "Students"', async ({ page }) => {
    await page.goto('/students');
    await expect(page).toHaveTitle(/Students/);
  });

  test('search input is rendered', async ({ page }) => {
    await page.goto('/students');
    // StudentsPageClient renders a search Input with a placeholder
    await expect(page.locator('input').first()).toBeVisible();
  });
});
