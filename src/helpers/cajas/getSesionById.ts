import prisma from "@/lib/prisma";

export async function getSesionById(id: number) {
  const dbData = await prisma.cajas_sesiones.findUnique({
     where: { id: BigInt(id) }, 
      include: {
        cajas: true,
        users_cajas_sesiones_id_usuarioTousers: true,
        users_cajas_sesiones_id_usuario_auditorTousers: true,
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
