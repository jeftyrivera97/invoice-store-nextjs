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
    console.log("Iniciando consulta de productos...");
    const data = await prisma.productos.findMany();

    console.log("Data:", data);

    // Convierte todos los BigInt a string
    const productos = convertBigIntToString(data);

    return NextResponse.json(
      { data: productos },
      { status: 200 } // Cambia el estado a 200 para solicitudes GET exitosas
    );
  } catch (error: any) {
    console.error(
      "Error al obtener los productos:",
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: error.message || "Error al obtener los productos" },
      { status: 500 }
    );
  }
}
