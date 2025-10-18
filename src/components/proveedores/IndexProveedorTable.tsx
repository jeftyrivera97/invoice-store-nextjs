import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { proveedoresColumns } from "@/helpers";
import Link from "next/link";
import { getProveedores } from "@/helpers/proveedores/getProveedores";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function IndexTable({
  page,
  search,
}: {
  page?: string;
  search?: string;
}) {
  const pageNumber = parseInt(page || "1");
  const pageSize = 50;

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/proveedores?page=1");

  // Usa el helper para obtener proveedores y paginación
  const { proveedores, totalPages } = await getProveedores({
    page: pageNumber,
    pageSize,
    search: search || "",
  });

  const columnsTable = proveedoresColumns;

  return (
    <>
      <Table>
        <TableCaption>Lista de proveedors disponibles.</TableCaption>
        <TableHeader>
          <TableRow>
            {columnsTable.map((proveedoresColumns) => (
              <TableHead
                key={proveedoresColumns.label}
                className={proveedoresColumns.className ?? ""}
              >
                {proveedoresColumns.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {proveedores.map((proveedor) => (
            <TableRow key={proveedor.id.toString()}>
              <TableCell className="font-medium">{proveedor.id}</TableCell>
              <TableCell>{proveedor.codigo_proveedor}</TableCell>
              <TableCell>{proveedor.descripcion}</TableCell>
              <TableCell>{proveedor.categoria}</TableCell>
              <TableCell>{proveedor.contacto}</TableCell>
              <TableCell>{proveedor.telefono}</TableCell>
              <TableCell>{proveedor.correo}</TableCell>

              <TableCell className="text-right">
                <Button variant="destructive">
                  <Link href={`/proveedores/${proveedor.id}/edit`}>Editar</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Link
          href={`?page=${pageNumber - 1}${
            search ? `&search=${encodeURIComponent(search)}` : ""
          }`}
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
          href={`?page=${pageNumber + 1}${
            search ? `&search=${encodeURIComponent(search)}` : ""
          }`}
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
