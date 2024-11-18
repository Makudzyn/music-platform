import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from "@lib/defenitions";


export function middleware(req: NextRequest) {
  const accessToken = getCookie('accessToken', { req });

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Decode token and extract the role from it
  const { role } = jwtDecode<DecodedToken>(accessToken);

  // If the page is for admins, but the role is not admin, redirect to the main page
  if (req.url.includes('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Применить middleware к определённым маршрутам
export const config = {
  matcher: ['/admin'],
};
