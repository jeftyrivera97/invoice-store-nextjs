// app/productos/page.tsx or app/productos/page.jsx
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input"

export default async function ProductosPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || "1");
  const pageSize = 50;

  if (isNaN(page) || page < 1) redirect("/productos?page=1");

  const [productos, total] = await Promise.all([
    prisma.productos.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        producto_categorias: true,
        proveedores: true,
        impuestos: true,
      },
    }),
    prisma.productos.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-2">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <p className="text-sm font-medium">Lista de Productos</p>
          <div>
              <Input type="text" placeholder="Buscar Productos..." />
          </div>
        </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
      
      
        <Table>
          <TableCaption>Lista de productos disponibles.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Codigo</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead className="text-right">Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id.toString()}>
                <TableCell className="font-medium">{producto.id}</TableCell>
                <TableCell>{producto.codigo_producto}</TableCell>
                <TableCell>{producto.descripcion}</TableCell>
                <TableCell>{producto.producto_categorias?.descripcion || "Sin categoría"}</TableCell>
                <TableCell>{producto.proveedores?.descripcion || "Sin proveedor"}</TableCell>
                <TableCell className="text-right">
                  L.{producto.precio_venta?.toFixed(2) || "0.00"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <Link
            href={`?page=${page - 1}`}
            className={`text-sm px-4 py-2 rounded border ${page <= 1 ? "opacity-50 pointer-events-none" : ""}`}
          >
            ← Anterior
          </Link>

          <p className="text-sm">
            Página {page} de {totalPages}
          </p>

          <Link
            href={`?page=${page + 1}`}
            className={`text-sm px-4 py-2 rounded border ${page >= totalPages ? "opacity-50 pointer-events-none" : ""}`}
          >
            Siguiente →
          </Link>
        </div>
      </div>
    </div>
  );
}
