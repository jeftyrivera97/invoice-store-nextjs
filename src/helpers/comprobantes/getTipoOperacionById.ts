import prisma from "@/lib/prisma";

export default async function getTipoOperacionById(id: string) {
  const dbData = await prisma.tipos_operaciones.findUnique({
    where: {
      id: BigInt(id),
    },
  });

  if (!dbData) {
    return null;
  } 

  // Convertir BigInt a string para serialización
  const data = JSON.parse(
    JSON.stringify(dbData, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return data;
}
