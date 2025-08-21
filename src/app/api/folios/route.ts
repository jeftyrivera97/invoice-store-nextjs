

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    console.log("Iniciando consulta de folios...");
    const dbData = await prisma.folios.findMany({
      include: {
        estados: true,
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
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error al obtener los folios";
    
    console.error("Error al obtener los folios:", message);
    
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    // Obtener datos del request
    const { codigo, inicio, final } = await request.json();

    // Validaciones
    if (!codigo || !inicio || !final) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    if (Number(inicio) >= Number(final)) {
      return NextResponse.json(
        { error: "El número inicial debe ser menor que el final" },
        { status: 400 }
      );
    }

    // Crear el folio
    const nuevoFolio = await prisma.folios.create({
      data: {
        codigo: codigo.toString(),
        inicio: Number(inicio),
        final: Number(final),
        actual: Number(inicio), // Empezar con el número inicial
        id_estado: 1, // Estado activo
        id_usuario: Number(session.user.id),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log("Folio creado:", nuevoFolio);

    // Convertir BigInt a string para JSON
    const folioResponse = JSON.parse(
      JSON.stringify(nuevoFolio, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return NextResponse.json(
      { 
        message: "Folio creado exitosamente",
        data: folioResponse 
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error al crear el folio";
    
    console.error("Error al crear folio:", message);
    
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
