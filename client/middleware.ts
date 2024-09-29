import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(req: NextRequest) {
  const accessToken = getCookie('accessToken', { req });

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Проверка на роли
  const userRole = getCookie('userRole', { req });

  // Если страница для админов, но роль не админ, редирект на главную страницу
  if (req.url.includes('/admin') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Применить middleware к определённым маршрутам
export const config = {
  matcher: ['/admin', '/profile', '/settings'],
};
