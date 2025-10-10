"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useInvoiceStore } from "@/hooks/store/useInvoiceStore";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
//import { ComprobanteCurrencySection } from "./ComprobanteCurrencySection";

export const ComprobanteCardImpuestosSection = () => {
  const {
    porcentajeDescuento,
    exento,
    gravado15,
    gravado18,
    impuesto15,
    impuesto18,
    subtotal,

    descuento,
  } = useSelector((state: RootState) => state.invoice);

  const { applyDiscount } = useInvoiceStore();

  const [inputDescuento, setInputDescuento] = useState(porcentajeDescuento);

  useEffect(() => {
    setInputDescuento(porcentajeDescuento); // sincroniza si el descuento cambia en el store
  }, [porcentajeDescuento]);

  const handleDescuentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || 0;
    setInputDescuento(value);
    applyDiscount(value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Impuestos y Descuentos del Comprobante</CardTitle>
        <CardDescription>Resumen</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {/* Fila 1 */}
          <div className="grid gap-2">
            <Label htmlFor="gravado15">Gravado 15%</Label>
            <Input
              type="number"
              id="gravado15"
              value={gravado15.toFixed(2)}
              readOnly
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gravado18">Gravado 18%</Label>
            <Input
              type="number"
              id="gravado18"
              value={gravado18.toFixed(2)}
              readOnly
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="exento">Exento</Label>
            <Input
              type="number"
              id="exento"
              value={exento.toFixed(2)}
              readOnly
            />
          </div>

          {/* Fila 2 */}
          <div className="grid gap-2">
            <Label htmlFor="isv15">I.S.V 15%</Label>
            <Input
              type="number"
              id="isv15"
              value={impuesto15.toFixed(2)}
              readOnly
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="isv18">I.S.V 18%</Label>
            <Input
              type="number"
              id="isv18"
              value={impuesto18.toFixed(2)}
              readOnly
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subtotal">SubTotal</Label>
            <Input
              type="number"
              id="subtotal"
              value={subtotal.toFixed(2)}
              readOnly
            />
          </div>

          {/* Fila 3 */}
          <div className="grid gap-2">
            <Label htmlFor="descuento">% Descuento</Label>
            <Input
              type="number"
              id="descuento"
              value={inputDescuento}
              min={0}
              max={100}
              onChange={handleDescuentoChange}
              placeholder="0-100%"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="descuentoOtorgado">Descuento</Label>
            <Input
              type="number"
              id="descuentoOtorgado"
              value={descuento.toFixed(2)}
              readOnly
            />
          </div>
          <div></div>
        </div>
      </CardContent>
    </Card>
  );
};
