import { expect, test } from '@playwright/test';

// /confirm-password-change is a public route — no cookie needed.
// Without a ?token param the view immediately shows the error card (no mutation fired).

test.describe('Confirm password change page', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('accessible without authentication', async ({ page }) => {
    await page.goto('/confirm-password-change');
    await expect(page).toHaveURL('/confirm-password-change');
  });

  test('shows error card when token is missing', async ({ page }) => {
    await page.goto('/confirm-password-change');
    // ConfirmPasswordView renders <ConfirmPasswordError> immediately when !token
    // The error card contains a "Go to settings" button
    await expect(page.getByRole('button', { name: /settings/i })).toBeVisible();
  });

  test('renders the Lexi Buddy home link', async ({ page }) => {
    await page.goto('/confirm-password-change');
    await expect(page.getByRole('link', { name: 'Lexi Buddy home' })).toBeVisible();
  });
});
