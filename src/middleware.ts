import { NextRequest, NextResponse } from 'next/server';

import { routeAccess } from '@/shared/router/access';
import { routes } from '@/shared/router/routes';

async function tryRefresh(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  try {
    const refreshResponse = await fetch(`${apiUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        cookie: request.headers.get('cookie') ?? '',
      },
    });

    if (!refreshResponse.ok) {
      return null;
    }

    const res = NextResponse.next();

    const setCookie = refreshResponse.headers.get('set-cookie');
    if (setCookie) {
      res.headers.set('set-cookie', setCookie);
    }

    return res;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = routeAccess.public.some((route) => pathname.startsWith(route));

  if (isPublic) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (accessToken) {
    return NextResponse.next();
  }

  if (refreshToken) {
    const refreshedResponse = await tryRefresh(request);
    if (refreshedResponse) {
      return refreshedResponse;
    }
  }

  return NextResponse.redirect(new URL(routes.login, request.url));
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
