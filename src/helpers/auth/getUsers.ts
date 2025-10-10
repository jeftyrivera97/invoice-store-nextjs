import prisma from "@/lib/prisma";

export async function getUsers() {
  const dbData = await prisma.users.findMany({
  });

  // Función inline
  const data = JSON.parse(
    JSON.stringify(dbData, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return { data };
}

export async function getProductionUsers() {
  const dbData = await prisma.users.findMany({
    where: { id: { not: 1 } },
  });

  // Función inline
  const data = JSON.parse(
    JSON.stringify(dbData, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return { data };
}
