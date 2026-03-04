import { NextRequest, NextResponse } from 'next/server';

import { routeAccess } from '@/shared/router/access';
import { routes } from '@/shared/router/routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = routeAccess.public.some((route) => pathname.startsWith(route));
  if (isPublic) return NextResponse.next();

  const refreshToken = request.cookies.get('refresh_token')?.value;
  if (refreshToken) return NextResponse.next();

  return NextResponse.redirect(new URL(routes.login, request.url));
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
