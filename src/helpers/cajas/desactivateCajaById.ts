  "use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function desactivateCajaById(formData: FormData) {


  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    redirect("/cajas?error=ID inválido");
  }

  try {
    await prisma.cajas.update({
      where: { id: Number(id) },
      data: { id_estado: 2 },
    });
  } catch (error) {
    console.error("Error desactivando caja:", error);
    redirect("/cajas?error=Error al desactivar la caja");
  }
  redirect("/cajas?success=Caja desactivada exitosamente");
}
