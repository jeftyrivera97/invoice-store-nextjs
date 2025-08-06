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
  { params }: { params: { codigo_producto: string } }
) {
  try {
    const { codigo_producto } = params;
    const producto = await prisma.productos.findFirst({
      where: { codigo_producto },
      include: {
        producto_categorias: true,
        proveedores: true,
        impuestos: true,
      },
    });

    if (!producto) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const productoSafe = convertBigIntToString(producto);

    return NextResponse.json({ data: productoSafe }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener el producto" },
      { status: 500 }
    );
  }
}