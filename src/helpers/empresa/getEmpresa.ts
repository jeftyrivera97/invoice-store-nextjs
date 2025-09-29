import prisma from "@/lib/prisma";

export async function getEmpresa(id: number = 1) {
  const dbData = await prisma.empresas.findUnique({
     where: { id: BigInt(id) }, 
      
  });
  const data = JSON.parse(
    JSON.stringify(dbData, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return { data };
}
