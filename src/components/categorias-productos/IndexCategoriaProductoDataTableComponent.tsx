import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categoriasProductosColumns, getCategoriasProductosIndexTable } from "@/helpers";

import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from '@/components/ui/button';
import { CategoriaProductoData } from "@/types/Categorias-Productos";

export default async function IndexCategoriaProductoDataTableComponent({
  page,
  search,
}: {
  page?: string;
  search?: string;
}) {
  
  const pageNumber = parseInt(page || "1");
  const pageSize = 50;

  if (isNaN(pageNumber) || pageNumber < 1) redirect("/categorias-productos?page=1");

  // Usa el helper para obtener categorias y paginación
  const { categorias, totalPages } = await getCategoriasProductosIndexTable({
    page: pageNumber,
    pageSize,
    search: search || "",
  });

  const columnsTable = categoriasProductosColumns;

  return (
    <>
      <Table>
        <TableCaption>Lista de categorias de productos disponibles.</TableCaption>
        <TableHeader>
          <TableRow>
            {columnsTable.map((categoriasProductosColumns) => (
              <TableHead key={categoriasProductosColumns.label} className={categoriasProductosColumns.className ?? ""}>
                {categoriasProductosColumns.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {categorias.map((categoria: CategoriaProductoData) => (
            <TableRow key={categoria.id.toString()}>
              <TableCell className="font-medium">{categoria.id}</TableCell>
          
              <TableCell>{categoria.descripcion}</TableCell>
              
              <TableCell>
                <Button variant="destructive">
                  <Link href={`/categorias-productos/${categoria.id}/edit`}>Editar</Link>
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
}
