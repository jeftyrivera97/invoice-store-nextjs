import prisma from "@/lib/prisma";

export default async function getFolios() {
  const dbData = await prisma.folios.findMany({
    include: {
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
