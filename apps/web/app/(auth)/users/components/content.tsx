'use client';
import { User, UserRole } from '@by/types';
import { useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  Trash,
  SquarePen,
  Shield,
  UserCheck,
} from 'lucide-react';
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
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { addUser, deleteUserById } from '@/lib/services/nestjs-api';
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
interface UsersPageProps {
  users: User[];
}
const UserSchema = z.object({
  role: z.enum(UserRole, { error: '' }).nonoptional(),
  username: z.string().min(3, {
    error: 'El nombre de usuario debe tener como mínimo 3 caracteres',
  }),
  name: z
    .string()
    .min(3, { error: 'El nombre debe tener como mínimo 3 caracteres' }),
  surname: z
    .string()
    .min(3, { error: 'El apellido debe tener como mínimo 3 caracteres' }),
  password: z
    .string()
    .min(10, { error: 'La contraseña debe tener como mínimo 10 caracteres' }),
});
type UserSchemaType = z.infer<typeof UserSchema>;
const UserDeleteSchema = z.object({
  id: z.string().nonempty(),
});
type UserDeleteType = z.infer<typeof UserDeleteSchema>;
const userRoles = [
  { label: 'Administrador', value: UserRole.ADMIN },
  { label: 'Vendedor', value: UserRole.SELLER },
];
export default function UsersPage({ users }: UsersPageProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState({
  //   state: false,
  //   userId: '',
  // });

  const addForm = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    mode: 'onChange',
  });
  // const editForm = useForm<UserSchemaType>({
  //   resolver: zodResolver(UserSchema),
  //   mode: 'onChange',
  // });
  const onSubmitAdd = async (data: UserSchemaType) => {
    console.log(data);

    try {
      await addUser(data);
      toast.success('Usuario añadido correctamente');
    } catch {
      toast.error('Ocurrió un error al añadir el usuario');
    }
    setIsAddDialogOpen(false);
    addForm.reset();
    router.refresh();
  };
  const deleteForm = useForm<z.infer<typeof UserDeleteSchema>>({
    resolver: zodResolver(UserDeleteSchema),
    mode: 'onSubmit',
  });

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.surname.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [users, searchTerm]);
  // const {
  //   setValue: setEditDialogValue,
  //   register: registerEdit,
  //   handleSubmit: handleEditSubmit,
  //   reset: resetEdit,
  //   formState: {
  //     errors: errorsEdit,
  //     isValid: isValidEdit,
  //     isSubmitting: isSubmittingEdit,
  //   },
  // } = useForm<UserSchemaType>({
  //   resolver: zodResolver(ProductSchema),
  //   mode: 'onChange',
  // });

  // const onSubmitEdit = async (data: UserSchemaType) => {
  //   try {
  //     await updateProductById(isEditDialogOpen.productId, data);
  //     toast.success('Producto actualizado correctamente');
  //   } catch {
  //     toast.error('Ocurrió un error al actualizar el producto');
  //   }
  //   resetEdit();
  //   setIsEditDialogOpen({ state: false, productId: '' });
  //   router.refresh();
  // };

  const onSubmitDelete = async (data: UserDeleteType) => {
    try {
      deleteUserById(data.id);
      toast.success('Usuario eliminado correctamente');
    } catch {
      toast.error('Ocurrió un error al eliminar el usuario');
    }
    deleteForm.reset();
    router.refresh();
  };

  // const handleDeleteProduct = async () => {
  //   try {
  //     await deleteProductById(isDeleteDialogOpen.productId);
  //     toast.success('Producto archivado correctamente');
  //   } catch {
  //     toast.error('Ocurrió un error al archivar el producto');
  //   }
  //   setIsDeleteDialogOpen({ state: false, productId: '' });
  //   router.refresh();
  // };
  // const loadEditDialog = (product: Product) => {
  //   setIsEditDialogOpen({ state: true, productId: product.id });
  //   setEditDialogValue('name', product.name);
  //   setEditDialogValue('description', product.description);
  //   setEditDialogValue('unit_price', product.unit_price);
  // };
  // const loadDeleteDialog = (product: Product) => {
  //   setIsDeleteDialogOpen({ state: true, productId: product.id });
  // };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administra los usuarios del sistema
          </p>
        </div>
        {/* Añadir usuario */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form
              className="flex flex-col gap-4"
              onSubmit={addForm.handleSubmit(onSubmitAdd)}
            >
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                <DialogDescription>
                  Completa la información del nuevo usuario
                </DialogDescription>
              </DialogHeader>
              <Controller
                name="name"
                control={addForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Nombre</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nombre"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="surname"
                control={addForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="surname">Apellido</FieldLabel>
                    <Input
                      {...field}
                      id="surname"
                      aria-invalid={fieldState.invalid}
                      placeholder="Apellido"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="username"
                control={addForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Usuario</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nombre de usuario"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={addForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Contraseña"
                      autoComplete="off"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="role"
                control={addForm.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="form-rhf-select-language">
                        Rol
                      </FieldLabel>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                    <Select name={field.name} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="form-rhf-select-language"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectSeparator />
                        {userRoles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    addForm.reset();
                    setIsAddDialogOpen(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={
                    !addForm.formState.isValid || addForm.formState.isSubmitting
                  }
                >
                  Añadir usuario
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            {users.length} usuario
            {users.length !== 1 ? 's' : ''} encontrado
            {users.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No hay usuarios</h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? 'No se encontraron usuarios con ese criterio'
                  : 'No hay usuarios registrados'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Nombre completo</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{`${user.name} ${user.surname}`}</TableCell>
                    <TableCell>
                      <Badge
                      // variant={
                      //   user.role === 'admin' ? 'default' : 'secondary'
                      // }
                      >
                        {user.role === 'admin' ? 'Administrador' : 'Vendedor'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setIsEditDialogOpen({
                              state: true,
                              userId: user.id,
                            })
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button> */}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              // disabled={user.id === currentUser.id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <form
                              onSubmit={deleteForm.handleSubmit(
                                onSubmitDelete,
                                (e) => {
                                  console.log(e);
                                },
                              )}
                            >
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  ¿Eliminar usuario?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {`¿Esta seguro que desea eliminar el usuario
                                  ${user.username}? El mismo será movido a la
                                  sección 'archivados'`}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <Controller
                                name="id"
                                control={deleteForm.control}
                                defaultValue={user.id}
                                render={({ field, fieldState }) => (
                                  <Field data-invalid={fieldState.invalid}>
                                    <Input
                                      type="hidden"
                                      {...field}
                                      id="id"
                                      aria-invalid={fieldState.invalid}
                                    />
                                  </Field>
                                )}
                              />
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  type="submit"
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </form>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
