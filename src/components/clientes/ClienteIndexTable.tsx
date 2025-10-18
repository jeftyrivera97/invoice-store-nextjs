import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clientesColumns, getClientes } from "@/helpers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function ClienteIndexTable({
  page,
  search,
}: {
  page?: string;
  search?: string;
}) {
  const pageNumber = parseInt(page || "1");
  const pageSize = 50;

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/productos?page=1");

  // Usa el helper para obtener clientes y paginación
  const { clientes, totalPages } = await getClientes({
    page: pageNumber,
    pageSize,
    search: search || "",
  });

  const columnsTable = clientesColumns;

  return (
    <>
      <Table>
        <TableCaption>Lista de clientes disponibles.</TableCaption>
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
          {clientes.map((cliente) => (
            <TableRow key={cliente.id.toString()}>
              <TableCell className="font-medium">{cliente.id}</TableCell>
              <TableCell>{cliente.codigo_cliente}</TableCell>
              <TableCell>{cliente.razon_social}</TableCell>
              <TableCell>{cliente.nombre}</TableCell>
              <TableCell>{cliente.apellido}</TableCell>
              <TableCell>{cliente.direccion}</TableCell>
              <TableCell>{cliente.telefono}</TableCell>
               <TableCell>{cliente.correo}</TableCell>
              <TableCell>
                <Button variant="destructive">
                  <Link href={`/clientes/${cliente.id}/edit`}>Editar</Link>
                </Button>
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
