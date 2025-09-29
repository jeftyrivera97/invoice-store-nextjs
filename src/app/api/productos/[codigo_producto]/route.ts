/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Función para convertir BigInt a string en un objeto o array
function convertBigIntToString(obj: any): any {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ codigo_producto: string }> }
) {
  try {
    const resolvedParams = await params;
    const { codigo_producto } = resolvedParams;
    
    console.log("🔍 Buscando producto con código:", codigo_producto);
    
    // Verificar que el código no esté vacío
    if (!codigo_producto || codigo_producto.trim() === "") {
      console.log("❌ Código de producto vacío");
      return NextResponse.json(
        { error: "Código de producto requerido" },
        { status: 400 }
      );
    }

    const producto = await prisma.productos.findFirst({
      where: { 
        codigo_producto: codigo_producto.trim(),
        deleted_at: null // Asegurarse de que no esté eliminado
      },
    });

    console.log("📦 Producto encontrado:", producto ? "SÍ" : "NO");

    if (!producto) {
      return NextResponse.json(
        { 
          error: "Producto no encontrado",
          codigo_buscado: codigo_producto 
        },
        { status: 404 }
      );
    }

    const productoSafe = convertBigIntToString(producto);
    console.log("✅ Producto devuelto exitosamente");

    return NextResponse.json({ data: productoSafe }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error en GET /api/productos/[codigo_producto]:", error);
    return NextResponse.json(
      { 
        error: error.message || "Error al obtener el producto",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}