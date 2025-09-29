"use client";

import { useInvoiceStore } from "@/hooks/store/useInvoiceStore";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ComprobanteProductAddComponent = () => {
  const { fetchProductoByCodigo, applyDiscount } = useInvoiceStore();

  const [codigoProducto, setCodigoProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const codigoProductoRef = useRef<HTMLInputElement>(null);

  const onAddInvoiceButon = async () => {
    if (codigoProducto.trim()) {
      // Verificar primero si el producto existe sin usar el store
      try {
        const response = await fetch(`/api/productos/${codigoProducto}`);
        
        if (!response.ok) {
          // El producto no existe, mostrar error sin afectar el store
          toast.error(
            `Producto con código ${codigoProducto} no encontrado`,
            {
              duration: 2500,
              icon: "❌",
            }
          );
          setCodigoProducto("");
          if (codigoProductoRef.current) {
            codigoProductoRef.current.focus();
          }
          return;
        }

        // Si llegamos aquí, el producto existe, ahora usar el store
        const result = await fetchProductoByCodigo(codigoProducto, cantidad);

        if (result.success) {
          // Solo limpiar y resetear si el producto se agregó correctamente
          setCodigoProducto("");
          setCantidad(1);
          applyDiscount(0);
        }

        if (codigoProductoRef.current) {
          codigoProductoRef.current.focus();
        }
      } catch (error) {
        // Error de red o API
        toast.error("Error al buscar el producto", {
          duration: 2500,
          icon: "❌",
        });
        setCodigoProducto("");
        if (codigoProductoRef.current) {
          codigoProductoRef.current.focus();
        }
      }
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await onAddInvoiceButon();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Agregar Productos</CardTitle>
        <CardDescription>Ingrese cantidad y codigo de producto</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="cantidad">Cantidad</Label>
            <Input
              type="number"
              id="cantidad"
              placeholder="Cantidad"
              value={cantidad}
              min={1}
              onChange={(e) => setCantidad(Number(e.target.value) || 1)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="codigo_producto">Código Producto</Label>
            <Input
              type="text"
              id="codigo_producto"
              placeholder="Escanee o escriba el código"
              value={codigoProducto}
              ref={codigoProductoRef}
              onChange={(e) => setCodigoProducto(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </div>

          <Button
            size="default"
            className="w-full"
            onClick={onAddInvoiceButon}
            disabled={!codigoProducto.trim()}
          >
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Agregar Producto
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
