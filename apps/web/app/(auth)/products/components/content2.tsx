"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
// import { products } from "@/lib/data/mock-data"
// import { useCart } from "@/lib/cart-context"
import { useEffect, useState } from "react"
import { Plus, Search, Package } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
import { Product } from "@by/types"

interface ProductsPageProps {
    products: Product[]
}

export default function ProductsPage({products}:ProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
//   const { addToCart } = useCart()
//   const { toast } = useToast()

//   const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
//     return matchesSearch && matchesCategory
//   })

//   const handleAddToCart = (product: (typeof products)[0]) => {
//     addToCart(product, 1)
//     toast({
//       title: "Producto agregado",
//       description: `${product.name} se agregó al carrito`,
//     })
//   }

  return (
    <div className="space-y-6">
    <div>
        <h1 className="text-3xl font-bold">Productos</h1>
        <p className="text-muted-foreground">Explora nuestro catálogo de productos disponibles</p>
    </div>

    {/* Search and Filters */}
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
        {/* <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
            <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            >
            {category === "all" ? "Todos" : category}
            </Button>
        ))}
        </div> */}
    </div>

    {/* Products Grid */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
            <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                {/* <Badge variant="secondary">{product.category}</Badge> */}
                </div>
                <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            </CardHeader>
            <CardContent className="space-y-4">
            <CardDescription className="text-sm">{product.description}</CardDescription>

            <div className="flex items-center justify-between">
                <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">${product.unit_price.toLocaleString()}</p>
                {/* <p className="text-xs text-muted-foreground">Stock: {product.stock} unidades</p> */}
                </div>

                <Button
                // onClick={() => handleAddToCart(product)}
                className="flex items-center gap-2"
                >
                <Plus className="h-4 w-4" />
                <p className="">Agregar a carrito</p>
                </Button>
            </div>
            </CardContent>
        </Card>
        ))}
    </div>

    {products.length === 0 && (
        <div className="text-center py-12">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No se encontraron productos</h3>
        <p className="text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
        </div>
    )}
    </div>
  )
}
