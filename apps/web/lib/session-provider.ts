'use client';
import { UserPayload } from '@by/types';
import { createContext, useContext } from 'react';

export const SessionContext = createContext<UserPayload | null>(null);

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error(
      'useSessionContext debe ser usado dentro de un SessionProvider',
    );
  }
  return context;
};
