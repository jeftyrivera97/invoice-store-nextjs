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

import getCajas from "@/helpers/cajas/getSesiones";
import { sesionesColumns } from "@/helpers";
import { CajaSesionesData } from "@/types/Cajas";
import Link from 'next/link';

export default async function IndexTable() {
  // Usa el helper para obtener cajas y paginación
  const { data } = await getCajas();

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
          {data.map((caja: CajaSesionesData) => (
            <TableRow key={caja.id.toString()}>
              <TableCell className="font-medium">{caja.id}</TableCell>
              <TableCell>{caja.cajas?.descripcion}</TableCell>
              <TableCell>{caja.caja_efectivo_inicial}</TableCell>
              <TableCell>{caja.caja_efectivo_final}</TableCell>
              <TableCell>
                {caja.fecha_apertura
                  ? caja.fecha_apertura.toLocaleString()
                  : ""}
              </TableCell>
              <TableCell>
                {caja.fecha_cierre
                  ? caja.fecha_cierre.toLocaleString()
                  : "Sin Cierre"}
              </TableCell>
              <TableCell>{caja.venta_efectivo}</TableCell>
              <TableCell>{caja.venta_tarjeta}</TableCell>
              <TableCell>{caja.venta_transferencia}</TableCell>
              <TableCell>{caja.venta_pago_link}</TableCell>
              <TableCell>{caja.venta_cheque}</TableCell>
              <TableCell>{caja.venta_credito}</TableCell>
              <TableCell>{caja.total_contado}</TableCell>
              <TableCell>{caja.diferencia}</TableCell>
              <TableCell>{caja.estados_sesiones?.descripcion}</TableCell>
              <TableCell>{caja.users?.name}</TableCell>
              <TableCell>
                {caja.id_estado_sesion === "1" ? (
                  <Button variant="destructive">
                    <Link href={`/cajas/sesiones/${caja.id}/edit`}>
                      Cerrar
                    </Link>
                  </Button>
                ) : (
                  <Button variant="secondary">Ver</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
