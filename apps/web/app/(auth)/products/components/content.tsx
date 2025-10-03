'use client';
import { Product } from '@by/types';
import { useState } from 'react';
import { Package, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
interface ProductsPageProps {
  products: Product[];
}
export default function ProductsPage({ products }: ProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Productos</h1>
        <p className="text-muted-foreground">
          Explorar catálogo de productos disponibles
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  {/* <Badge variant="secondary">{product.category}</Badge> */}
                </div>
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm">
                {product.description}
              </CardDescription>

              <div className="flex items-center justify-between gap-3 md:flex-wrap">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">
                    ${product.unit_price.toLocaleString()}
                  </p>
                </div>

                <Button
                  // onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-2 py-5"
                >
                  <Plus className="h-3 w-3" />
                  <p className="overflow-visible">Agregar al carrito</p>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
