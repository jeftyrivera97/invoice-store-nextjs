/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import GetCurrentUserId from "@/helpers/auth/getUserId";

export async function GET() {
  try {
    console.log("Iniciando consulta de cajas...");
    const dbData = await prisma.cajas_sesiones.findMany({
      include: {
        cajas: true,
        estados_sesiones: true,
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
      { status: 200 } // Cambia el estado a 200 para solicitudes GET exitosas
    );
  } catch (error: any) {
    console.error(
      "Error al obtener los cajas sesiones:",
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: error.message || "Error al obtener los cajas sesiones" },
      { status: 500 }
    );
  }
}

// export async function GET(request: Request) {
//   try {
//     const { userId } = await request.json();

//     if (!userId) {
//       return NextResponse.json({ sesion: null }, { status: 200 });
//     }

//     const sesion = await prisma.cajas_sesiones.findFirst({
//       where: {
//         id_usuario: BigInt(userId),
//         id_estado_sesion: BigInt(1), // Sesión abierta
//       },
//     });

//     return NextResponse.json({ sesion }, { status: 200 });
//   } catch (error) {
//     console.error("Error checking sesion:", error);
//     return NextResponse.json({ error: "Error interno" }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {

//   const id = await GetCurrentUserId();
//   try {
//     const body = await request.json();
//     const newSession = await prisma.cajas_sesiones.create({
//       data: {
//         id_caja: body.id_caja,
//         saldo_inicial: body.saldo_inicial,
//         saldo_final: 0,
//         fecha_apertura: new Date(),
//         fecha_cierre: new Date(),
//         venta_efectivo: 0,
//         venta_cheque: 0,
//         venta_pago_link: 0,
//         venta_credito: 0,
//         id_estado_sesion: 1,
//         id_estado: 1,
//         id_usuario: Number(id),
//         created_at: new Date(),
//         updated_at: new Date(),
//         deleted_at: null,
//       },
//     });

//     console.log("Exito creando la sesion: ", newSession);

//     return NextResponse.json({ data: newSession }, { status: 201 });
//   } catch (error: any) {
//     console.error("Error al crear la sesión:", error.message, error.stack);
//     return NextResponse.json(
//       { error: error.message || "Error al crear la sesión" },
//       { status: 500 }
//     );
//   }
// }
