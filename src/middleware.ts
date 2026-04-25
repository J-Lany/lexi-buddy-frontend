import { NextRequest, NextResponse } from 'next/server';

import { routeAccess } from '@/shared/router/access';
import { routes } from '@/shared/router/routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const isPublic = routeAccess.public.some((route) => pathname.startsWith(route));

  if (isPublic) {
    const isAuthRoute = pathname.startsWith(routes.login) || pathname.startsWith(routes.register);
    if (isAuthRoute && refreshToken)
      return NextResponse.redirect(new URL(routes.students, request.url));
    return NextResponse.next();
  }

  if (refreshToken) return NextResponse.next();

  return NextResponse.redirect(new URL(routes.login, request.url));
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
