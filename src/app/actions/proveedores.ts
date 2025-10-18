"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function createProveedor(formData: FormData) {
  try {
    // Extraer datos del FormData
    const codigo_proveedor = formData.get("codigo_proveedor") as string;
    const descripcion = formData.get("descripcion") as string;
    const categoria = formData.get("descripcion") as string;
    const contacto = formData.get("contacto") as string;
    const telefono = formData.get("telefono") as string;
    const correo = formData.get("correo") as string;
    // Manejar el usuario de forma más robusta
    const usuarioRaw = formData.get("usuario") as string;
    const usuario = usuarioRaw ? parseInt(usuarioRaw, 10) : 1;

    // Validar que el usuario sea un número válido
    if (isNaN(usuario) || usuario <= 0) {
      throw new Error("ID de usuario inválido");
    }

    // Validaciones básicas
    if (!descripcion || !categoria || !contacto || !telefono || !correo) {
      throw new Error("Los campos obligatorios deben estar completos");
    }

    // Verificar si el código del proveedor ya existe (si se proporciona)
    if (codigo_proveedor) {
      const existingProveedor = await prisma.proveedores.findFirst({
        where: { codigo_proveedor },
      });

      if (existingProveedor) {
        throw new Error("Ya existe un proveedor con este código");
      }
    }

    // Debug: Log del objeto data antes de crear
    const dataToCreate = {
      codigo_proveedor,
      descripcion,
      categoria,
      contacto,
      telefono,
      correo,
      id_estado: 1,
      created_at: new Date(),
      updated_at: new Date(),
      id_usuario: usuario, // Usar la variable ya parseada en lugar de parsear de nuevo
    };

    // Crear el proveedor sin especificar ID - dejar que auto-increment funcione
    const nuevoProveedor = await prisma.proveedores.create({
      data: dataToCreate,
    });

    console.log("Proveedor creado exitosamente:", nuevoProveedor);
  } catch (error: any) {
    console.error("Error al crear proveedor:", error);

    // Redirigir con mensaje de error
    redirect(
      `/proveedores/new?error=${encodeURIComponent(
        error.message || "Error al crear el proveedor"
      )}`
    );
  }
  // Redirigir con mensaje de éxito
  redirect(
    `/proveedores/new?success=${encodeURIComponent("Operacion exitosa")}`
  );
}

export async function editProveedor(formData: FormData) {
  try {
    // Extraer datos del FormData
    const id = parseInt(formData.get("id") as string);
    const codigo_proveedor = formData.get("codigo_proveedor") as string;
    const descripcion = formData.get("descripcion") as string;
    const categoria = formData.get("categoria") as string;
    const contacto = formData.get("contacto") as string;
    const telefono = formData.get("telefono") as string;
    const correo = formData.get("correo") as string;
    // Manejar el usuario de forma más robusta
    const usuarioRaw = formData.get("usuario") as string;
    const usuario = usuarioRaw ? parseInt(usuarioRaw, 10) : 1;

    console.log("Editing proveedor with ID:", id);
    console.log("Form data received:", formData);

    // Validaciones básicas
    if (
      !codigo_proveedor ||
      !descripcion ||
      !categoria ||
      !contacto ||
      !telefono ||
      !correo
    ) {
      throw new Error("Los campos obligatorios deben estar completos");
    }

    // Actualizar el proveedor
    const proveedorActualizado = await prisma.proveedores.update({
      where: { id: id },
      data: {
        codigo_proveedor,
        descripcion,
        categoria,
        contacto,
        telefono,
        correo,
        id_estado: 1,
        updated_at: new Date(),
        id_usuario: usuario, // Usar la variable ya parseada en lugar de parsear de nuevo
      },
    });

    console.log("Proveedor actualizado exitosamente:", proveedorActualizado);

    // Revalidar la página de proveedores
    revalidatePath("/proveedores");
  } catch (error: any) {
    console.error("Error al actualizar proveedor:", error);

    // Redirigir con mensaje de error
    redirect(
      `/proveedores/${formData.get("id")}/edit/?error=${encodeURIComponent(
        error.message || "Error al actualizar el proveedor"
      )}`
    );
  }

  // Redirigir con mensaje de éxito
  redirect(
    `/proveedores/${formData.get("id")}/edit/?success=${encodeURIComponent(
      "Proveedor actualizado exitosamente"
    )}`
  );
}
