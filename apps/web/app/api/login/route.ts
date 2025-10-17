// app/api/login/route.ts
import { cookies } from 'next/headers';
// import { redirect, RedirectType } from 'next/navigation';
// URL base de tu backend Nest.js (ej: http://localhost:3000)
const NEST_JS_API_URL = process.env.NEST_JS_API_URL

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    
    // 1. Llamada al endpoint de Nest.js
    const res = await fetch(`${NEST_JS_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      return Response.json({status:500, error:'Ocurrió un error'})
    }

    // 2. Almacenamiento seguro del JWT en una cookie HTTP-Only
    const data = await res.json()
    const token = data.token;

    (await cookies()).set('auth_token', token, {
      httpOnly: true, // CLAVE: No accesible por JavaScript del cliente
      secure: process.env.NODE_ENV === 'production', // Solo sobre HTTPS en producción
      sameSite: 'lax', // Protección CSRF (Cross-Site Request Forgery)
      maxAge: 60 * 60 * 24 * 7, // 1 semana de expiración
      path: '/', // Accesible en toda la app
    });
    return Response.json({status:200})
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({status:500, error})
  }
}
