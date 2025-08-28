import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface CreateSessionData {
  descripcion: string;
  userId: string | number;
}

export async function createNewCaja({
  descripcion,
  userId,
}: CreateSessionData) {
  try {
    const nuevaCaja = await prisma.cajas.create({
      data: {
        descripcion: String(descripcion),
        id_estado: 1,
        id_usuario: Number(userId),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    });

    console.log("Caja creada:", nuevaCaja);
  } catch (error) {
    console.error("Error creando caja:", error);
    redirect("/cajas/new?error=Error al crear la caja");
  }

  redirect(
    "/cajas/new?success=Ahora puede crear sesiones con esta caja."
  );
}
