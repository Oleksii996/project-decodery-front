import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/auth/login', '/auth/register'];
const privateRoutes = ['/', '/diary', '/journey', '/profile'];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get('accessToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute =
    pathname === '/' || privateRoutes.some(route => pathname.startsWith(route));

  // ✅ ВИМКНЕНО ТИМЧАСОВО ДЛЯ РОЗРОБКИ
  // if (!accessToken && isPrivateRoute) {
  //   const loginUrl = new URL('/auth/login', req.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // ✅ це можна залишити
  if (accessToken && isPublicRoute) {
    const homeUrl = new URL('/', req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/diary/:path*',
    '/journey/:path*',
    '/profile/:path*',
    '/auth/:path*',
  ],
};