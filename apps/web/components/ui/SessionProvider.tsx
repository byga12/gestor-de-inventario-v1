// components/SessionProvider.tsx
'use client'; // 👈 Es crucial marcarlo como Client Component

import { ReactNode } from 'react';
import { SessionContext } from '@/lib/session-provider';
import { UserPayload } from '@by/types';
interface SessionProviderProps {
  // Los datos del usuario vienen del Server Component
  user: UserPayload | null; 
  children: ReactNode;
}

export function SessionProvider({ user, children }: SessionProviderProps) {
  
  // Usamos useMemo para garantizar que el valor del contexto solo cambie cuando 'user' lo haga
//   const contextValue = useMemo(() => {
//     return {
//       user: user,
//       isAuthenticated: !!user, // Booleano: si 'user' existe, está autenticado
//     };
//   }, [user]);

  return (
    <SessionContext.Provider value={user}>
      {children}
    </SessionContext.Provider>
  );
}