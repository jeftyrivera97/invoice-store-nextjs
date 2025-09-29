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
    console.log("Iniciando consulta de metodos de pagos...");
    const data = await prisma.metodos_pagos.findMany({
      where: {
        id_estado: 1, // Solo obtener los métodos de pago activos
      }
    });

    // Convierte todos los BigInt a string
    const metodosPagos = convertBigIntToString(data);

    console.log(metodosPagos);

    return NextResponse.json(
      { data: metodosPagos },
      { status: 200 } // Cambia el estado a 200 para solicitudes GET exitosas
    );
  } catch (error: any) {
    console.error("Error al obtener los metodos de pagos:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Error al obtener los metodos de pagos" },
      { status: 500 }
    );
  }
}
