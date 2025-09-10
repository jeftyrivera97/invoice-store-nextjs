import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface CreateClienteType {
  codigo_cliente: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  userId: string | number;
  clienteId: string | number;
}

export async function editClienteById({
  codigo_cliente,
  descripcion,
  direccion,
  telefono,
  userId,
  clienteId,
}: CreateClienteType) {
  // Validaciones
  if (!codigo_cliente || !descripcion || !direccion || !telefono) {
    redirect("/clientes/new?error=Todos los campos son requeridos");
  }

  try {
    // Crear el cliente
    const nuevoCliente = await prisma.clientes.update({
      where: { id: Number(clienteId) },
      data: {
        codigo_cliente,
        descripcion,
        direccion,
        telefono,
        id_usuario: Number(userId), // Usar el userId pasado como parámetro
        updated_at: new Date(),
      },
    });

    console.log("Cliente editado:", nuevoCliente);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error al editar el cliente";
    console.error("Error al editar cliente:", message);
    redirect(`/clientes/${clienteId}/edit?error=Error al editar el cliente`);
  }

  redirect(
    `/clientes/${clienteId}/edit?success=Exito en la operacion. Ahora puede crear Comprobantes con este cliente.`
  );
}
