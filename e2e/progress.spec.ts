import { expect, test } from '@playwright/test';

const FAKE_TOKEN = 'test-refresh-token';

// Route: /students/[id]/lessons/[lessonId]/progress
// Private route — middleware only checks cookie presence.
// With fake IDs the API will error, so the widget shows its error card.

test.describe('Student lesson progress page', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ context, page }) => {
    await context.addCookies([
      { name: 'refresh_token', value: FAKE_TOKEN, domain: 'localhost', path: '/' },
    ]);
    // Abort API calls so a fake token doesn't trigger a 401 → redirect cascade.
    // The page will show its error state, which is what these tests verify.
    await page.route('**/api-proxy/**', (route) => route.abort());
    await page.route(
      (url) => url.port === '4000',
      (route) => route.abort(),
    );
  });

  test('does not redirect to /login with valid cookie', async ({ page }) => {
    await page.goto('/students/1/lessons/1/progress');
    await expect(page).toHaveURL(/\/students\/\d+\/lessons\/\d+\/progress/);
  });

  test('renders error card when API is unavailable', async ({ page }) => {
    await page.goto('/students/1/lessons/1/progress');
    // After the loading skeleton, the widget shows DetailsErrorCard
    await expect(page.getByText('Unable to load progress')).toBeVisible({ timeout: 10_000 });
  });
});
