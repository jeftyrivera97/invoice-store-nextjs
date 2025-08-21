/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";

export async function getSesionById(id: number) {
  const dbData = await prisma.cajas_sesiones.findUnique({
     where: { id: BigInt(id) }, 
      include: {
        cajas: true,
        users: true,
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

  return { data };
}
