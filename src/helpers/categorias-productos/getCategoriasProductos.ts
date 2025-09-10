import prisma from "@/lib/prisma";

export async function getCategoriasProductos() {
  const dbData = await prisma.categorias_productos.findMany({
     where: { id_estado: BigInt(1) }, 
      
  });
  const data = JSON.parse(
    JSON.stringify(dbData, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return { data };
}
