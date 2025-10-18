import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { getSesionesIndexTable } from "@/helpers/cajas/getSesiones";
import { sesionesColumns } from "@/helpers";
import { CajaSesionesData } from "@/types/Cajas";
import Link from "next/link";
import getSesiones from "@/helpers/cajas/getSesiones";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function IndexTable({
  page,
  search,
}: {
  page?: string;
  search?: string;
}) {
  const pageNumber = parseInt(page || "1");
  const pageSize = 50;

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/productos?page=1");

  const session = await getServerSession(authOptions);
  const idUsuario = session?.user?.id ? BigInt(session.user.id) : undefined;

  // Usa el helper para obtener productos y paginación
  const { sesiones, totalPages } = await getSesionesIndexTable({
    page: pageNumber,
    pageSize,
    search: search || "",
    id_usuario: idUsuario,
  });

  const columnsTable = sesionesColumns;

  return (
    <>
      <Table>
        <TableCaption>Lista Sesiones disponibles.</TableCaption>
        <TableHeader>
          <TableRow>
            {columnsTable.map((col) => (
              <TableHead key={col.label} className={col.className ?? ""}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sesiones.map((sesion: CajaSesionesData) => (
            <TableRow key={sesion.id.toString()}>
              <TableCell className="font-medium">{sesion.id}</TableCell>
              <TableCell>{sesion.cajas?.descripcion}</TableCell>
              <TableCell>{sesion.caja_efectivo_inicial}</TableCell>
              <TableCell>{sesion.caja_efectivo_final}</TableCell>
              <TableCell>
                {sesion.fecha_apertura
                  ? sesion.fecha_apertura.toLocaleString()
                  : ""}
              </TableCell>
              <TableCell>
                {sesion.fecha_cierre
                  ? sesion.fecha_cierre.toLocaleString()
                  : "Sin Cierre"}
              </TableCell>
              <TableCell>{sesion.venta_efectivo}</TableCell>
              <TableCell>{sesion.venta_tarjeta}</TableCell>
              <TableCell>{sesion.venta_transferencia}</TableCell>
              <TableCell>{sesion.venta_pago_link}</TableCell>
              <TableCell>{sesion.venta_cheque}</TableCell>
              <TableCell>{sesion.venta_credito}</TableCell>
              <TableCell>{sesion.total_contado}</TableCell>
              <TableCell>{sesion.diferencia}</TableCell>
              <TableCell>{sesion.estados_sesiones.descripcion}</TableCell>
              <TableCell>
                {sesion.users_cajas_sesiones_id_usuarioTousers.name}
              </TableCell>

              <TableCell>
                {sesion.id_estado_sesion === "1" ? (
                  <Button variant="destructive">
                    <Link href={`/cajas/sesiones/${sesion.id}/edit`}>
                      Cerrar
                    </Link>
                  </Button>
                ) : (
                  <Button variant="default">
                    <Link href={`/cajas/sesiones/${sesion.id}`}>Ver</Link>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Link
          href={`?page=${pageNumber - 1}`}
          className={`text-sm px-4 py-2 rounded border ${
            pageNumber <= 1 ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          ← Anterior
        </Link>

        <p className="text-sm">
          Página {pageNumber} de {totalPages}
        </p>

       <Link
          href={`?page=${pageNumber + 1}${search ? `&search=${encodeURIComponent(search)}` : ""}`}
          className={`text-sm px-4 py-2 rounded border ${
            pageNumber >= totalPages ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Siguiente →
        </Link>
      </div>
    </>
  );
}
