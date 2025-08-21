import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface EditSessionData {
  sesionId: number;
  ventaEfectivo: number;
  cajaEfectivoContado: number;
  cajaEfectivoInicial: number;
}

export async function editSesionById({
  sesionId,
  cajaEfectivoContado,
  ventaEfectivo,
  cajaEfectivoInicial,
}: EditSessionData) {
  if (!sesionId || cajaEfectivoContado < 0) {
    redirect(`/cajas/sesiones/${sesionId}/edit?error=Datos inválidos`);
  }

  try {
    const cajaVentas = ventaEfectivo + cajaEfectivoInicial;
    const diferencia = cajaVentas - cajaEfectivoContado;

    const sesion = await prisma.cajas_sesiones.update({
      where: { id: BigInt(sesionId) },
      data: {
        fecha_cierre: new Date(),
        caja_efectivo_final: cajaEfectivoContado,
        id_estado_sesion: BigInt(2),
        id_estado: BigInt(2),
        diferencia: diferencia,
        updated_at: new Date(),
      },
    });

    console.log("Sesion actualizada:", sesion);
    // ✅ NO poner redirect aquí
  } catch (error) {
    // ✅ Solo errores reales de BD
    console.error("Error actualizando sesion:", error);
    redirect(
      `/cajas/sesiones/${sesionId}/edit?error=Error al actualizar la sesion`
    );
  }
  redirect(`/cajas/sesiones/${sesionId}/edit?success=Operacion Exitosa.`);
}
