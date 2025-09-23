import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


interface EditSessionData {
  descripcion: string;
  userId: string;
  categoriaId: number;
}

export async function editCategoriaProductoById({
  descripcion,
 userId,
 categoriaId
}: EditSessionData) {
  if (!categoriaId ) {
    redirect(`/categorias-productos/${categoriaId}/edit?error=Datos inválidos`);
  }

  try {
    const categoria = await prisma.categorias_productos.update({  
   
      where: { id: BigInt(categoriaId) },
      data: {
        
        descripcion: descripcion,
        updated_at: new Date(),
        id_usuario: BigInt(userId),
      },
    });

    console.log("Categoria actualizada:", categoria);
 
  } catch (error) {
    // Solo errores reales de BD
    console.error("Error actualizando sesion:", error);
    redirect(
      `/categorias-productos/${categoriaId}/edit?error=Error al actualizar la sesion`
    );
  }
  redirect(`/categorias-productos/${categoriaId}/edit?success=Operacion Exitosa.`);
}
