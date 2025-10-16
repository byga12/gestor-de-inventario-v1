'use server';
import { cookies } from 'next/headers';
const NEST_URL = 'http://localhost:3000';
// 👈 Función helper centralizada para manejar la autenticación
async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  // 1. Obtener la Cookie del Request (Solo posible en Server Components/Handlers)
  const token = (await cookies()).get('auth_token')?.value;

  if (!token) {
    // Manejar caso de no autenticado (ej. lanzar error o manejar en el llamador)
    throw new Error('User not authenticated.');
  }

  // 2. Adjuntar el Header Authorization
  const authHeaders = new Headers(options.headers);
  authHeaders.set('Authorization', `Bearer ${token}`);
  authHeaders.set('Content-Type', 'application/json');

  const url = `${NEST_URL}/${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: authHeaders,
  });
  return response;
}

// Dashboard
export const getSummary = async () => {
  const req = await authenticatedFetch('dashboard/summary');
  const res = await req.json();
  return res;
};

// Product
import {
  CreateProductDto,
  Product,
  UpdateProductDto,
  User,
  CreateUserDto,
} from '@by/types';
export const addProduct = async (createProductDto: CreateProductDto) => {
  const req = await authenticatedFetch('product', {
    method: 'POST',
    body: JSON.stringify(createProductDto),
  });
  const res = await req.json();
  return res;
};

export const getProducts = async (): Promise<Product[] | []> => {
  const req = await authenticatedFetch('product', {
    method: 'GET',
  });

  if (req.ok) {
    return await req.json();
  } else {
    return [];
  }
};

export const getProductById = async (id: string) => {
  const req = await authenticatedFetch(`product/${id}`, {
    method: 'GET',
  });
  const res = await req.json();
  return res;
};

export const updateProductById = async (
  id: string,
  updateProductDto: UpdateProductDto,
) => {
  const req = await authenticatedFetch(`product/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updateProductDto),
  });
  const res = await req.json();
  return res;
};

export const deleteProductById = async (id: string) => {
  const req = await authenticatedFetch(`product/${id}`, {
    method: 'DELETE',
  });
  const res = await req.json();
  return res;
};
// Sale

// User
export const getUsers = async (): Promise<User[] | []> => {
  const req = await authenticatedFetch('user', {
    method: 'GET',
  });

  if (req.ok) {
    return await req.json();
  } else {
    return [];
  }
};

export const addUser = async (createUserDto: CreateUserDto) => {
  const req = await authenticatedFetch('user', {
    method: 'POST',
    body: JSON.stringify(createUserDto),
  });
  const res = await req.json();
  return res;
};

export const deleteUserById = async (id: string) => {
  const req = await authenticatedFetch(`user/${id}`, {
    method: 'DELETE',
  });
  const res = req.json();
  return res;
};
