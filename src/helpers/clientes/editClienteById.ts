import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface CreateClienteType {
  codigo_cliente: string;
  razon_social: string;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  correo: string;
  userId: string | number;
  clienteId: string | number;
}

export async function editClienteById({
  codigo_cliente,
  razon_social,
  nombre,
  apellido,
  direccion,
  telefono,
  correo,
  userId,
  clienteId,
}: CreateClienteType) {
  // Validaciones
  if (!codigo_cliente || !nombre || !direccion || !telefono) {
    redirect("/clientes/new?error=Todos los campos son requeridos");
  }

  try {
    // Crear el cliente
    const nuevoCliente = await prisma.clientes.update({
      where: { id: Number(clienteId) },
      data: {
        codigo_cliente,
        razon_social,
        nombre,
        apellido,
        direccion,
        telefono,
        correo,
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
