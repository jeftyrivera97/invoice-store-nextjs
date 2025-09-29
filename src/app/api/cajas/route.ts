/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET() {
  try {
    console.log("Iniciando consulta de cajas...");
    const dbData = await prisma.cajas.findMany({
        include: {
            estados: true,
        }
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
    console.error("Error al obtener los cajas:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Error al obtener los clientes" },
      { status: 500 }
    );
  }
}