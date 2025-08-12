"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Printer } from "lucide-react";
import type { RootState } from "@/store/store";
import { useCartStore } from "@/hooks/store/useCartStore";


export const InvoicePopSubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Obtener TODOS los datos del store
  const {
    items,
    total,
    subtotal,
    impuesto15,
    impuesto18,
    gravado15,
    gravado18,
    exento,
    descuento,
    porcentajeDescuento
  } = useSelector((state: RootState) => state.cart);

  const {
    cliente,
    metodo_pago,
    referencia,
    cleanCart,
  } = useCartStore();

  // Función para generar factura
  const handleGenerarFactura = async () => {
    try {
      setIsLoading(true);

      // Validaciones
      if (!cliente || !cliente.id) {
        alert("Por favor seleccione un cliente");
        return;
      }

      if (items.length === 0) {
        alert("No hay productos en el carrito");
        return;
      }

      if (!metodo_pago || !metodo_pago.id) {
        alert("Por favor seleccione un método de pago");
        return;
      }

      // Preparar datos desde el store
      const facturaData = {
        // Datos del cliente y usuario
        id_cliente: cliente.id,
        id_usuario: "1", // TODO: Obtener del auth store
        
        // Totales calculados
        gravado15: gravado15 || 0,
        gravado18: gravado18 || 0,
        impuesto15: impuesto15 || 0,
        impuesto18: impuesto18 || 0,
        exento: exento || 0,
        exonerado: 0,
        descuentos: descuento || 0,
        subtotal: subtotal,
        total: total,
        
        // Categorías y método de pago
        id_categoria: "1",
        id_tipo_factura: "1",
        id_metodo_pago: metodo_pago.id, // ← Asegurar que se envíe
        
        // Productos del carrito
        productos: items.map(item => ({
          id_producto: item.id,
          cantidad: item.cantidad,
          precio_unitario: item.precio_venta,
          subtotal: item.cantidad * item.precio_venta
        })),
        
        // Datos adicionales
        referencia: referencia || null,
        porcentaje_descuento: porcentajeDescuento || 0
      };

      console.log("Enviando factura con datos del store:", facturaData);

      // Enviar al API
      const response = await fetch('/api/facturas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facturaData)
      });

      const result = await response.json();

      if (result.success) {
        // ← Corregir acceso al código de factura
        const codigoFactura = result.data?.factura?.codigo_factura || "Sin código";
        alert(`¡Factura creada exitosamente!\nCódigo: ${codigoFactura}`);
        
        // Limpiar todo después del éxito
        cleanCart();
        
        console.log("Factura creada:", result.data);
        
      } else {
        console.error("Error al crear factura:", result.error);
        alert(`Error al crear factura: ${result.error}`);
      }

    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión al crear la factura");
    } finally {
      setIsLoading(false);
    }
  };
  // Determinar si el botón debe estar deshabilitado
  const isDisabled = isLoading || items.length === 0 || !cliente || !metodo_pago;

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <Label htmlFor="agregar">&nbsp;</Label>
      <Button 
        variant="destructive" 
        className="col-span-2"
        onClick={handleGenerarFactura}
        disabled={isDisabled}
      >
        <Printer className="mr-2" />
        {isLoading ? "Generando..." : "Generar Factura"}
      </Button>
    </div>
  );
};
