import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Pocketbase from 'pocketbase';
import { cookies } from 'next/headers';
// import { getUserFromCookie } from './utility/pocketbase';

export function middleware(request: NextRequest) {
  const auth_cookie = request.cookies.get('pb_auth');
  const redirectUrl = new URL('/sign-in', request.nextUrl.origin);
  redirectUrl.searchParams.append('next', request.nextUrl.pathname);

  if (auth_cookie) {
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_DOMAIN);
    pb.authStore.loadFromCookie(auth_cookie.value);

    return pb.authStore.isValid
      ? NextResponse.next()
      : NextResponse.redirect(new URL(redirectUrl));
  }

  return NextResponse.redirect(new URL(redirectUrl));
}

// Protect admin route
export const config = {
  matcher: '/admin/:path*',
};
