import { test as setup } from '@playwright/test';
import path from 'path';

import { CONSENT_VERSION } from '../../src/shared/lib/cookie-consent';

const AUTH_FILE = path.join(__dirname, '../.auth/user.json');

const EMAIL = process.env.E2E_USER_EMAIL ?? 'anna.ivanovna@example.com';
const PASSWORD = process.env.E2E_USER_PASSWORD ?? 'Password123';
const BACKEND_URL = process.env.BACKEND_API_URL?.replace(/\/$/, '');

// Bounded readiness wait for the health check below: at most
// HEALTH_CHECK_MAX_ATTEMPTS attempts, each capped at HEALTH_CHECK_TIMEOUT_MS,
// with a short delay between retries. Worst case is well under the 60-90s
// budget (3 * 8s timeout + 2 * 2s delay = ~28s) — never an unbounded poll.
const HEALTH_CHECK_MAX_ATTEMPTS = 3;
const HEALTH_CHECK_TIMEOUT_MS = 8_000;
const HEALTH_CHECK_RETRY_DELAY_MS = 2_000;

// Only these are treated as transient upstream/proxy problems worth retrying.
// 400/401/403/404/429 are never retried — they mean "this call is wrong",
// not "the backend is warming up".
const RETRYABLE_HEALTH_STATUSES = new Set([502, 503, 504]);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Strips any userinfo (user:pass@) so a URL is always safe to log. */
function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.username = '';
    parsed.password = '';
    return parsed.toString();
  } catch {
    return url;
  }
}

function truncate(text: string, maxLength = 300): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

/**
 * Waits for the staging backend to be reachable via its existing health
 * endpoint before we attempt login. This is what actually distinguishes "the
 * E2E user/credentials are wrong" (a real login failure) from "the reverse
 * proxy/upstream was returning 502 during a deploy" (an infra problem that
 * has nothing to do with credentials).
 */
async function waitForBackendHealth(baseUrl: string): Promise<void> {
  const healthUrl = `${baseUrl}/health`;
  const sanitized = sanitizeUrl(healthUrl);
  let lastError: string | null = null;

  for (let attempt = 1; attempt <= HEALTH_CHECK_MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(healthUrl, { signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS) });

      if (res.ok) return;

      if (RETRYABLE_HEALTH_STATUSES.has(res.status)) {
        const body = truncate(await res.text().catch(() => ''));
        lastError = `Staging backend health check returned ${res.status}: upstream unavailable (${sanitized}). Body: ${body}`;
      } else {
        // A non-retryable status (e.g. 404 because the health path is wrong)
        // means retrying won't help — fail fast with the real cause.
        throw new Error(
          `Staging backend health check returned ${res.status} at ${sanitized}, which is not a transient upstream error — ` +
            `check that BACKEND_API_URL points at the right host and that /health is the correct path.`,
        );
      }
    } catch (e) {
      if (e instanceof Error && e.message.startsWith('Staging backend health check returned')) {
        throw e;
      }
      // Network error / timeout — treated the same as a transient 502/503/504.
      const reason = e instanceof Error ? e.message : String(e);
      lastError = `Staging backend health check failed to reach ${sanitized}: ${reason}`;
    }

    if (attempt < HEALTH_CHECK_MAX_ATTEMPTS) {
      console.log(
        `[auth] health check attempt ${attempt}/${HEALTH_CHECK_MAX_ATTEMPTS} failed, retrying…`,
      );
      await sleep(HEALTH_CHECK_RETRY_DELAY_MS);
    }
  }

  throw new Error(
    `${lastError} — gave up after ${HEALTH_CHECK_MAX_ATTEMPTS} attempts. ` +
      `Staging backend health check timed out after ${HEALTH_CHECK_MAX_ATTEMPTS} attempts.`,
  );
}

/**
 * Turns a failed /auth/login response into a message that points at the
 * actual likely cause, instead of always blaming "the E2E user or
 * credentials". Never includes the password, cookies, or Authorization
 * headers — only status, a short body, the sanitized URL, and the request id
 * if the backend sent one.
 */
function describeLoginFailure(
  status: number,
  sanitizedUrl: string,
  body: string,
  requestId: string | null,
): string {
  const context = `POST ${sanitizedUrl} returned ${status}. Body: ${truncate(body)}.${
    requestId ? ` Request-Id: ${requestId}.` : ''
  }`;

  if (status === 400) return `${context} Invalid request — check the login request payload.`;
  if (status === 401 || status === 403) {
    return `${context} Check that the E2E user exists on staging and that E2E_USER_EMAIL/E2E_USER_PASSWORD are correct.`;
  }
  if (status === 404) {
    return `${context} The login endpoint or BACKEND_API_URL base URL looks wrong.`;
  }
  if (status === 429) return `${context} Rate limited — too many login attempts.`;
  if (status === 500) return `${context} Backend application error (not a credentials problem).`;
  if (status === 502 || status === 503 || status === 504) {
    return `${context} Reverse proxy/upstream unavailable — this is an infra problem, not invalid credentials.`;
  }
  return context;
}

setup('authenticate', async ({ page }) => {
  if (!BACKEND_URL) {
    throw new Error(
      'BACKEND_API_URL env var is required. ' +
        'Set it to the staging API base URL (e.g. https://api.staging.example.com).',
    );
  }

  await waitForBackendHealth(BACKEND_URL);

  // Pre-accept cookie consent so the modal doesn't appear on any page we navigate to.
  // Must match ConsentRecord in src/shared/lib/cookie-consent.ts exactly — see
  // the identical note in e2e/auth.spec.ts for why a mismatch here silently
  // reintroduces a page-covering modal.
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

  // Call the backend directly from Node.js — this avoids two browser-level problems:
  // 1. CORS: Node.js fetch has no origin restriction.
  // 2. Cookie domain: the API sets cookies on its own domain; the browser would reject
  //    them for localhost. Here we read the raw Set-Cookie headers and inject the tokens
  //    into the browser context under the localhost domain ourselves.
  const loginUrl = `${BACKEND_URL}/auth/login`;
  const res = await fetch(loginUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const requestId = res.headers.get('x-request-id');
    throw new Error(describeLoginFailure(res.status, sanitizeUrl(loginUrl), body, requestId));
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
