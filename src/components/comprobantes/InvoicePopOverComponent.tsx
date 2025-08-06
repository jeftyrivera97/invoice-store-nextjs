"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Printer } from "lucide-react";
import { useClienteStore } from "@/hooks";
import type { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCartStore } from "@/hooks/store/useCartStore";
import { useSelector } from "react-redux";
import getPagosCategorias from "@/helpers/pagos-categorias/getPagosCategorias";
import { PagoCategoria } from "@/types/PagoCategorias";

export const InvoicePopOverComponent = () => {
  const { data: clientes } = useClienteStore();

  const [pagosCategorias, setPagosCategorias] = useState([]);

  useEffect(() => {
    getPagosCategorias().then((data) => setPagosCategorias(data));
  }, []);

  useEffect(() => {
    console.log("pagosCategorias actualizado", pagosCategorias);
  }, [pagosCategorias]);

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
  } = useSelector((state: RootState) => state.cart);

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
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="tipo_pago">*Cliente</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Clientes</SelectLabel>
                    {clientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.descripcion} - {cliente.codigo_cliente}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="tipo_pago">*Tipo de Pago</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorías</SelectLabel>
                    {pagosCategorias.map((categoria: PagoCategoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.descripcion}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="tipo_pago">Banco</Label>
              <Select>
                <SelectTrigger >
                  <SelectValue placeholder="Seleccione Banco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorías</SelectLabel>
                    {pagosCategorias.map((categoria: PagoCategoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.descripcion}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">No. Comprobante</Label>
              <Input
                id="maxWidth"
                placeholder="Ingrese # de comprobante"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Efectivo</Label>
              <Input id="efectivo" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Devolucion</Label>
              <Input id="devolucion" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="agregar">&nbsp;</Label>
              <Button variant="destructive" className="col-span-2">
                <Printer className="mr-2" />
                Generar Factura
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
