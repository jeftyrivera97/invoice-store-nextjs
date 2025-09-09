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
