import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


interface CreateFolioType {
  codigo: string;
  inicio: number;
  final: number;
  userId: string | number;
}

export async function createNewFolio({
  codigo,
  inicio,
  final,
  userId,
}: CreateFolioType) {
  // Validaciones
  if (!codigo || !inicio || !final) {
    redirect("/folios/new?error=Todos los campos son requeridos");
  }

  if (Number(inicio) >= Number(final)) {
    redirect("/folios/new?error=El número inicial debe ser menor que el final");
  }

  const existingFolio = await prisma.folios.findFirst({
    where: { id_estado: 1 },
  });

  if (existingFolio) {
    redirect(
      "/folios/new?error=Ya existe un folio activo. Debe desactivarlo primero."
    );
  }

  try {
    // Crear el folio
    const nuevoFolio = await prisma.folios.create({
      data: {
        codigo_folio: codigo,
        descripcion: "Folio de Facturacion",
        fecha_limite: new Date(),
        inicio: Number(inicio),
        final: Number(final),
        actual: Number(inicio - 1),
        id_estado: 1,
        id_usuario: Number(userId), // Usar el userId pasado como parámetro
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log("Folio creado:", nuevoFolio);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error al crear el folio";
    console.error("Error al crear folio:", message);
    redirect("/folios/new?error=Error al crear el folio");
  }


  redirect(
    "/folios/new?success=Exito en la operacion. Ahora puede ingresar Facturas con este Folio."
  );
}
