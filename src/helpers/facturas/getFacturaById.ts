/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";


export async function getFacturaById(id: number) {
  const dbData = await prisma.facturas.findUnique({
     where: { id: BigInt(id) }, 
      include: {
        estados_facturas: true,
        users: true,
        estados: true,
        clientes: true,
        tipos_facturas: true,
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
