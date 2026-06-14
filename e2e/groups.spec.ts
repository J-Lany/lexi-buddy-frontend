import { expect, test } from '@playwright/test';

const FAKE_TOKEN = 'test-refresh-token';

test.describe('Groups page', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ context, page }) => {
    await context.addCookies([
      { name: 'refresh_token', value: FAKE_TOKEN, domain: 'localhost', path: '/' },
    ]);
    // Abort proxy API calls so a fake token doesn't trigger a 401 → redirect cascade.
    await page.route('**/api-proxy/**', (route) => route.abort());
  });

  test('does not redirect to /login', async ({ page }) => {
    await page.goto('/groups');
    await expect(page).toHaveURL(/\/groups/);
  });

  test('document title contains "Groups"', async ({ page }) => {
    await page.goto('/groups');
    await expect(page).toHaveTitle(/Groups/);
  });

  test('page body renders without JS crash', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));

    await page.goto('/groups');
    await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => null);

    expect(errors).toHaveLength(0);
  });
});
