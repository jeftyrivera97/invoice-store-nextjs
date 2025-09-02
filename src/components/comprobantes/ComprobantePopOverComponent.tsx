"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { RootState } from "@/store/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


import { useSelector } from "react-redux";
import { ComprobantePagoSection } from "./ComprobantePagoSection";
import { ComprobanteClienteSection } from "./ComprobanteClienteSection";
import { ComprobanteFormSubmitSection } from "./ComprobanteFormSubmitSection";



export const ComprobantePopOverComponent = () => {

  const { total } = useSelector((state: RootState) => state.invoice);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>DATOS DE PAGO</Button>
      </PopoverTrigger>
      <PopoverContent className="w-120">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Datos de Pago</h4>
            <p className="text-muted-foreground text-sm">
              Ingresa la información de pago aquí.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">*Total a Pagar</Label>
              <Input
                id="maxWidth"
                placeholder="L. 0.00"
                className="col-span-2 h-8"
                value={total.toFixed(2)}
                readOnly
              />
            </div>
            <ComprobanteClienteSection />
            <ComprobantePagoSection />
            <ComprobanteFormSubmitSection />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
