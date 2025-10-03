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

// Product
import { CreateProductDto, Product, UpdateProductDto } from '@by/types';
export const addProduct = async (createProductDto: CreateProductDto) => {
  await authenticatedFetch('product', {
    method: 'POST',
    body: JSON.stringify(createProductDto),
  });
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
  await authenticatedFetch(`product/${id}`, {
    method: 'GET',
  });
};

export const updateProductById = async (
  id: string,
  updateProductDto: UpdateProductDto,
) => {
  await authenticatedFetch(`product/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updateProductDto),
  });
};

export const deleteProductById = async (id: string) => {
  await authenticatedFetch(`product/${id}`, {
    method: 'DELETE',
  });
};
// Sale

// User
