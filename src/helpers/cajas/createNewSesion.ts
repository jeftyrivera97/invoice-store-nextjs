import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface CreateSessionData {
  cajaId: number;
  saldoInicial: number;
  userId: string | number;
}

export async function createNewSesion({
  cajaId,
  saldoInicial,
  userId,
}: CreateSessionData) {
  try {
    const nuevaSesion = await prisma.cajas_sesiones.create({
      data: {
        id_caja: Number(cajaId),
        caja_efectivo_inicial: saldoInicial,
        caja_efectivo_final: 0,
        faltante: 0,
        fecha_apertura: new Date(),
        fecha_cierre: null,
        venta_efectivo: 0,
        venta_cheque: 0,
        venta_pago_link: 0,
        venta_tarjeta: 0,
        venta_transferencia: 0,
        venta_credito: 0,
        total_contado: 0,
        id_estado_sesion: 1,
        id_estado: 1,
        id_usuario: Number(userId),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    });

    console.log("Sesión creada:", nuevaSesion);
  } catch (error) {
    console.error("Error creando sesión:", error);
    redirect("/cajas/sesiones/new?error=Error al crear la sesión");
  }

  redirect(
    "/cajas/sesiones/new?success=Ahora puede crear facturas con esta sesion."
  );
}
