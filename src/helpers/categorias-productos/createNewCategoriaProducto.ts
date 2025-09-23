import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface CreateSessionData {
  descripcion: string;
  userId: string | number;
}

export async function createNewCategoriaProducto({
  descripcion,
  userId,
}: CreateSessionData) {
  try {
    const nuevaCategoriaProducto = await prisma.categorias_productos.create({
      data: {
        descripcion: String(descripcion),
        id_estado: 1,
        id_usuario: Number(userId),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    });

    console.log("Categoria de producto creada:", nuevaCategoriaProducto);
  } catch (error) {
    console.error("Error creando categoria de producto:", error);
    redirect("/categorias-productos/new?error=Error al crear la categoria de producto");
  }

  redirect(
    "/categorias-productos/new?success=Ahora puede crear sesiones con esta categoria de producto."
  );
}
