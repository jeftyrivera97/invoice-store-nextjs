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
    console.log("Iniciando consulta de categorías de comprobantes...");
    const data = await prisma.categorias_comprobantes.findMany({
      where: { id_estado: BigInt(1) },
      include: {
        estados: true,
      },
    });

    // Convierte todos los BigInt a string
    const tiposComprobantes = convertBigIntToString(data);

    console.log(tiposComprobantes);

    return NextResponse.json(
      { data: tiposComprobantes },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error al obtener los tipos de comprobantes:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Error al obtener los tipos de comprobantes" },
      { status: 500 }
    );
  }
}
