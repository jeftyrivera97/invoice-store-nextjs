import prisma from "@/lib/prisma";
import { identity } from "lodash";

export async function getProductoById(id: string) {
  const dbData = await prisma.productos.findFirst({
     where: { id: BigInt(id) }, 
      
  });
  const data = JSON.parse(
    JSON.stringify(dbData, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return { data };
}
