import { expect, test } from '@playwright/test';

import { CONSENT_VERSION } from '../src/shared/lib/cookie-consent';

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
  // Requires a running backend with valid credentials.
  // In CI without backend these tests are skipped automatically.
  // To enable: set E2E_USER_EMAIL + E2E_USER_PASSWORD environment variables.
  test.beforeEach(({}, testInfo) => {
    testInfo.skip(
      !process.env.E2E_USER_EMAIL,
      'Requires backend — set E2E_USER_EMAIL + E2E_USER_PASSWORD',
    );
  });

  // Pre-accept cookie consent and fix cookie domain issues caused by the API proxy.
  // Next.js rewrites don't reliably forward Set-Cookie to the browser under localhost,
  // so we intercept /auth/login, call the backend directly from Node.js, and inject
  // the returned cookies into the browser context with domain=localhost.
  test.beforeEach(async ({ page, context }) => {
    // Must match ConsentRecord in src/shared/lib/cookie-consent.ts exactly —
    // isValidConsentRecord() rejects anything else, needsConsent() then
    // returns true, and the cookie banner covers the whole page (including
    // the login form's submit button).
    await page.addInitScript((version) => {
      localStorage.setItem(
        'lexi.cookie-consent',
        JSON.stringify({
          version,
          date: new Date().toISOString(),
          categories: { necessary: true, functional: true },
        }),
      );
    }, CONSENT_VERSION);

    const BACKEND = process.env.BACKEND_API_URL?.replace(/\/$/, '');
    if (!BACKEND) return;

    // Abort all API calls except auth/login and auth/logout. This prevents
    // /auth/me refetches and /auth/refresh from triggering 401 → redirect cascade
    // after cookies are cleared by the logout interceptor.
    await page.route(
      (url) =>
        (url.port === '4000' || url.href.includes('/api-proxy/')) &&
        !url.pathname.endsWith('/auth/login') &&
        !url.pathname.endsWith('/auth/logout'),
      (route) => route.abort(),
    );

    await page.route('**/api-proxy/auth/login', async (route) => {
      if (route.request().method() !== 'POST') {
        await route.continue();
        return;
      }
      const reqData: unknown = route.request().postDataJSON();
      const res = await fetch(`${BACKEND}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData),
      });
      const body: unknown = await res.json().catch(() => ({}));
      if (res.ok) {
        const setCookies = (res.headers as Headers & { getSetCookie(): string[] }).getSetCookie();
        for (const raw of setCookies) {
          const [nameValue] = raw.split(';');
          const eqIdx = nameValue.indexOf('=');
          const name = nameValue.slice(0, eqIdx).trim();
          const value = nameValue.slice(eqIdx + 1).trim();
          await context.addCookies([{ name, value, domain: 'localhost', path: '/' }]);
        }
      }
      await route.fulfill({
        status: res.status,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
    });

    // '**/auth/logout' matches both local (localhost:4000/auth/logout) and CI proxy.
    await page.route('**/auth/logout', async (route) => {
      await context.clearCookies();
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });
  });

  test('valid credentials → redirects to /students', async ({ page }) => {
    await page.goto('/login');
    await page.locator(emailInput).fill(EMAIL);
    await page.locator(passwordInput).fill(PASSWORD);
    await page.getByRole(submitButton.role, { name: submitButton.name }).click();
    // A successful login does strictly more backend work than a rejected one
    // (password verify + refresh-token hash + a DB write, vs. just a verify
    // against the dummy hash — see AuthService.login), so it's the slower of
    // the two outcomes under a cold/throttled staging instance. auth.setup.ts
    // budgets 15s for the same login+redirect; this goes through an extra
    // hop (React mutation → router.push → middleware) on top of that, so it
    // shouldn't get a tighter budget than setup's.
    await expect(page).toHaveURL('/students', { timeout: 15_000 });
  });

  test('wrong password → shows localized "Incorrect email or password.", stays on /login', async ({
    page,
  }) => {
    await page.goto('/login');
    await page.locator(emailInput).fill(EMAIL);
    await page.locator(passwordInput).fill('wrong-password-123');
    await page.getByRole(submitButton.role, { name: submitButton.name }).click();
    // The user must see a specific, localized message — never the raw Axios/backend text.
    await expect(page.getByText('Incorrect email or password.')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/Request failed with status code/)).toHaveCount(0);
    await expect(page).toHaveURL('/login');
  });

  test('after login → logout → /students redirects to /login', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.locator(emailInput).fill(EMAIL);
    await page.locator(passwordInput).fill(PASSWORD);
    await page.getByRole(submitButton.role, { name: submitButton.name }).click();
    // Same rationale as the "valid credentials" test above: a successful
    // login is the slower outcome, so it gets the same 15s budget.
    await expect(page).toHaveURL('/students', { timeout: 15_000 });

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
    // Abort all API calls (registered first = lower priority) so a fake token
    // can't produce a 401 → redirect cascade that races with page.goto.
    await page.route(
      (url) => url.port === '4000' || url.href.includes('/api-proxy/'),
      (route) => route.abort(),
    );
    // Mock logout (registered last = higher priority, overrides the abort above).
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
    await page.goto('/students', { waitUntil: 'commit' }).catch(() => null);
    await expect(page).toHaveURL('/login');
  });
});
