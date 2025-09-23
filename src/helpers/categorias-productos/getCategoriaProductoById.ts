import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getCategoriaProductoById(id: number) {
  try {
    const categoriaRaw = await prisma.categorias_productos.findUnique({
      where: { 
        id: BigInt(id),
        id_estado: BigInt(1) // Solo categorías activas
      },
      include: {
        estados: true,
      },
    });

    if (!categoriaRaw) {
      redirect("/categorias-productos?error=Categoría no encontrada");
    }

    // Convertir BigInt a string para serialización
    const categoria = JSON.parse(
      JSON.stringify(categoriaRaw, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return categoria;
  } catch (error) {
    console.error("Error obteniendo categoría:", error);
    redirect("/categorias-productos?error=Error al obtener la categoría");
  }
}