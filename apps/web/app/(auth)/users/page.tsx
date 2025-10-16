// app/mi-ruta/page.tsx (Server Component por defecto)
import UsersPage from './components/content';
import { getUsers } from '@/lib/services/nestjs-api';

export default async function Page() {
  const users = await getUsers();

  return <UsersPage users={users} />;
}
