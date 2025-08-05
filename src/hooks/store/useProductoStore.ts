/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { RootState } from '@/store/store';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  onProductoFill,
  onProductoLoading,
  onProductoError,
} from "@/store/producto/productoSlice";


export const useProductoStore = () => {
  const {
    status,
    loading,
    data,
    errorMessage,
    counter,
    moduleName,
    moduleTitle,
  } = useSelector((state: RootState) => state.producto);

  const dispatch = useDispatch();

  // Carga inicial completa (dashboard + tabla) 
  const startLoading = async (): Promise<void> => {

     console.log( "Entre en startLoading");
    dispatch(onProductoLoading());
    try {
    const response = await fetch('/api/productos');
    const { data } = await response.json();
    dispatch(onProductoFill({ data }));

  }  catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error desconocido al cargar los datos";

      console.error("❌ Error en startLoading:", errorMessage);
      dispatch(onProductoError(errorMessage));
    }
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    data: data || [],
    loading,
    counter,
    moduleName,
    moduleTitle,
    //* Métodos
    startLoading,
  };
};
