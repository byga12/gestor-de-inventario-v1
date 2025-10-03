// app/mi-ruta/page.tsx (Server Component por defecto)
import ProductsPage from './components/content';
import { getProducts } from '@/lib/services/nestjs-api';

export default async function Page() {
  const products = await getProducts();

  return (
      <ProductsPage products={products}/>
  );
}