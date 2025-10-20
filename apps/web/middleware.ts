import { NextResponse } from 'next/server';
import type { MiddlewareConfig, NextRequest } from 'next/server';
const NEST_JS_API_URL = process.env.NEST_JS_API_URL

const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/users',
  '/products',
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
    console.log('Middleware BFF', token);
    
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const req = await fetch(`${NEST_JS_API_URL}/revalidate`, {
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
  return NextResponse.redirect(loginUrl);
}

// export const config: MiddlewareConfig = {
//   matcher: '/',
// };
// Cómo funciona matcher? si no lo pongo, se ve que el middleware aplica a todo.
// TODO: emprolijar respuestas y ver si están bien las rutas
