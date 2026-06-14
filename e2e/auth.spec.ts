import { expect, test } from '@playwright/test';

// Middleware only checks cookie existence, not validity —
// a fake token is enough to test route protection.
const FAKE_TOKEN = 'test-refresh-token';

const PRIVATE_ROUTES = ['/lessons', '/students', '/groups', '/profile'];
const AUTH_ROUTES = ['/login', '/register'];

test.describe('Unauthenticated user → redirected to /login', () => {
  // Clear the default authenticated storageState from playwright.config.ts
  test.use({ storageState: { cookies: [], origins: [] } });

  for (const route of PRIVATE_ROUTES) {
    test(`GET ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveURL('/login');
    });
  }
});

test.describe('Authenticated user → not redirected from private pages', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      { name: 'refresh_token', value: FAKE_TOKEN, domain: 'localhost', path: '/' },
    ]);
  });

  for (const route of PRIVATE_ROUTES) {
    test(`GET ${route} stays on ${route}`, async ({ page }) => {
      await page.goto(route);
      // Middleware lets through; page may show error state without backend — that's OK
      await expect(page).toHaveURL(new RegExp(route));
    });
  }
});

test.describe('Authenticated user → redirected away from auth pages', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      { name: 'refresh_token', value: FAKE_TOKEN, domain: 'localhost', path: '/' },
    ]);
  });

  for (const route of AUTH_ROUTES) {
    test(`GET ${route} → /students`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveURL('/students');
    });
  }
});

// ─── Login flow (requires backend) ───────────────────────────────────────────
// Reads credentials from env so CI can inject staging secrets.
// Locally: set E2E_USER_EMAIL / E2E_USER_PASSWORD or the defaults from seed.

const EMAIL = process.env.E2E_USER_EMAIL ?? 'anna.ivanovna@example.com';
const PASSWORD = process.env.E2E_USER_PASSWORD ?? 'Password123';

// Selectors — FieldLabel doesn't propagate htmlFor, so we use autocomplete attrs.
const emailInput = 'input[autocomplete="email"]';
const passwordInput = 'input[autocomplete="current-password"]';
const submitButton = { role: 'button' as const, name: 'Continue' };

test.describe('Login flow', () => {
  // Must start unauthenticated so middleware doesn't skip the login page.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('valid credentials → redirects to /students', async ({ page }) => {
    await page.goto('/login');
    await page.locator(emailInput).fill(EMAIL);
    await page.locator(passwordInput).fill(PASSWORD);
    await page.getByRole(submitButton.role, { name: submitButton.name }).click();
    await expect(page).toHaveURL('/students', { timeout: 10_000 });
  });

  test('wrong password → shows error message, stays on /login', async ({ page }) => {
    await page.goto('/login');
    await page.locator(emailInput).fill(EMAIL);
    await page.locator(passwordInput).fill('wrong-password-123');
    await page.getByRole(submitButton.role, { name: submitButton.name }).click();
    // Error banner rendered with text-destructive class
    await expect(page.locator('.text-destructive').first()).toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL('/login');
  });

  test('after login → logout → /students redirects to /login', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.locator(emailInput).fill(EMAIL);
    await page.locator(passwordInput).fill(PASSWORD);
    await page.getByRole(submitButton.role, { name: submitButton.name }).click();
    await expect(page).toHaveURL('/students', { timeout: 10_000 });

    // Open user menu and log out
    await page.getByRole('button', { name: 'Account menu' }).click();
    await page.getByText('Log out').click();
    await expect(page).toHaveURL('/', { timeout: 5_000 });

    // Private route must now redirect to /login
    await page.goto('/students');
    await expect(page).toHaveURL('/login');
  });
});

test.describe('Logout', () => {
  // Start fresh so the test controls the cookie lifecycle explicitly.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('clearing refresh_token cookie → private page redirects to /login', async ({
    context,
    page,
  }) => {
    // Mock backend logout endpoint so no real server is needed
    await page.route('**/auth/logout', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }),
    );

    await context.addCookies([
      { name: 'refresh_token', value: FAKE_TOKEN, domain: 'localhost', path: '/' },
    ]);

    // Verify we can reach a private route
    await page.goto('/students');
    await expect(page).toHaveURL(/\/students/);

    // Simulate logout: remove cookie
    await context.clearCookies();

    // Now the private page must redirect.
    // waitUntil:'commit' avoids ERR_ABORTED from pending fetches on the previous page.
    await page.goto('/students', { waitUntil: 'commit' });
    await expect(page).toHaveURL('/login');
  });
});
