"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useInvoiceStore } from "@/hooks/store/useInvoiceStore";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import getPagosCategorias from "@/helpers/metodos-pagos/getMetodosPagos";
import { PagoCategoria } from "@/types/PagoCategorias";
import getCategoriasComprobantes from "@/helpers/comprobantes/getCategoriasComprobantes";

export const ComprobantePagoSection = () => {
  const [pagosCategorias, setPagosCategorias] = useState([]);
  const [efectivoValue, setEfectivoValue] = useState("");
  const [localReferencia, setLocalReferencia] = useState("");
  const [tiposComprobantes, setTiposComprobantes] = useState([]);

  // Obtener datos del store
  const { total } = useSelector((state: RootState) => state.invoice);
  const { metodoPagoSelected, metodo_pago, referenciaFill, referencia, categoriaComprobanteSelected, categoria_comprobante } = useInvoiceStore();

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

  // Limpiar campos cuando no hay método de pago seleccionado
  useEffect(() => {
    if (!metodo_pago?.id || metodo_pago?.id === "") {
      setEfectivoValue("");
      setLocalReferencia("");
    }
  }, [metodo_pago?.id]);

  useEffect(() => {
  getCategoriasComprobantes().then((data) => setTiposComprobantes(data));
}, []);


  // Función para manejar el cambio de categoría de pago
  const handlePagoCategoriaChange = (value: string) => {
    const categoria = pagosCategorias.find((cat: PagoCategoria) => cat.id === value);
    
    if (categoria) {
      metodoPagoSelected(categoria);
    }

    // Si selecciona EFECTIVO (id="2")
    if (value === "2") {
      setTimeout(() => {
        efectivoRef.current?.focus(); // Enfocar input de efectivo
        setLocalReferencia(""); // Limpiar referencia
      }, 100);
    } 
    // Si selecciona CRÉDITO (id="1") 
    else if (value === "1") {
      setTimeout(() => {
        setEfectivoValue(""); // ← LIMPIAR el valor de efectivo
        setLocalReferencia(""); // Limpiar referencia
      }, 100);
    } 
    // Para cualquier otro método de pago
    else {
      setTimeout(() => {
        idComprobanteRef.current?.focus();
        setEfectivoValue(""); // ← LIMPIAR el valor de efectivo
      }, 100);
    }
  };

    const handleCategoriaComprobanteChange = (value: string) => {
    const categoria = tiposComprobantes.find((cat: PagoCategoria) => cat.id === value);

    if (categoria) {
      categoriaComprobanteSelected(categoria);
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
  const isEfectivo = metodo_pago?.id === "2"; // SOLO efectivo (id="2")
  const hasSelection = metodo_pago?.id !== "" && metodo_pago?.id !== null;

  // Input de comprobante: habilitado para crédito y otros (NO para efectivo)
 const isCodigoComprobanteDisabled = isEfectivo || !hasSelection || metodo_pago?.id === "1";

  // Input de efectivo: habilitado SOLO para efectivo (id="2")
  const isEfectivoDisabled = !isEfectivo;

  // Input de devolución: habilitado SOLO para efectivo (id="2")
  const isDevolucionDisabled = !isEfectivo;

  

  return (
    <>
     <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="tipo_pago">*Categoria de Comprobante</Label>
        <Select
          value={categoria_comprobante?.id || ""}
          onValueChange={handleCategoriaComprobanteChange}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorías</SelectLabel>
              {tiposComprobantes.map((tipo: PagoCategoria) => (
                <SelectItem key={tipo.id} value={tipo.id}>
                  {tipo.descripcion}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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
