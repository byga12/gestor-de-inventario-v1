import { NextResponse } from 'next/server';
import type { MiddlewareConfig, NextRequest } from 'next/server';

const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/users',
  'products',
  '/cart',
];
const LOGIN_ROUTE = '/login';

export async function middleware(request: NextRequest) {
  // if (PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
  const token = request.cookies.get('auth_token')?.value;
  const loginUrl = new URL(LOGIN_ROUTE, request.url);
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const req = await fetch('http://localhost:3000/revalidate', {
    method: 'POST',
    headers,
  });
  const res = await req.json();
  console.log(res);

  if (!req.ok || res.isValid == false) {
    console.log('redirigiendo a login');

    return NextResponse.redirect(loginUrl);
  }
  // }
  console.log('todo bien');

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: '/',
};
// TODO: emprolijar respuestas y ver si están bien las rutas
