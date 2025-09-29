// src/helpers/folios/validateCreateFolio.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function validateCreateFolio(formData: FormData) {
  // Obtener sesión del usuario autenticado
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?error=Debe iniciar sesión");
  }

  const codigo = formData.get("codigo") as string;
  const inicio = formData.get("inicio") as string;
  const final = formData.get("final") as string;

  // ✅ Agregar debug para ver qué estás recibiendo
  console.log("FormData recibida:", {
    codigo,
    inicio,
    final
  });

  // ✅ Mejorar validación de código
  if (!codigo || codigo.trim() === "") {
    redirect("/folios/new?error=Debe ingresar el código del folio");
  }

  if (!inicio || parseFloat(inicio) <= 0) {
    redirect("/folios/new?error=El inicio debe ser mayor que cero");
  }

  if (!final || parseFloat(final) <= 0) {
    redirect("/folios/new?error=El final debe ser mayor que cero");
  }

  if (parseFloat(inicio) >= parseFloat(final)) { // ✅ Cambiar == por >=
    redirect("/folios/new?error=El número inicial debe ser menor que el final");
  }

  return {
    session,
    codigo: codigo, 
    inicio: Number(inicio),
    final: Number(final),
  };
}

