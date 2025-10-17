// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// URL base de tu backend Nest.js (ej: http://localhost:3000)
const NEST_JS_API_URL = process.env.NEST_JS_API_URL

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 1. Llamada al endpoint de Nest.js
    const response = await fetch(`${NEST_JS_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Si Nest.js devuelve un error (ej. 401 Unauthorized)
      return NextResponse.json(
        { message: data.message || 'Credenciales inválidas' },
        { status: response.status },
      );
    }

    // 2. Almacenamiento seguro del JWT en una cookie HTTP-Only
    const token = data.token;

    (await cookies()).set('auth_token', token, {
      httpOnly: true, // CLAVE: No accesible por JavaScript del cliente
      secure: process.env.NODE_ENV === 'production', // Solo sobre HTTPS en producción
      sameSite: 'lax', // Protección CSRF (Cross-Site Request Forgery)
      maxAge: 60 * 60 * 24 * 7, // 1 semana de expiración
      path: '/', // Accesible en toda la app
    });

    return NextResponse.json({ success: true, user: data.user });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}
