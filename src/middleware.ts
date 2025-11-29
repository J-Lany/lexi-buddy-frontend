import { EAppRoutes, RouteAccess } from '@/lib/routes';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  const isPublic = RouteAccess.public.some((route) => pathname.startsWith(route));

  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL(EAppRoutes.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
