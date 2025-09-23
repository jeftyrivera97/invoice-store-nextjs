import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface getClientesParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getClientes({ page = 1, pageSize = 50, search = "" }: getClientesParams) {

  const pageNumber = page;

  const where =
    search && search.length > 0
      ? {
          OR: [
            { codigo_cliente: { contains: search } },
            { razon_social: { contains: search } },
            { direccion: { contains: search } },
          ],
        }
      : undefined;

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/clientes?page=1");

  const [clientes, total] = await Promise.all([
    prisma.clientes.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where,
    }),
    prisma.clientes.count({ where }),
  ]);

  return {
    clientes,
    total,
    totalPages: Math.ceil(total / pageSize),
    page,
    pageSize,
    search,
 
  };
}


