# Sistema de inventario v1

Aplicación para gestión de inventario con 2 roles: Administrador y vendedor
El administrador puede gestionar tanto productos como usuarios.
El vendedor puede gestionar solo los productos.
La idea es ir mejorando las versiones, optimizando el código y añadiendo funcionalidades.
Cualquier sugerencia es bienvenida!

## Tecnologías/librerías utilizadas:

- npm como gestor de paquetes
- Turborepo para gestionar un monorepo
- Typescript

### Backend
- Nest.js para API Rest
- PostgreSQL DB
- ORM: TypeORM
- bcrypt para hashing de contraseñas

### Frontend
- Next.js
- TailwindCSS
- shadcnUI
- React-hook-form Zod para manejar formularios en el front
- jsonwebtoken para gestionar JWT
