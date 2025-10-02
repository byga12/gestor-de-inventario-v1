// app/layout.js (o .tsx) - ESTE ES UN SERVER COMPONENT POR DEFECTO
import { getSession } from "@/lib/data-access-layer"; // 👈 Importa tu función DAL
import { AppLayout } from "@/components/ui/layout/app-layout";
import { SessionProvider } from "@/components/ui/SessionProvider";
import React from "react";
export default async function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Llamada a la DAL (Se ejecuta solo en el servidor)
  const session = await getSession();
  const user = session?.user ? session.user : null;
  
  
  return (
        <SessionProvider user={user}>
          <AppLayout>
            {children}
          </AppLayout>
        </SessionProvider>
  );
}