import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/', '/auth/login', '/auth/register'];
const privateRoutes = [ '/diary', '/journey', '/profile'];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get('accessToken')?.value;

  const isPublicRoute = publicRoutes.some(route =>
    route === '/' ? pathname === '/' : pathname.startsWith(route)
  );

  const isPrivateRoute = privateRoutes.some(route =>
    route === '/' ? pathname === '/' : pathname.startsWith(route)
  );
  console.log(isPublicRoute);
  console.log(isPrivateRoute);

  if (accessToken && isPublicRoute && pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
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
