"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Printer } from "lucide-react";
import type { RootState } from "@/store/store";
import { useInvoiceStore } from "@/hooks/store/useInvoiceStore";
import toast, { Toaster } from "react-hot-toast";

export const FacturaPopOverFormSubmittSection = () => {
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
    porcentajeDescuento,
  } = useSelector((state: RootState) => state.invoice);

  const { cliente, metodo_pago, referencia, cleanInvoice } = useInvoiceStore();

  const { user } = useSelector((state: RootState) => state.auth);

  // Función para generar factura
  const handleGenerarFactura = async () => {
    try {
      setIsLoading(true);

      // Validaciones
      if (!cliente || !cliente.id) {
        toast.error("Por favor seleccione un cliente", {
          duration: 1000,
          icon: "⚠️",
        });
        return;
      }

      if (items.length === 0) {
        toast.error("No hay productos en el carrito", {
          duration: 1000,
          icon: "⚠️",
        });
        return;
      }

      if (!metodo_pago || !metodo_pago.id) {
        toast.error("Por favor seleccione un método de pago", {
          duration: 1000,
          icon: "⚠️",
        });
        return;
      }

      if (metodo_pago.id !== "1" && metodo_pago.id !== "2") {
        if (!referencia) {
          toast.error("Por favor ingrese una referencia", {
            duration: 1000,
            icon: "⚠️",
          });
          return;
        }
      }

      // Preparar datos desde el store
      const facturaData = {
        // Datos del cliente y usuario
        id_cliente: cliente.id,
        id_usuario: user?.id,

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

        // Tipos
        id_metodo_pago: metodo_pago.id,
        id_categoria: metodo_pago.id !== "2" ? 1 : 3,
        id_tipo_factura: metodo_pago.id !== "2" ? 1 : 2,
        id_estado_factura: metodo_pago.id == "2" ? 3 : 2,

        // Productos del carrito
        productos: items.map((item) => ({
          id_producto: item.id,
          cantidad: item.cantidad,
          precio_unitario: item.precio_venta,
          subtotal: item.cantidad * item.precio_venta,
        })),

        // Datos adicionales
        referencia: referencia || null,
        porcentaje_descuento: porcentajeDescuento || 0,
      };

      console.log("Enviando factura con datos del store:", facturaData);

      // Enviar al API
      const response = await fetch("/api/facturas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facturaData),
      });

      const result = await response.json();

      if (result.success) {
        const codigoFactura =
          result.data?.factura?.codigo_factura || "Sin código";

        toast.success(
          `¡Factura creada exitosamente!\nCódigo: ${codigoFactura}`,
          {
            duration: 2500,
            icon: "🚀",
          }
        );
        console.log("Factura creada:", result.data);
        // Limpiar todo después del éxito
        cleanInvoice();
      } else {
        console.error("Error al crear factura:", result.error);
        toast.error(`Error al crear factura: ${result.error}`, {
          duration: 2500,
          icon: "❌",
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      toast.error("Error de conexión al crear la factura", {
        duration: 2500,
        icon: "❌",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Determinar si el botón debe estar deshabilitado
  const isDisabled =
    isLoading || items.length === 0 || !cliente || !metodo_pago;

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <Toaster position="top-center" reverseOrder={false} />
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
