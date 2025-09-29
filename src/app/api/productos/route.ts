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

export async function GET() {
  try {
    console.log("🔍 Iniciando consulta de productos...");
    
    // Primero, probar la conexión
    await prisma.$connect();
    console.log("✅ Conexión a BD establecida");
    
    const data = await prisma.productos.findMany({
      take: 10, // Limitar a 10 productos para prueba
      where: {
        deleted_at: null
      }
    });

    console.log("📦 Productos encontrados:", data.length);

    // Convierte todos los BigInt a string
    const productos = convertBigIntToString(data);

    return NextResponse.json(
      { 
        data: productos,
        total: data.length 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error al obtener los productos:", error.message, error.stack);
    return NextResponse.json(
      { 
        error: error.message || "Error al obtener los productos",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
