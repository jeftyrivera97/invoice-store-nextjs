import prisma from "@/lib/prisma";
import { identity } from "lodash";

export async function getProveedoresById(id: string) {
  const dbData = await prisma.proveedores.findFirst({
     where: { id: BigInt(id) }, 
      
  });
  const data = JSON.parse(
    JSON.stringify(dbData, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return { data };
}
