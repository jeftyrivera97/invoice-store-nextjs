import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface GetProductsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getProducts({ page = 1, pageSize = 50, search = "" }: GetProductsParams) {

  const pageNumber = page;

  const where =
    search && search.length > 0
      ? {
          OR: [
            { codigo_producto: { contains: search } },
            { descripcion: { contains: search } },
            { marca: { contains: search } },
            {
              producto_categorias: {
                descripcion: { contains: search },
              },
            },
            {
              proveedores: {
                descripcion: { contains: search },
              },
            },
          ],
        }
      : undefined;

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/productos?page=1");

  const [productos, total] = await Promise.all([
    prisma.productos.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where,
      include: {
        producto_categorias: true,
        proveedores: true,
        impuestos: true,
      },
    }),
    prisma.productos.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);


  return {
    productos,
    total,
    totalPages: Math.ceil(total / pageSize),
    page,
    pageSize,
    search,
 
  };
}




