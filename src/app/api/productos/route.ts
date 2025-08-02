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

export async function GET() {
  try {
    console.log("Iniciando consulta de productos...");
  const productos = await prisma.productos.findMany({
    include: {
      producto_categorias: true, 
      proveedores: true,
      impuestos: true, // Incluye los datos de la relación con `impuestos`
    },
  });

    // Convierte todos los BigInt a string
    const productosSafe = convertBigIntToString(productos);

    console.log("Productos convertidos:", productosSafe);

    return NextResponse.json(
      { data: productosSafe },
      { status: 200 } // Cambia el estado a 200 para solicitudes GET exitosas
    );
  } catch (error: any) {
    console.error("Error al obtener los productos:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Error al obtener los productos" },
      { status: 500 }
    );
  }
}