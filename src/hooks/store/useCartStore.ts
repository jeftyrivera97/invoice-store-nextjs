/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  onAddToCart, // <-- Importa tu action para agregar
  onCartLoading,
  onCartError,
  onApplyDiscount, // <-- Importa la acción
  onRemoveFromCart,
  onRecalculateTotals,
  onClienteSelection,
  onMetodoPagoSelection,
  onReferenciaFill,
} from "@/store/cart/cartSlice";


// Define the interfaces (or import them if they're exported from cartSlice)
interface Cliente {
  id: string;
  codigo_cliente: string;
  descripcion: string;
}

interface MetodoPago {
  id: string;
  descripcion: string;
}

export const useCartStore = () => {
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
    referencia,
  } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  // Agregar un producto específico por su código
  const fetchProductoByCodigo = async (
    codigo_producto: string,
    cantidad: number = 1
  ): Promise<void> => {
    dispatch(onCartLoading());
    try {
      const response = await fetch(`/api/productos/${codigo_producto}`);
      const { data } = await response.json();

      // Aquí puedes construir el objeto ItemCart según tu interfaz
      const itemCart = {
        id: data.id,
        precio_venta: data.precio_venta,
        codigo_producto: data.codigo_producto,
        descripcion: data.descripcion,
        cantidad: cantidad, // o la cantidad que el usuario seleccione
        precio: data.precio_venta,
        gravado15: (data.gravado15 ?? 0) * cantidad,
        gravado18: (data.gravado18 ?? 0) * cantidad,
        impuesto15: (data.impuesto15 ?? 0) * cantidad,
        impuesto18: (data.impuesto18 ?? 0) * cantidad,
        exento: (data.exento ?? 0) * cantidad,
        exonerado: (data.exonerado ?? 0) * cantidad,
        total_linea: data.precio_venta * cantidad, // o la lógica que necesites
      };

      dispatch(onAddToCart(itemCart));
    } catch (error: any) {
      const errorMessage =
        error?.message || "Error desconocido al cargar el producto";
      dispatch(onCartError(errorMessage));
    }
  };

  // Método para aplicar descuento
  const applyDiscount = (descuento: number) => {
    console.log("Descuento aplicado:", descuento);
    dispatch(onApplyDiscount(descuento));
    
  };


  const productCartDelete = (codigo_producto: string) => {
    dispatch(onRemoveFromCart(codigo_producto));
    dispatch(onRecalculateTotals());
  };

  // Update the method signatures with proper typing
  const clienteSelected = (cliente: Cliente) => {
    dispatch(onClienteSelection(cliente));
  };

  const metodoPagoSelected = (metodo_pago: MetodoPago) => {
    dispatch(onMetodoPagoSelection(metodo_pago));
  };

  const referenciaFill = (referencia: string) => {
    dispatch(onReferenciaFill(referencia));
  };

  const cleanCart = () => {
    dispatch(onRecalculateTotals());
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
    referencia,
    // Métodos
    fetchProductoByCodigo,
    applyDiscount, // <-- Exporta el método
    productCartDelete,
    clienteSelected,
    metodoPagoSelected,
    referenciaFill,
    cleanCart,
  };
};
