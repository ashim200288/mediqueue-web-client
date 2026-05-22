import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  const protectedRoutes = ["/add-tutor", "/my-tutors", "/my-bookings"];
  let isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  const isTutorDetailsPage = pathname.startsWith("/tutors/") && pathname !== "/tutors";

  if ((isProtectedRoute || isTutorDetailsPage) && !sessionToken) {
    
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname); 
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/tutors/:path*',
    '/add-tutor/:path*',
    '/my-tutors/:path*',
    '/my-bookings/:path*',
  ],
};