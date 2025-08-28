import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface GetFacturasParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getFacturas({ page = 1, pageSize = 50, search = "" }: GetFacturasParams) {
  const pageNumber = page;

  const where =
    search && search.length > 0
      ? {
          OR: [
            { codigo_factura: { contains: search } },
            {
              clientes: {
                descripcion: { contains: search },
              },
            },
          ],
        }
      : undefined;

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/facturas?page=1");

  const [facturas, total] = await Promise.all([
    prisma.facturas.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where,
      include: {
        clientes: true,
        estados: true,
        tipos_facturas: true,
        categorias_facturas: true,
        estados_facturas: true,
        users: true,
      },
    }),
    prisma.facturas.count({ where }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    facturas,
    total,
    totalPages,
    page,
    pageSize,
    search,
  };
}

