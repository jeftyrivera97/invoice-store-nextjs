import prisma from "@/lib/prisma";

export async function getClienteById(id: number) {
  const dbData = await prisma.clientes.findUnique({
    where: { id: BigInt(id) },
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
