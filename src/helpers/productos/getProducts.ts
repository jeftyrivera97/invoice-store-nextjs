import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface GetProductsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getProducts({ page = 1, pageSize = 50, search = "" }: GetProductsParams) {
  const pageNumber = page;

  // normaliza el search
  const query = (search ?? "").trim();


  const searchNumber = Number(search);
  const isSearchNumber = !isNaN(searchNumber);

  // Filtro correcto usando `is` en relaciones 1:1
  const where =
    query.length > 0
      ? {
        OR: [
          { codigo_producto: { contains: query, mode: "insensitive" as const } },
          { descripcion: { contains: query, mode: "insensitive" as const } },
          { marca: { contains: query, mode: "insensitive" as const } },
          { precio_venta: isSearchNumber ? { equals: searchNumber } : undefined },
          {
            categorias_productos: {
              is: {
                descripcion: { contains: query, mode: "insensitive" as const },
              },
            },
          },
          {
            proveedores: {
              is: {
                descripcion: { contains: query, mode: "insensitive" as const },
              },
            },
          },
        ],
      }
      : undefined;

  if (isNaN(pageNumber as number) || (pageNumber as number) < 1) {
    redirect("/productos?page=1");
  }

  const [productos, total] = await Promise.all([
    prisma.productos.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where,
      include: {
        categorias_productos: true,
        proveedores: true,
        impuestos: true,
      },
      // opcional: orden consistente
      orderBy: { id: "asc" },
    }),
    prisma.productos.count({ where }), // <— aplica el mismo filtro aquí
  ]);

  return {
    productos,
    total,
    totalPages: Math.ceil(total / pageSize),
    page: pageNumber,
    pageSize,
    search: query,
  };
}
