import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Better-Auth এর সেশন টোকেন চেক
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  // ১. সাধারণ প্রটেক্টেড রুটস
  const protectedRoutes = ["/add-tutor", "/my-tutors", "/my-bookings"];
  let isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // 🌟 ২. স্পেশাল চেক: ইউজার যদি সুনির্দিষ্ট কোনো টিউটরের ডিটেইলস পেজে যেতে চায় (/tutors/any-id)
  // কিন্তু মূল '/tutors' লিস্ট পেজটি পাবলিক থাকবে।
  const isTutorDetailsPage = pathname.startsWith("/tutors/") && pathname !== "/tutors";

  // যদি সাধারণ প্রটেক্টেড পেজ হয় অথবা টিউটর ডিটেইলস পেজ হয়
  if ((isProtectedRoute || isTutorDetailsPage) && !sessionToken) {
    // লগইন করা না থাকলে সরাসরি /login পেজে রিডাইরেক্ট করো
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname); // লগইন শেষে যাতে আবার এই ডিটেইলস পেজেই ব্যাক আসে
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 🎯 Matcher-এ আবার '/tutors/:path*' যোগ করা হলো যাতে ডাইনামিক আইডিগুলো মিডলওয়্যার ট্র্যাক করতে পারে
export const config = {
  matcher: [
    '/tutors/:path*',
    '/add-tutor/:path*',
    '/my-tutors/:path*',
    '/my-bookings/:path*',
  ],
};