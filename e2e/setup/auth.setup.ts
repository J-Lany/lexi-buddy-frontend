import { test as setup } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '../.auth/user.json');

const EMAIL = process.env.E2E_USER_EMAIL ?? 'anna.ivanovna@example.com';
const PASSWORD = process.env.E2E_USER_PASSWORD ?? 'Password123';

setup('authenticate', async ({ page }) => {
  // Log browser console errors — reveals CORS / JS runtime failures
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('[browser error]', msg.text());
  });

  // Log failed network requests — reveals CORS preflight blocks, DNS failures, etc.
  page.on('requestfailed', (req) => {
    console.error('[request failed]', req.method(), req.url(), req.failure()?.errorText);
  });

  // Pre-accept cookie consent so the modal doesn't block the login form.
  await page.addInitScript(() => {
    localStorage.setItem(
      'lexi.cookie-consent',
      JSON.stringify({ accepted: true, version: 1, date: new Date().toISOString() }),
    );
  });

  await page.goto('/login');

  // Start listening for the login API response BEFORE clicking submit.
  const loginResponsePromise = page
    .waitForResponse(
      (res) => res.url().includes('/auth/login') && res.request().method() === 'POST',
      { timeout: 15_000 },
    )
    .catch(() => null);

  await page.locator('input[autocomplete="email"]').fill(EMAIL);
  await page.locator('input[autocomplete="current-password"]').fill(PASSWORD);
  await page.getByRole('button', { name: 'Continue' }).click();

  const loginRes = await loginResponsePromise;
  if (!loginRes) {
    // Request never reached the server — likely CORS preflight blocked or network error.
    // Check [request failed] lines above and browser console for details.
    throw new Error(
      'POST /auth/login never received a response. ' +
        'Likely cause: CORS block (origin not whitelisted on staging) or backend unreachable. ' +
        `Email used: ${EMAIL}`,
    );
  }

  console.log(`[auth/login] status: ${loginRes.status()}`);
  if (!loginRes.ok()) {
    let body = '';
    try {
      body = JSON.stringify(await loginRes.json());
    } catch {
      body = await loginRes.text().catch(() => '');
    }
    throw new Error(
      `POST /auth/login returned ${loginRes.status()}. ` +
        `Body: ${body}. ` +
        `Check that the E2E user exists on staging and password is correct.`,
    );
  }

  await page.waitForURL('/students', { timeout: 15_000 });

  await page.context().storageState({ path: AUTH_FILE });
});
