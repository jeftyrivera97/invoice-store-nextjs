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
  activateCajaById,
  facturasColumns,
  desactivateCajaById,
  getFacturas,
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

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/facturas?page=1");

  // Usa el helper para obtener productos y paginación
  const { facturas, totalPages } = await getFacturas({
    page: pageNumber,
    pageSize,
    search: search || "",
  });

  const columnsTable = facturasColumns;

  return (
    <>
      <Table>
        <TableCaption>Lista de facturas disponibles.</TableCaption>
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
          {facturas.map((factura) => (
            <TableRow key={factura.id.toString()}>
              <TableCell className="font-medium">{factura.id}</TableCell>
              <TableCell>{factura.codigo_factura}</TableCell>
              <TableCell>
                {factura.fecha
                  ? new Date(factura.fecha).toLocaleDateString("es-ES")
                  : ""}
              </TableCell>
              <TableCell>{factura.clientes?.descripcion}</TableCell>
              <TableCell>L. {factura.gravado15}</TableCell>
              <TableCell>L. {factura.gravado18}</TableCell>
              <TableCell>L. {factura.impuesto15}</TableCell>
              <TableCell>L. {factura.impuesto18}</TableCell>
              <TableCell>L. {factura.exento}</TableCell>
              <TableCell>L. {factura.exonerado}</TableCell>
              <TableCell>L. {factura.subtotal}</TableCell>
              <TableCell>L. {factura.total}</TableCell>
              <TableCell>{factura.categorias_facturas?.descripcion}</TableCell>
              <TableCell>{factura.tipos_facturas?.descripcion}</TableCell>
              <TableCell>{factura.estados?.descripcion}</TableCell>
              <TableCell>{factura.users?.name}</TableCell>
              <TableCell>
                {
                factura.id_tipo_factura === BigInt(1) 
                ? 
                  <Button variant="secondary"><Link href={`/facturas/${factura.id}`}>Ver</Link></Button>
                : 
                  <Button variant="destructive"><Link href={`/facturas/${factura.id}/edit`}>Pagar</Link></Button>
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
