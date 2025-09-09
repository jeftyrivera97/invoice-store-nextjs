import prisma from "@/lib/prisma";

export default async function getSesiones() {
  const dbData = await prisma.cajas_sesiones.findMany({
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
