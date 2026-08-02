import type { BrowserContext, Page } from '@playwright/test';

import { CONSENT_VERSION } from '../../src/shared/lib/cookie-consent';

// Middleware (src/middleware.ts) only checks cookie presence, not validity —
// a fake token is enough to pass route protection without a real backend.
export const FAKE_REFRESH_TOKEN = 'test-refresh-token';

/**
 * Satisfies the auth middleware and pre-accepts cookie consent so private
 * pages render without a login flow or a consent modal covering the page.
 * Mirrors the pattern already used ad hoc in e2e/students.spec.ts etc.
 */
export async function authenticateWithFakeCookie(context: BrowserContext, page: Page) {
  await context.addCookies([
    { name: 'refresh_token', value: FAKE_REFRESH_TOKEN, domain: 'localhost', path: '/' },
  ]);

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
}
