import { expect, test } from '@playwright/test';

const FAKE_TOKEN = 'test-refresh-token';

test.describe('Lessons page', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      { name: 'refresh_token', value: FAKE_TOKEN, domain: 'localhost', path: '/' },
    ]);
  });

  test('does not redirect to /login', async ({ page }) => {
    await page.goto('/lessons');
    await expect(page).toHaveURL(/\/lessons/);
  });

  test('document title contains "Lessons"', async ({ page }) => {
    await page.goto('/lessons');
    await expect(page).toHaveTitle(/Lessons/);
  });

  test('page body renders without JS crash', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));

    await page.goto('/lessons');
    await page.waitForLoadState('networkidle').catch(() => null);

    expect(errors).toHaveLength(0);
  });
});
