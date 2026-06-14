import { test as setup } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '../.auth/user.json');

const EMAIL = process.env.E2E_USER_EMAIL ?? 'anna.ivanovna@example.com';
const PASSWORD = process.env.E2E_USER_PASSWORD ?? 'Password123';
const BACKEND_URL = process.env.BACKEND_API_URL?.replace(/\/$/, '');

setup('authenticate', async ({ page }) => {
  if (!BACKEND_URL) {
    throw new Error(
      'BACKEND_API_URL env var is required. ' +
        'Set it to the staging API base URL (e.g. https://api.staging.example.com).',
    );
  }

  // Pre-accept cookie consent so the modal doesn't appear on any page we navigate to.
  await page.addInitScript(() => {
    localStorage.setItem(
      'lexi.cookie-consent',
      JSON.stringify({ accepted: true, version: 1, date: new Date().toISOString() }),
    );
  });

  // Call the backend directly from Node.js — this avoids two browser-level problems:
  // 1. CORS: Node.js fetch has no origin restriction.
  // 2. Cookie domain: the API sets cookies on its own domain; the browser would reject
  //    them for localhost. Here we read the raw Set-Cookie headers and inject the tokens
  //    into the browser context under the localhost domain ourselves.
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(
      `POST /auth/login returned ${res.status}. Body: ${body}. ` +
        `Check that the E2E user exists on staging and credentials are correct.`,
    );
  }

  // Parse every Set-Cookie line and inject cookies into the browser under localhost
  // so Next.js middleware (request.cookies.get('refresh_token')) can see them.
  const setCookies: string[] = (
    res.headers as Headers & { getSetCookie(): string[] }
  ).getSetCookie();
  console.log(
    '[auth] received cookies:',
    setCookies.map((c) => c.split(';')[0].trim()),
  );

  for (const raw of setCookies) {
    const [nameValue] = raw.split(';');
    const eqIdx = nameValue.indexOf('=');
    const name = nameValue.slice(0, eqIdx).trim();
    const value = nameValue.slice(eqIdx + 1).trim();
    await page.context().addCookies([{ name, value, domain: 'localhost', path: '/' }]);
  }

  // Navigate to a protected page to verify the injected cookies satisfy the middleware,
  // and to populate localStorage (cookie consent is set by the initScript above).
  await page.goto('/students');
  await page.waitForURL('/students', { timeout: 15_000 });

  await page.context().storageState({ path: AUTH_FILE });
});
