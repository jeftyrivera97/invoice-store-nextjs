import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface EditComprobanteData {
  comprobanteId: number;
}

export async function editComprobanteById({
  comprobanteId,
}: EditComprobanteData) {
  if (!comprobanteId) {
    redirect(`/comprobantes/${comprobanteId}/edit?error=Datos inválidos`);
  }

  try {

    const result = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el comprobante principal
      await tx.comprobantes.update({
        where: { id: BigInt(comprobanteId) },
        data: {
          codigo_comprobante: `TICKET-${Date.now()}`,
          id_tipo_comprobante: 1,
          id_categoria: 1,
          id_estado_comprobante: 3,
          updated_at: new Date(),
        },
      });

      const comprobante = await tx.comprobantes.findUnique({
        where: { id: BigInt(comprobanteId) },
        include: {
          clientes: true,
          categorias_comprobantes: true,
          tipos_comprobantes: true,
          estados_comprobantes: true,
          estados: true,
          users: true,
          comprobantes_detalles: true,
        },
      });

      const comprobantePago = await tx.comprobantes_pagos.findFirst({
        where: { id_comprobante: BigInt(comprobanteId) },
      });

      await tx.comprobantes_pagos.update({
        where: { id: comprobantePago?.id },
        data: {
          id_metodo_pago: 2,
          fecha_hora: new Date(),
          comentario: "Pagado con Efectivo",
          updated_at: new Date(),
        },
      });
        return comprobante;
    });

    console.log("Comprobante actualizado:", result);
    // ✅ NO poner redirect aquí
  } catch (error) {
    // ✅ Solo errores reales de BD
    console.error("Error actualizando comprobante:", error);
    redirect(
      `/comprobantes/${comprobanteId}/edit?error=Error al actualizar el comprobante`
    );
  }
  redirect(`/comprobantes/${comprobanteId}/edit?success=Operacion Exitosa.`);
}
