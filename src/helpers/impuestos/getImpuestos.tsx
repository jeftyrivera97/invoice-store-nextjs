import prisma from "@/lib/prisma";

export async function getImpuestos() {
  const dbData = await prisma.impuestos.findMany({
     where: { id_estado: BigInt(1) }, 
      
  });
  const data = JSON.parse(
    JSON.stringify(dbData, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return { data };
}
