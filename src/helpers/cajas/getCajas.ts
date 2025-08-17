import prisma from "@/lib/prisma";

export default async function getCajas() {
  const dbData = await prisma.cajas.findMany({
    include: {
      users: true,
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
