import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface GetComprobantesParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getComprobantes({ page = 1, pageSize = 50, search = "" }: GetComprobantesParams) {
  const pageNumber = page;

  const where =
    search && search.length > 0
      ? {
          OR: [
            { codigo_comprobante: { contains: search } },
            {
              clientes: {
                razon_social: { contains: search },
              },
            },
          ],
        }
      : undefined;

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/comprobantes?page=1");

  const [comprobantes, total] = await Promise.all([
    prisma.comprobantes.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where,
      include: {
        clientes: true,
        estados: true,
        tipos_comprobantes: true,
        categorias_comprobantes: true,
        estados_comprobantes: true,
        users: true,
      },
    }),
    prisma.comprobantes.count({ where }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    comprobantes,
    total,
    totalPages,
    page,
    pageSize,
    search,
  };
}

