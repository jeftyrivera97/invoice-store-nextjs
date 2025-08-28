import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function activateCajaById(formData: FormData) {
  "use server";

  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    redirect("/cajas?error=ID inválido");
  }

  try {
    await prisma.cajas.update({
      where: { id: Number(id) },
      data: { id_estado: 1 },
    });
  } catch (error) {
    console.error("Error activando caja:", error);
    redirect("/cajas?error=Error al activar la caja");
  }
  redirect("/cajas?success=Caja activada exitosamente");
}
