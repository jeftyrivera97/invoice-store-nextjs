"use client";
import { useInvoiceStore } from "@/hooks/store/useInvoiceStore";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { FacturaPopOverComponent } from "./FacturaPopOverComponent";

export const FacturaTotalesSection = () => {
  const {
    porcentajeDescuento,
    exento,
    gravado15,
    gravado18,
    impuesto15,
    impuesto18,
    subtotal,
    total,
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
    <div className="grid auto-rows-min w-full gap-4 md:grid-cols-4  border border-gray-600 rounded p-4">
      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="gravado15">Gravado 15%</Label>
          <Input type="number" id="gravado15" value={gravado15} readOnly />
        </div>
      </div>

      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="gravado18">Gravado 18%</Label>
          <Input type="number" id="gravado18" value={gravado18} readOnly />
        </div>
      </div>
      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="exento">Exento</Label>
          <Input type="number" id="exento" value={exento} readOnly />
        </div>
      </div>
      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="isv15">I.S.V 15%</Label>
          <Input type="number" id="isv15" value={impuesto15} readOnly />
        </div>
      </div>

      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="isv18">I.S.V 18%</Label>
          <Input type="number" id="isv18" value={impuesto18} readOnly />
        </div>
      </div>
      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="subtotal">SubTotal</Label>
          <Input type="number" id="subtotal" value={subtotal} readOnly />
        </div>
      </div>
   
      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="descuento">% Descuento</Label>
          <Input
            type="number"
            id="descuento"
            value={inputDescuento}
            min={0}
            onChange={handleDescuentoChange}
          />
        </div>
      </div>

      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="total">Descuento Otorgado</Label>
          <Input type="number" id="total" value={descuento} readOnly />
        </div>
      </div>

      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="total">TOTAL A PAGAR</Label>
          <Input type="number" id="total" value={total} readOnly />
        </div>
      </div>

      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="agregar">&nbsp;</Label>
          <FacturaPopOverComponent />
        </div>
      </div>
    </div>
  );
};
