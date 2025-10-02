const URL = 'http://localhost:3000';
// Product
import { CreateProductDto, UpdateProductDto } from '@by/types';
export const addProduct = async (createProductDto: CreateProductDto) => {
  await fetch(`${URL}/product`, {
    method: 'POST',
    body: JSON.stringify(createProductDto),
  });
};

export const getProducts = async () => {
  await fetch(`${URL}/product`, {
    method: 'GET',
  });
};

export const getProductById = async (id: string) => {
  await fetch(`${URL}/product/${id}`, {
    method: 'GET',
  });
};

export const updateProductById = async (
  id: string,
  updateProductDto: UpdateProductDto,
) => {
  await fetch(`${URL}/product/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updateProductDto),
  });
};

export const deleteProductById = async (id: string) => {
  await fetch(`${URL}/product/${id}`, {
    method: 'DELETE',
  });
};
// Sale

// User
