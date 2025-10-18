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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    console.log("🔍 Buscando tipo operacion con código:", id);
    
    // Verificar que el código no esté vacío
    if (!id || id.trim() === "") {
      console.log("❌ ID de tipo de operación vacío");
      return NextResponse.json(
        { error: "ID de tipo de operación requerido" },
        { status: 400 }
      );
    }

    const tipoOperacion = await prisma.tipos_operaciones.findFirst({
      where: { 
        id: BigInt(id),
        deleted_at: null // Asegurarse de que no esté eliminado
      },
    });

    console.log("Tipo de operación encontrado:", tipoOperacion ? "SÍ" : "NO");

    if (!tipoOperacion) {
      return NextResponse.json(
        { 
          error: "Tipo de operación no encontrado",
          id_buscado: id
        },
        { status: 404 }
      );
    }

    const tipoOperacionSafe = convertBigIntToString(tipoOperacion);
    console.log(" Tipo de operación devuelto exitosamente");

    return NextResponse.json({ data: tipoOperacionSafe }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error en GET /api/tipos-operaciones/[id]:", error);
    return NextResponse.json(
      { 
        error: error.message || "Error al obtener el tipo de operación",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}