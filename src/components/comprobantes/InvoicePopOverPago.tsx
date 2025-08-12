"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useCartStore } from "@/hooks/store/useCartStore";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import getPagosCategorias from "@/helpers/pagos-categorias/getPagosCategorias";
import { PagoCategoria } from "@/types/PagoCategorias";

export const InvoicePopOverPago = () => {
  const [pagosCategorias, setPagosCategorias] = useState([]);
  const [efectivoValue, setEfectivoValue] = useState("");
  const [localReferencia, setLocalReferencia] = useState("");

  // Obtener datos del store
  const { total } = useSelector((state: RootState) => state.cart);
  const { metodoPagoSelected, metodo_pago, referenciaFill, referencia } = useCartStore();

  // Referencias
  const efectivoRef = useRef<HTMLInputElement>(null);
  const idComprobanteRef = useRef<HTMLInputElement>(null);
  const devolucionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getPagosCategorias().then((data) => setPagosCategorias(data));
  }, []);

  useEffect(() => {
    setLocalReferencia(referencia || "");
  }, [referencia]);


  // Función para manejar el cambio de categoría de pago
  const handlePagoCategoriaChange = (value: string) => {
    // Encontrar la categoría completa
    const categoria = pagosCategorias.find((cat: PagoCategoria) => cat.id === value);
    
    if (categoria) {
      // Actualizar el store con el método de pago seleccionado
      metodoPagoSelected(categoria); // O solo el ID si tu store lo maneja así
    }

    // Si selecciona efectivo (id="1") o tarjeta de débito (id="2")
    if (value === "1" || value === "2") {
      setTimeout(() => {
        efectivoRef.current?.focus();
        setLocalReferencia(""); // Limpia el estado del efectivo
        // Los valores de banco y comprobante se limpian automáticamente al estar disabled
      }, 100);
    } 
    else {
      // Para cualquier otro método de pago
      setTimeout(() => {
        idComprobanteRef.current?.focus();
        setEfectivoValue(""); // Limpia el estado del efectivo
        // La devolución se limpia automáticamente porque depende de efectivoValue
      }, 100);
    }
  };

  // Función para manejar cambio en el input de efectivo
  const handleEfectivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEfectivoValue(e.target.value);
  };

  // Función para manejar cambio en número de comprobante
  const handleComprobanteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalReferencia(e.target.value);
  };

  // Guardar en store cuando pierda el focus
  const handleComprobanteBlur = () => {
    referenciaFill(localReferencia);
  };

  // Función para calcular la devolución
  const calcularDevolucion = () => {
    const efectivoNumerico = parseFloat(efectivoValue) || 0;
    const devolucion = efectivoNumerico - total;
    return devolucion > 0 ? devolucion.toFixed(2) : "0.00";
  };

  // Calcula los estados de habilitación usando el ID del store
  const isEfectivo = metodo_pago?.id === "1" || metodo_pago?.id === "2";
  const hasSelection = metodo_pago?.id !== "" && metodo_pago?.id !== null;

  const isCodigoComprobanteDisabled = isEfectivo || !hasSelection;
  const isEfectivoDisabled = !isEfectivo;
  const isDevolucionDisabled = !isEfectivo;

  

  return (
    <>
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="tipo_pago">*Tipo de Pago</Label>
        <Select
          value={metodo_pago?.id || ""}
          onValueChange={handlePagoCategoriaChange}
          required
        >
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
        <Label htmlFor="maxWidth">No. Comprobante</Label>
        <Input
          disabled={isCodigoComprobanteDisabled}
          id="maxWidth"
          placeholder="Ingrese # de comprobante"
          className="col-span-2 h-8"
          value={localReferencia}
          onChange={handleComprobanteChange}
          onBlur={handleComprobanteBlur}  // ← Guardar cuando pierda focus
          ref={idComprobanteRef}
        />
      </div>

      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="efectivo">Efectivo</Label>
        <Input
          disabled={isEfectivoDisabled}
          id="efectivo"
          type="number"
          placeholder="0.00"
          value={efectivoValue}
          onChange={handleEfectivoChange}
          className="col-span-2 h-8"
          ref={efectivoRef}
        />
      </div>

      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="devolucion">Devolución</Label>
        <Input
          ref={devolucionRef}
          disabled={isDevolucionDisabled}
          id="devolucion"
          type="number"
          value={calcularDevolucion()}
          readOnly
          className="col-span-2 h-8"
        />
      </div>
    </>
  );
};
