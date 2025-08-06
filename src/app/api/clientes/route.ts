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
    console.log("Iniciando consulta de clientes...");
    const data = await prisma.clientes.findMany();

    // Convierte todos los BigInt a string
    const clientes = convertBigIntToString(data);

    console.log(clientes);

    return NextResponse.json(
      { data: clientes },
      { status: 200 } // Cambia el estado a 200 para solicitudes GET exitosas
    );
  } catch (error: any) {
    console.error("Error al obtener los clientes:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Error al obtener los clientes" },
      { status: 500 }
    );
  }
}
