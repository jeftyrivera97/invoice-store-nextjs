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
}

export async function createNewCliente({
  codigo_cliente,
  razon_social,
  nombre,
  apellido,
  direccion,
  telefono,
  correo,
  userId,
}: CreateClienteType) {
  // Validaciones
  if (!codigo_cliente || !nombre || !direccion || !telefono) {
    redirect("/clientes/new?error=Todos los campos son requeridos");
  }

  const existingCliente = await prisma.clientes.findFirst({
    where: { codigo_cliente: codigo_cliente },
  });

  if (existingCliente) {
    redirect("/clientes/new?error=Ya existe un cliente con ese código.");
  }

  try {
    // Crear el cliente
    const nuevoCliente = await prisma.clientes.create({
      data: {
        codigo_cliente,
        razon_social,
        nombre,
        apellido,
        direccion,
        telefono,
        correo,
        id_usuario: Number(userId), // Usar el userId pasado como parámetro
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log("Cliente creado:", nuevoCliente);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error al crear el cliente";
    console.error("Error al crear cliente:", message);
    redirect("/clientes/new?error=Error al crear el cliente");
  }

  redirect(
    "/clientes/new?success=Exito en la operacion. Ahora puede crear Comprobantes con este cliente."
  );
}
