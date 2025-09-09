import prisma from "@/lib/prisma";



export async function getComprobanteById(id: number) {
  const dbData = await prisma.comprobantes.findUnique({
     where: { id: BigInt(id) }, 
      include: {
        estados_comprobantes: true,
        users: true,
        estados: true,
        clientes: true,
        tipos_comprobantes: true,
        categorias_comprobantes: true,
      },
  });

  if (!dbData) {
    throw new Error("Comprobante no encontrada");
  }

    const dbDetalles = await prisma.comprobantes_detalles.findMany({
     where: { id_comprobante: BigInt(dbData.id) },
      include: {
        productos: true,
        comprobantes: true,
      },
  });


  // Función inline
  const data = JSON.parse(
    JSON.stringify(dbData, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  const detalles = JSON.parse(
    JSON.stringify(dbDetalles, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return { data, detalles };
}
