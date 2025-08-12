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
import { InvoicePopOverPago } from "./InvoicePopOverPago";
import { InvoicePopCliente } from "./InvoicePopCliente";
import { InvoicePopSubmitButton } from "./InvoicePopSubmitButton";



export const InvoicePopOverComponent = () => {

  const { total } = useSelector((state: RootState) => state.cart);

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
            <InvoicePopCliente />
            <InvoicePopOverPago />
            <InvoicePopSubmitButton />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
