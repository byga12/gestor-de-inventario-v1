'use client';
import { Product } from '@by/types';
import { useMemo, useState } from 'react';
import { Plus, Search, Trash, SquarePen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  addProduct,
  deleteProductById,
  updateProductById,
} from '@/lib/services/nestjs-api';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
interface ProductsPageProps {
  products: Product[];
}
export const ProductSchema = z.object({
  name: z
    .string()
    .min(3, { error: 'El nombre debe tener como mínimo 3 caracteres' }),
  description: z.string(),
  unit_price: z
    .transform(Number)
    .pipe(z.number().min(10, 'El precio unitario debe ser mayor a 1')),
});
export type FormType = z.infer<typeof ProductSchema>;

export default function ProductsPage({ products }: ProductsPageProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState({
    state: false,
    productId: '',
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState({
    state: false,
    productId: '',
  });

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      // user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // user.surname.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  const {
    register: registerAdd,
    handleSubmit: handleAddSubmit,
    reset: resetAdd,
    formState: {
      errors: errorsAdd,
      isValid: isValidAdd,
      isSubmitting: isSubmittingAdd,
    },
  } = useForm<FormType>({
    resolver: zodResolver(ProductSchema),
    mode: 'onChange',
  });
  const onSubmitAdd = async (data: FormType) => {
    try {
      await addProduct(data);
      toast.success('Producto añadido correctamente');
    } catch {
      toast.error('Ocurrió un error al añadir el producto');
    }
    setIsAddDialogOpen(false);
    resetAdd();
    router.refresh();
  };
  const {
    setValue: setEditDialogValue,
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    formState: {
      errors: errorsEdit,
      isValid: isValidEdit,
      isSubmitting: isSubmittingEdit,
    },
  } = useForm<FormType>({
    resolver: zodResolver(ProductSchema),
    mode: 'onChange',
  });

  const onSubmitEdit = async (data: FormType) => {
    try {
      await updateProductById(isEditDialogOpen.productId, data);
      toast.success('Producto actualizado correctamente');
    } catch {
      toast.error('Ocurrió un error al actualizar el producto');
    }
    resetEdit();
    setIsEditDialogOpen({ state: false, productId: '' });
    router.refresh();
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProductById(isDeleteDialogOpen.productId);
      toast.success('Producto archivado correctamente');
    } catch {
      toast.error('Ocurrió un error al archivar el producto');
    }
    setIsDeleteDialogOpen({ state: false, productId: '' });
    router.refresh();
  };
  const loadEditDialog = (product: Product) => {
    setIsEditDialogOpen({ state: true, productId: product.id });
    setEditDialogValue('name', product.name);
    setEditDialogValue('description', product.description);
    setEditDialogValue('unit_price', product.unit_price);
  };
  const loadDeleteDialog = (product: Product) => {
    setIsDeleteDialogOpen({ state: true, productId: product.id });
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">Catálogo de productos</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form
              onSubmit={handleAddSubmit(onSubmitAdd)}
              className="flex flex-col gap-6"
            >
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                <DialogDescription>
                  Completa la información del nuevo producto
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="add-name">Nombre del producto</Label>
                  <Input
                    id="add-name"
                    placeholder="Nuevo producto"
                    {...registerAdd('name')}
                    error={errorsAdd.name?.message}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-description">
                    Descripción del producto
                  </Label>
                  <Input
                    id="add-description"
                    placeholder="-"
                    {...registerAdd('description')}
                    error={errorsAdd.description?.message}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-price">Precio unitario</Label>
                  <Input
                    id="add-price"
                    type="price"
                    placeholder="0"
                    {...registerAdd('unit_price')}
                    error={errorsAdd.unit_price?.message}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    resetAdd();
                  }}
                >
                  Cancelar
                </Button>

                <Button type="submit" disabled={!isValidAdd || isSubmittingAdd}>
                  Crear Producto
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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

      {/* Editar */}
      <Dialog open={isEditDialogOpen.state}>
        <DialogContent>
          <form
            onSubmit={handleEditSubmit((data) => onSubmitEdit(data))}
            className="flex flex-col gap-6"
          >
            <DialogHeader>
              <DialogTitle>{`Editar producto`}</DialogTitle>
              <DialogDescription>
                Completa la información del producto a actualizar
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre del producto</Label>
                <Input
                  id="edit-name"
                  {...registerEdit('name')}
                  error={errorsEdit.name?.message}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">
                  Descripción del producto
                </Label>
                <Input
                  id="edit-description"
                  {...registerEdit('description')}
                  error={errorsEdit.description?.message}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Precio unitario</Label>
                <Input
                  id="edit-price"
                  type="price"
                  {...registerEdit('unit_price')}
                  error={errorsEdit.unit_price?.message}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setIsEditDialogOpen({ state: false, productId: '' })
                }
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={!isValidEdit || isSubmittingEdit}>
                Actualizar producto
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Borrar */}
      <Dialog open={isDeleteDialogOpen.state}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Seguro que desea eliminar este producto?</DialogTitle>
            <DialogDescription>
              {`Esta acción archivará el producto, el cuál podrá ser restaurado desde la sección "Archivados".`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setIsDeleteDialogOpen({ state: false, productId: '' })
              }
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant={'destructive'}
              onClick={handleDeleteProduct}
            >
              Borrar Producto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  {/* <Badge variant="secondary">{product.category}</Badge> */}
                </div>
                <div className="flex gap-2">
                  <SquarePen
                    className="h-5 w-5 text-muted-foreground cursor-pointer"
                    onClick={() => loadEditDialog(product)}
                  />
                  <Trash
                    className="h-5 w-5 text-muted-foreground cursor-pointer"
                    color="#d45d5dff"
                    onClick={() => loadDeleteDialog(product)}
                  />
                </div>
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

                {/* <Button
                  // onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-3 w-3" />
                  <p className="overflow-visible">Agregar al carrito</p>
                </Button> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
