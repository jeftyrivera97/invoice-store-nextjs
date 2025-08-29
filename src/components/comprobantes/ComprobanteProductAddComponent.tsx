"use client";

import { useInvoiceStore } from "@/hooks/store/useInvoiceStore";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";



export const ComprobanteProductAddComponent = () => {

  const { fetchProductoByCodigo, applyDiscount } = useInvoiceStore();

  const [codigoProducto, setCodigoProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const codigoProductoRef = useRef<HTMLInputElement>(null);

  const onAddInvoiceButon = () => {
    if (codigoProducto) {
      fetchProductoByCodigo(codigoProducto, cantidad);
      setCodigoProducto(""); // Opcional: limpiar el input
      setCantidad(1);
      applyDiscount(0);

      if (codigoProductoRef.current) {
        codigoProductoRef.current.focus();
      }
    }
  };

  return (
    <div className="grid auto-rows-min w-full gap-4 md:grid-cols-1 border border-gray-600 rounded p-4">
      <div>
        <div className="grid w-full max-w-sm items-center gap-3 ">
          <Label htmlFor="codigo_producto">Codigo Producto</Label>
          <Input
            type="text"
            id="codigo_producto"
            placeholder="Codigo Producto"
            value={codigoProducto}
            ref={codigoProductoRef}
            onChange={(e) => setCodigoProducto(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="grid w-full max-w-sm items-center gap-3 ">
          <Label htmlFor="cantidad">Cantidad</Label>
          <Input
            type="number"
            id="cantidad"
            placeholder="Cantidad"
            value={cantidad}
            min={1}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
      </div>
      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="agregar">&nbsp;</Label>
          <Button size="sm" variant="secondary" onClick={onAddInvoiceButon}>
            <PlusCircleIcon />
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
};
