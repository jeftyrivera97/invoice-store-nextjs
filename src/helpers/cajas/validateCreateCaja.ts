// src/helpers/cajas/sesiones/validateCreateSession.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function validateCreateCaja(formData: FormData) {
  // Obtener sesión del usuario autenticado
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?error=Debe iniciar sesión");
  }

  const descripcion = formData.get("descripcion") as string;

  if (!descripcion) {
    redirect("/cajas/new?error=Debe ingresar una descripción");
  }

  return {
    session,
    descripcion: String(descripcion),
  };
}