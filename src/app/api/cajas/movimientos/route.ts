/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// // Función para convertir BigInt a string en un objeto o array
// function convertBigIntToString(obj: any): any {
//   return JSON.parse(
//     JSON.stringify(obj, (key, value) =>
//       typeof value === "bigint" ? value.toString() : value
//     )
//   );
// }

export async function GET() {
  try {
    console.log("Iniciando consulta de movimientos...");
    const dbData = await prisma.cajas_movimientos.findMany({
      include: {
        cajas_sesiones: true,
        categorias_movimientos: true,
        estados: true,
        users: true,
      },
    });

    // Función inline
    const data = JSON.parse(
      JSON.stringify(dbData, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return NextResponse.json(
      { data },
      { status: 200 } // Cambia el estado a 200 para solicitudes GET exitosas
    );
  } catch (error: any) {
    console.error(
      "Error al obtener los cajas movimientos:",
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: error.message || "Error al obtener los cajas movimientos" },
      { status: 500 }
    );
  }
}
