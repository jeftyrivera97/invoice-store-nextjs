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
import {
  comprobantesColumns,
  getComprobantes,
} from "@/helpers";
import Link from "next/link";

export const IndexTable = async function ({
  page,
  search,
}: {
  page?: string;
  search?: string;
}) {
  const pageNumber = parseInt(page || "1");
  const pageSize = 20;

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/comprobantes?page=1");

  // Usa el helper para obtener productos y paginación
  const { comprobantes, totalPages } = await getComprobantes({
    page: pageNumber,
    pageSize,
    search: search || "",
  });

  const columnsTable = comprobantesColumns;

  return (
    <>
      <Table>
        <TableCaption>Lista de comprobantes disponibles.</TableCaption>
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
          {comprobantes.map((comprobante) => (
            <TableRow key={comprobante.id.toString()}>
              <TableCell className="font-medium">{comprobante.id}</TableCell>
              <TableCell>{comprobante.codigo_comprobante}</TableCell>
              <TableCell>
                {comprobante.fecha
                  ? new Date(comprobante.fecha).toLocaleDateString("es-ES")
                  : ""}
              </TableCell>
              <TableCell>{comprobante.clientes?.razon_social || "N/A"}</TableCell>
              <TableCell>L. {comprobante.gravado15}</TableCell>
              <TableCell>L. {comprobante.gravado18}</TableCell>
              <TableCell>L. {comprobante.impuesto15}</TableCell>
              <TableCell>L. {comprobante.impuesto18}</TableCell>
              <TableCell>L. {comprobante.exento}</TableCell>
              <TableCell>L. {comprobante.exonerado}</TableCell>
              <TableCell>L. {comprobante.subtotal}</TableCell>
              <TableCell>L. {comprobante.total}</TableCell>
              <TableCell>{comprobante.categorias_comprobantes?.descripcion}</TableCell>
              <TableCell>{comprobante.tipos_comprobantes?.descripcion}</TableCell>
              <TableCell>{comprobante.estados?.descripcion}</TableCell>
              <TableCell>{comprobante.users?.name}</TableCell>
              <TableCell>
                {
                comprobante.id_tipo_comprobante === BigInt(1)
                  ? <Button variant="default"><Link href={`/comprobantes/${comprobante.id}`}>Ver</Link></Button>
                  : <Button variant="destructive"><Link href={`/comprobantes/${comprobante.id}/edit`}>Pagar</Link></Button>
                }
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
          href={`?page=${pageNumber + 1}`}
          className={`text-sm px-4 py-2 rounded border ${
            pageNumber >= totalPages ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Siguiente →
        </Link>
      </div>
    </>
  );
};
