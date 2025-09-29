import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

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

interface GetCategoriasParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getCategoriasProductosIndexTable({ page = 1, pageSize = 50, search = "" }: GetCategoriasParams) {

  const pageNumber = page;

  // Construir el filtro where con estado activo y búsqueda opcional
  const where = {
    id_estado: BigInt(1), // Solo categorías activas
    ...(search && search.length > 0
      ? {
          OR: [
            { descripcion: { contains: search } },
          ],
        }
      : {}),
  };

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/categorias-productos?page=1");

  const [categoriasRaw, total] = await Promise.all([
    prisma.categorias_productos.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where,
      include: {
        estados: true,
      },
    }),
    prisma.categorias_productos.count({ where }), // Usar el mismo filtro para el count
  ]);

  // Convertir BigInt a string para serialización
  const categorias = JSON.parse(
    JSON.stringify(categoriasRaw, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return {
    categorias,
    total,
    totalPages: Math.ceil(total / pageSize),
    page,
    pageSize,
    search,
  };
}

