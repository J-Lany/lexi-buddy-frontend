/**
 * @jest-environment node
 *
 * Unit tests for src/middleware.ts.
 *
 * NextRequest + NextResponse from next/server work fine in the Node
 * environment. Cookies are passed via the Cookie request header.
 */
import { NextRequest } from 'next/server';

import { middleware } from '@/middleware';
import { routes } from '@/shared/router/routes';

const BASE = 'http://localhost:3000';

function req(pathname: string, withToken = false): NextRequest {
  const headers = new Headers();
  if (withToken) headers.set('Cookie', 'refresh_token=fake-token');
  return new NextRequest(`${BASE}${pathname}`, { headers });
}

function isRedirect(res: Response): boolean {
  return res.status >= 300 && res.status < 400;
}

function redirectPath(res: Response): string {
  return new URL(res.headers.get('location')!).pathname;
}

describe('middleware — public routes, no token', () => {
  it.each(['/', routes.login, routes.register, routes.help, routes.activate, routes.resetPassword])(
    'allows %s through',
    (path) => {
      expect(isRedirect(middleware(req(path)))).toBe(false);
    },
  );
});

describe('middleware — /reset-password stays reachable even when authenticated', () => {
  it('does not redirect an authenticated user away from /reset-password (unlike /login and /register)', () => {
    // A logged-in user may still hold a valid emailed reset link (e.g. a
    // shared device, or a stale tab) — unlike login/register, this route
    // must not bounce them to /students.
    expect(isRedirect(middleware(req(routes.resetPassword, true)))).toBe(false);
  });

  it('allows /reset-password?token=... through with a query string', () => {
    expect(isRedirect(middleware(req(`${routes.resetPassword}?token=abc123`)))).toBe(false);
  });
});

describe('middleware — auth routes with token → redirect to /students', () => {
  it.each([routes.login, routes.register])('redirects %s → /students', (path) => {
    const res = middleware(req(path, true));
    expect(isRedirect(res)).toBe(true);
    expect(redirectPath(res)).toBe(routes.students);
  });
});

describe('middleware — private routes without token → redirect to /login', () => {
  it.each([routes.students, routes.lessons, routes.groups, routes.profile, routes.qa])(
    'redirects %s → /login',
    (path) => {
      const res = middleware(req(path));
      expect(isRedirect(res)).toBe(true);
      expect(redirectPath(res)).toBe(routes.login);
    },
  );
});

describe('middleware — private routes with token → allowed', () => {
  it.each([routes.students, routes.lessons, routes.groups, routes.profile, routes.qa])(
    'allows %s through',
    (path) => {
      expect(isRedirect(middleware(req(path, true)))).toBe(false);
    },
  );
});
