import { NextResponse, type NextRequest } from 'next/server';

const protectedRoutes = [
  '/dashboard',
  '/leaderboard',
  '/meine-tipps',
  '/profil',
  '/admin'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasSupabaseSession =
    request.cookies.get('sb-access-token') ||
    request.cookies.get('sb-refresh-token') ||
    request.cookies
      .getAll()
      .some((cookie) => cookie.name.startsWith('sb-'));

  if (!hasSupabaseSession) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/leaderboard/:path*',
    '/meine-tipps/:path*',
    '/profil/:path*',
    '/admin/:path*'
  ]
};
