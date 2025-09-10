"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { id } from "zod/v4/locales";

export async function createProducto(formData: FormData) {
  try {
    // Extraer datos del FormData
    const descripcion = formData.get("descripcion") as string;
    const id_categoria = parseInt(formData.get("id_categoria") as string);
    const marca = formData.get("marca") as string;
    const id_proveedor = parseInt(formData.get("id_proveedor") as string);
    const size = formData.get("size") as string;
    const id_impuesto = parseInt(formData.get("id_impuesto") as string);
    const peso = parseFloat(formData.get("peso") as string);
    const stock = parseFloat(formData.get("stock") as string);
    const precio_compra = parseFloat(formData.get("precio_compra") as string);
    const precio_venta = parseFloat(formData.get("precio_venta") as string);
    const codigo_producto = formData.get("codigo_producto") as string;
    const usuario = parseInt(formData.get("usuario") as string, 10) || 1;

    // Validaciones básicas
    if (!descripcion || !id_categoria || !id_proveedor || !id_impuesto || !marca) {
      throw new Error("Los campos obligatorios deben estar completos");
    }

    if (isNaN(precio_compra) || isNaN(precio_venta) || precio_compra < 0 || precio_venta < 0) {
      throw new Error("Los precios deben ser números válidos y positivos");
    }

    if (isNaN(peso) || isNaN(stock) || peso < 0 || stock < 0) {
      throw new Error("El peso y stock deben ser números válidos y positivos");
    }

    // Verificar si el código del producto ya existe (si se proporciona)
    if (codigo_producto) {
      const existingProduct = await prisma.productos.findFirst({
        where: { codigo_producto }
      });

      if (existingProduct) {
        throw new Error("Ya existe un producto con este código");
      }
    }

    // Crear el producto
    const nuevoProducto = await prisma.productos.create({
      data: {
        codigo_producto,
        descripcion,
        id_categoria,
        marca,
        size: size,
        id_proveedor,
        peso,
        stock,
        id_impuesto,
        precio_venta,
        valor: precio_venta, // El campo valor parece ser requerido
        created_at: new Date(),
        updated_at: new Date(),
        id_usuario: parseInt(formData.get("usuario") as string, 10),
      },
    });

    console.log("Producto creado exitosamente:", nuevoProducto);

    

  } catch (error: any) {
    console.error("Error al crear producto:", error);
    
    // Redirigir con mensaje de error
    redirect(`/productos/new?error=${encodeURIComponent(error.message || "Error al crear el producto")}`);
  }
  // Redirigir con mensaje de éxito
    redirect(`/productos/new?success=${encodeURIComponent("Operacion exitosa")}`);
}

export async function editProducto(formData: FormData) {
  try {
    // Extraer datos del FormData
    const id = parseInt(formData.get("id") as string);
    const descripcion = formData.get("descripcion") as string;
    const id_categoria = parseInt(formData.get("id_categoria") as string);
    const marca = formData.get("marca") as string;
    const id_proveedor = parseInt(formData.get("id_proveedor") as string);
    const size = formData.get("size") as string;
    const id_impuesto = parseInt(formData.get("id_impuesto") as string);
    const peso = parseFloat(formData.get("peso") as string);
    const stock = parseFloat(formData.get("stock") as string);
    const precio_compra = parseFloat(formData.get("precio_compra") as string);
    const precio_venta = parseFloat(formData.get("precio_venta") as string);
    const codigo_producto = formData.get("codigo_producto") as string;
    const usuario = parseInt(formData.get("usuario") as string, 10) || 1;

    // Validaciones básicas
    if (!id || !descripcion || !id_categoria || !id_proveedor || !id_impuesto || !marca) {
      throw new Error("Los campos obligatorios deben estar completos");
    }

    if (isNaN(precio_compra) || isNaN(precio_venta) || precio_compra < 0 || precio_venta < 0) {
      throw new Error("Los precios deben ser números válidos y positivos");
    }

    if (isNaN(peso) || isNaN(stock) || peso < 0 || stock < 0) {
      throw new Error("El peso y stock deben ser números válidos y positivos");
    }

    // Verificar si el código del producto ya existe en otro producto (si se proporciona)
    if (codigo_producto) {
      const existingProduct = await prisma.productos.findFirst({
        where: { 
          codigo_producto,
          NOT: { id: id } // Excluir el producto actual
        }
      });

      if (existingProduct) {
        throw new Error("Ya existe otro producto con este código");
      }
    }

    // Actualizar el producto
    const productoActualizado = await prisma.productos.update({
      where: { id: id },
      data: {
        codigo_producto,
        descripcion,
        id_categoria,
        marca,
        size: size,
        id_proveedor,
        peso,
        stock,
        id_impuesto,
        precio_venta,
        valor: precio_venta,
        updated_at: new Date(),
        id_usuario: usuario,
      },
    });

    console.log("Producto actualizado exitosamente:", productoActualizado);

    // Revalidar la página de productos
    revalidatePath("/productos");

  } catch (error: any) {
    console.error("Error al actualizar producto:", error);
    
    // Redirigir con mensaje de error
    redirect(`/productos/${formData.get("id")}/edit/?error=${encodeURIComponent(error.message || "Error al actualizar el producto")}`);
  }
  
  // Redirigir con mensaje de éxito
  redirect(`/productos/${formData.get("id")}/edit/?success=${encodeURIComponent("Producto actualizado exitosamente")}`);
}