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
  const path = request.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.includes(path);
  if (!isProtectedRoute) {
    return NextResponse.next();
  } else {
    const token = request.cookies.get('auth_token')?.value;
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const req = await fetch('http://localhost:3000/revalidate', {
        method: 'POST',
        headers,
      });
      if (req.ok) {
        const res = await req.json();
        if (res.isValid) {
          return NextResponse.next();
        }
      }
    }
  }
  const loginUrl = new URL(LOGIN_ROUTE, request.url);
  console.log('redirigiendo a login');
  return NextResponse.redirect(loginUrl);
}

// export const config: MiddlewareConfig = {
//   matcher: '/',
// };
// Cómo funciona matcher? si no lo pongo, se ve que el middleware aplica a todo.
// TODO: emprolijar respuestas y ver si están bien las rutas
