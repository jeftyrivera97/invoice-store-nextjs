import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { productosColumns } from "@/helpers";
import Link from "next/link";
import { getProducts } from "@/helpers/productos/getProducts";
import { redirect } from "next/navigation";
import { Button } from '@/components/ui/button';

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

  // Usa el helper para obtener productos y paginación
  const { productos, totalPages } = await getProducts({
    page: pageNumber,
    pageSize,
    search: search || "",
  });

  const columnsTable = productosColumns;

  return (
    <>
      <Table>
        <TableCaption>Lista de productos disponibles.</TableCaption>
        <TableHeader>
          <TableRow>
            {columnsTable.map((productosColumns) => (
              <TableHead key={productosColumns.label} className={productosColumns.className ?? ""}>
                {productosColumns.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {productos.map((producto) => (
            <TableRow key={producto.id.toString()}>
              <TableCell className="font-medium">{producto.id}</TableCell>
              <TableCell>{producto.codigo_producto}</TableCell>
              <TableCell>{producto.descripcion}</TableCell>
              <TableCell>
                {producto.categorias_productos?.descripcion || "Sin categoría"}
              </TableCell>
              <TableCell>{producto.marca}</TableCell>
              <TableCell>
                {producto.proveedores?.descripcion || "Sin proveedor"}
              </TableCell>
              <TableCell>{producto.stock}</TableCell>
              <TableCell >
                L.{producto.precio_venta?.toFixed(2) || "0.00"}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="destructive">
                  <Link href={`/productos/${producto.id}/edit`}>Editar</Link>
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
