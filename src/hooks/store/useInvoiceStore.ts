/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  onAddToInvoice, // <-- Importa tu action para agregar
  onInvoiceLoading,
  onInvoiceError,
  onApplyDiscount, // <-- Importa la acción
  onRemoveFromInvoice,
  onRecalculateTotals,
  onClienteSelection,
  onMetodoPagoSelection,
  onTipoOperacionSelection,
  onReferenciaFill,
  onInvoiceClean,
  onCategoriaComprobanteSelection,
  onCurrencyLoad,
} from "@/store/invoice/invoiceSlice";

import { 
  InvoiceCategoryData,
  InvoiceCliente, 
  InvoiceMetodoPago 
} from "@/types/Invoices";

export const useInvoiceStore = () => {
  const {
    status,
    loading,
    items,
    errorMessage,
    counter,
    moduleName,
    moduleTitle,
    cliente,
    metodo_pago,
    tipo_operacion,
    categoria_comprobante,
    referencia,
    totalEUR,
    totalUSD,
    cambioDolar,
    cambioEuro,
  } = useSelector((state: RootState) => state.invoice);

  const dispatch = useDispatch();

  // Agregar un producto específico por su código
  const fetchProductoByCodigo = async (
    codigo_producto: string,
    cantidad: number = 1
  ): Promise<{ success: boolean; message?: string }> => {
    dispatch(onInvoiceLoading());
    try {
      const response = await fetch(`/api/productos/${codigo_producto}`);

      if (!response.ok) {
        if (response.status === 404) {
          dispatch(onInvoiceError("Producto no encontrado"));
          return { success: false, message: `Producto con código ${codigo_producto} no encontrado` };
        }
        if (response.status === 500) {
          dispatch(onInvoiceError("Error interno del servidor"));
          return { success: false, message: "Error interno del servidor al buscar el producto" };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      
      // Verificar si la respuesta tiene la estructura esperada
      if (!responseData || !responseData.data) {
        dispatch(onInvoiceError("Respuesta inválida del servidor"));
        return { success: false, message: "Respuesta inválida del servidor" };
      }

      const { data } = responseData;

      // Verificar que el producto tiene los campos necesarios
      if (!data.id || !data.codigo_producto || !data.precio_venta) {
        dispatch(onInvoiceError("Datos del producto incompletos"));
        return { success: false, message: "Los datos del producto están incompletos" };
      }

      const itemInvoice = {
        id: data.id,
        precio_venta: Number(data.precio_venta),
        codigo_producto: data.codigo_producto,
        descripcion: data.descripcion || "Sin descripción",
        cantidad: cantidad,
        precio: Number(data.precio_venta),
        gravado15: (Number(data.gravado15) || 0) * cantidad,
        gravado18: (Number(data.gravado18) || 0) * cantidad,
        impuesto15: (Number(data.impuesto15) || 0) * cantidad,
        impuesto18: (Number(data.impuesto18) || 0) * cantidad,
        exento: (Number(data.exento) || 0) * cantidad,
        exonerado: (Number(data.exonerado) || 0) * cantidad,
        total_linea: Number(data.precio_venta) * cantidad,
        total_lineaUSD: Number(data.precio_venta) * cantidad / cambioDolar,
        total_lineaEUR: Number(data.precio_venta) * cantidad / cambioEuro,
      };

      dispatch(onAddToInvoice(itemInvoice));
      return { success: true };
    } catch (error: any) {
      const errorMessage =
        error?.message || "Error desconocido al cargar el producto";
      dispatch(onInvoiceError(errorMessage));
      console.error("Error en fetchProductoByCodigo:", error);
      return { success: false, message: errorMessage };
    }
  };

  // Método para aplicar descuento
  const applyDiscount = (descuento: number) => {
    console.log("Descuento aplicado:", descuento);
    dispatch(onApplyDiscount(descuento));
    
  };


  const productInvoiceDelete = (codigo_producto: string) => {
    dispatch(onRemoveFromInvoice(codigo_producto));
    dispatch(onRecalculateTotals());
  };

  // Update the method signatures with proper typing
  const clienteSelected = (cliente: InvoiceCliente) => {
    dispatch(onClienteSelection(cliente));
  };

  const metodoPagoSelected = (metodo_pago: InvoiceMetodoPago) => {
    dispatch(onMetodoPagoSelection(metodo_pago));
  };

  const categoriaComprobanteSelected = (categoria_comprobante: InvoiceCategoryData) => {
    dispatch(onCategoriaComprobanteSelection(categoria_comprobante));
  };

  const tipoOperacionSelected = (tipo_operacion: InvoiceCategoryData) => {
    dispatch(onTipoOperacionSelection(tipo_operacion));
  };

  const referenciaFill = (referencia: string) => {
    dispatch(onReferenciaFill(referencia));
  };

  const cleanInvoice = () => {
    dispatch(onInvoiceClean());
  };

    const startCurrencyLoading = async (): Promise<void> => {
  
   
      try {

    // Obtener tipos de cambio desde la API
      const currencyResponse = await fetch('/api/currency');
      const currencyData = await currencyResponse.json();
      
      // Buscar dólar y euro en los datos obtenidos
      const dolar = currencyData.data?.find((curr: any) => curr.id === "1");
      const euro = currencyData.data?.find((curr: any) => curr.id === "2");

      const cambioDolar = Number(dolar?.venta || 26);
      const cambioEuro = Number(euro?.venta || 27);
      dispatch(onCurrencyLoad({ cambioDolar, cambioEuro }));

    }  catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Error desconocido al cargar los datos";
  
        console.error("❌ Error en startLoading:", errorMessage);
        dispatch(onInvoiceError(errorMessage));
      }
    };

  return {
    // Propiedades
    errorMessage,
    status,
    items,
    loading,
    counter,
    moduleName,
    moduleTitle,
    cliente,
    metodo_pago,
    tipo_operacion,
    referencia,
    categoria_comprobante,
    totalEUR,
    totalUSD,
    
    // Métodos
    fetchProductoByCodigo,
    applyDiscount, // <-- Exporta el método
    productInvoiceDelete,
    clienteSelected,
    metodoPagoSelected,
    tipoOperacionSelected,
    referenciaFill,
    cleanInvoice,
    categoriaComprobanteSelected,
    startCurrencyLoading,
  };
};
