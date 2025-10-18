import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface GetProductsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getProveedores({
  page = 1,
  pageSize = 50,
  search = "",
}: GetProductsParams) {
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
            {
              codigo_proveedor: {
                contains: query,
                mode: "insensitive" as const,
              },
            },
            { descripcion: { contains: query, mode: "insensitive" as const } },
            { categoria: { contains: query, mode: "insensitive" as const } },
            { correo: { contains: query, mode: "insensitive" as const } },
            { contacto: { contains: query, mode: "insensitive" as const } },
            { telefono: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : undefined;

  if (isNaN(pageNumber as number) || (pageNumber as number) < 1) {
    redirect("/proveedores?page=1");
  }

  const [proveedores, total] = await Promise.all([
    prisma.proveedores.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where,
      include: {
        productos: true,
        compras: true,
        users: true,
        estados: true,
      },
      // opcional: orden consistente
      orderBy: { id: "asc" },
    }),
    prisma.proveedores.count({ where }), // <— aplica el mismo filtro aquí
  ]);

  return {
    proveedores,
    total,
    totalPages: Math.ceil(total / pageSize),
    page: pageNumber,
    pageSize,
    search: query,
  };
}
