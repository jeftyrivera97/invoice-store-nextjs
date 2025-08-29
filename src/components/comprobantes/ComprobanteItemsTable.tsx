"use client";

import { useInvoiceStore } from "@/hooks/store/useInvoiceStore";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ComprobanteItemsTable = () => {
  const { items } = useSelector((state: RootState) => state.invoice);

  const { productInvoiceDelete } = useInvoiceStore();

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <Table>
        <TableCaption>Contenido en Comprobante</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Opciones</TableHead>
            <TableHead>Cant.</TableHead>
            <TableHead>Codigo</TableHead>
            <TableHead>Descripcion</TableHead>

            <TableHead>Precio</TableHead>
            <TableHead>GR.15%</TableHead>
            <TableHead>GR.18%</TableHead>
            <TableHead>ISV15%</TableHead>
            <TableHead>ISV18%</TableHead>
            <TableHead>Exento</TableHead>
            <TableHead className="text-right">Total L.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.codigo_producto}>
              <TableCell>
                <Button
                  variant="destructive"
                  size="icon"
                  className="size-8"
                  onClick={() => productInvoiceDelete(item.codigo_producto)}
                >
                  <Trash />
                </Button>
              </TableCell>
              <TableCell>{item.cantidad}</TableCell>
              <TableCell>{item.codigo_producto}</TableCell>
              <TableCell>{item.descripcion}</TableCell>

              <TableCell>L. {item.precio.toFixed(2)}</TableCell>
              <TableCell>L. {item.gravado15.toFixed(2)}</TableCell>
              <TableCell>L. {item.gravado18.toFixed(2)}</TableCell>
              <TableCell>L. {item.impuesto15.toFixed(2)}</TableCell>
              <TableCell>L. {item.impuesto18.toFixed(2)}</TableCell>
              <TableCell>L. {item.exento.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                L. {item.total_linea.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
