import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


export default async function getSesiones() {
  const dbData = await prisma.cajas_sesiones.findMany({
    include: {
      cajas: true,
      users_cajas_sesiones_id_usuarioTousers: true,
      estados_sesiones: true,
      estados: true,
    },
  });

  // Función inline
  const data = JSON.parse(
    JSON.stringify(dbData, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return { data };
}

interface GetSesionesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  id_usuario?: bigint;
}

export async function getSesionesIndexTable({ page = 1, pageSize = 50, search = "", id_usuario }: GetSesionesParams) {

  const pageNumber = page;


  if (isNaN(pageNumber) || pageNumber < 1) redirect("/cajas/sesiones?page=1");

  const where: any = {};

  if (search && search.length > 0) {
    // No explicit text fields here; keeping placeholder for future search
  }

  if (id_usuario !== undefined) {
    where.id_usuario = id_usuario;
  }

  const [sesionesRaw, total] = await Promise.all([
    prisma.cajas_sesiones.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: Object.keys(where).length ? where : undefined,
      include: {
        estados: true,
        users_cajas_sesiones_id_usuario_auditorTousers: true,
        users_cajas_sesiones_id_usuarioTousers: true,
        estados_sesiones: true,
      },
    }),
    prisma.cajas_sesiones.count({ where: Object.keys(where).length ? where : undefined }), // Usar el mismo filtro para el count
  ]);

  // Convertir BigInt a string para serialización
  const sesiones = JSON.parse(
    JSON.stringify(sesionesRaw, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return {
    sesiones,
    total,
    totalPages: Math.ceil(total / pageSize),
    page,
    pageSize,
    search,
    id_usuario,
  };
}
