// src/helpers/folios/validateCreateCliente.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function validateCreateCliente(formData: FormData) {
  // Obtener sesión del usuario autenticado
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?error=Debe iniciar sesión");
  }

  const codigo_cliente = formData.get("codigo_cliente") as string;
  const descripcion = formData.get("descripcion") as string;
  const direccion = formData.get("direccion") as string;
  const telefono = formData.get("telefono") as string;

  // Agregar debug para ver qué estás recibiendo
  console.log("FormData recibida:", {
    codigo_cliente,
    descripcion,
    direccion,
    telefono
  });

  // Mejorar validación de código
  if (!codigo_cliente || codigo_cliente.trim() === "") {
    redirect("/folios/new?error=Debe ingresar el RTN");
  }

  if (!descripcion || descripcion.trim() === "") {
    redirect("/folios/new?error=Debe ingresar una descripcion");
  }

  if (!direccion || direccion.trim() === "") {
    redirect("/folios/new?error=Debe ingresar una direccion");
  }

  if (!telefono || telefono.trim() === "") {
    redirect("/folios/new?error=Debe ingresar un telefono");
  }


  return {
    session,
    codigo_cliente,
    descripcion,
    direccion,
    telefono
  };
}


