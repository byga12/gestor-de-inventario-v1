'use client';

import type React from 'react';
import { useState } from 'react';
import { useSessionContext } from '@/lib/session-provider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Home,
  Users,
  Package,
  Menu,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}
export function AppLayout({ children }: AppLayoutProps) {
  const user = useSessionContext();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };
  if (!user) return null;

  const adminMenuItems = [
    { href: '/dashboard', label: 'Inicio', icon: Home },
    { href: '/users', label: 'Usuarios', icon: Users },
    { href: '/products', label: 'Productos', icon: Package },
    // { href: "/sales", label: "Ventas", icon: Receipt },
    // { href: "/cart", label: "Carrito", icon: ShoppingCart },
  ];

  const sellerMenuItems = [
    { href: '/dashboard', label: 'Inicio', icon: Home },
    { href: '/products', label: 'Productos', icon: Package },
    // { href: "/sales", label: "Ventas", icon: Receipt },
    // { href: "/cart", label: "Carrito", icon: ShoppingCart },
  ];

  const menuItems = user.role === 'admin' ? adminMenuItems : sellerMenuItems;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold">Sistema de Inventario</h2>
        <p className="text-sm text-muted-foreground">
          {user.role === 'admin' ? 'Administrador' : 'Vendedor'}
        </p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          {/* Mobile menu trigger */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          {/* Desktop logo */}
          <div className="hidden md:flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-semibold">Sistema de Inventario</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.name}</p>
                  {/* <p className="text-xs text-muted-foreground">{user.email}</p> */}
                </div>
              </div>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem asChild>
                <Link href="/perfil" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Mi Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2 text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 left-0 top-16 border-r border-border bg-card">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
