import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


interface GetComprobantesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  id_usuario?: bigint;
}


export async function getComprobantes({ page = 1, pageSize = 50, search = "", id_usuario }: GetComprobantesParams) {
  const pageNumber = page;

  const where: any = {};

  if (search && search.length > 0) {
    where.OR = [
      { codigo_comprobante: { contains: search } },
      {
        clientes: {
          razon_social: { contains: search },
        },
      },
    ];
  }

  if (id_usuario !== undefined) {
    where.id_usuario = id_usuario;
  }

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/comprobantes?page=1");

  const [comprobantes, total] = await Promise.all([
    prisma.comprobantes.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: Object.keys(where).length > 0 ? where : undefined,
      include: {
        clientes: true,
        estados: true,
        tipos_comprobantes: true,
        categorias_comprobantes: true,
        estados_comprobantes: true,
        users: true,
      },
      orderBy: { id: "desc" },
    }),
    prisma.comprobantes.count({ where: Object.keys(where).length > 0 ? where : undefined }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    comprobantes,
    total,
    totalPages,
    page,
    pageSize,
    search,
    id_usuario,
  };
}

