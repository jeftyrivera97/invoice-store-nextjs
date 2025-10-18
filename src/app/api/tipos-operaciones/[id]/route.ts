import { NextResponse } from "next/server";
import getTipoOperacionById from "@/helpers/comprobantes/getTipoOperacionById";

export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const tipoOperacion = await getTipoOperacionById(id);

    if (!tipoOperacion) {
      return NextResponse.json(
        { success: false, error: "Tipo de operación no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: tipoOperacion,
    });
  } catch (error) {
    console.error("Error obteniendo tipo de operación:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
