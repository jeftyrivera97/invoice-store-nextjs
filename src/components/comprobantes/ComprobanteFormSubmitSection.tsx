/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Printer } from "lucide-react";
import type { RootState } from "@/store/store";
import { useInvoiceStore } from "@/hooks/store/useInvoiceStore";
import toast, { Toaster } from "react-hot-toast";
import { pdf } from "@react-pdf/renderer";
import InvoicePDFComponent from "./InvoicePDFComponent"; // ✅ Ajustar ruta
import InvoiceTicketPDFComponent from "./InvoiceTicketPDFComponent";
import InvoiceCreditoPDFComponent from "./InvoiceCreditoPDFComponent";

export const ComprobanteFormSubmitSection = () => {
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

  const {
    cliente,
    metodo_pago,
    referencia,
    cleanInvoice,
    categoria_comprobante,
  } = useInvoiceStore();

  const { user } = useSelector((state: RootState) => state.auth);

  // Función para generar comprobante
  const handleGenerarComprobante = async () => {
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

      if (!categoria_comprobante.id) {
        toast.error("Por favor seleccione una Categoria de Comprobante", {
          duration: 1000,
          icon: "⚠️",
        });
        return;
      }

      // Preparar datos desde el store
      const comprobanteData = {
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
        id_categoria_comprobante: categoria_comprobante.id,

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

      console.log("Enviando comprobante con datos del store:", comprobanteData);

      // Enviar al API
      const response = await fetch("/api/comprobantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comprobanteData),
      });

      const result = await response.json();

      if (result.success) {
        const codigoComprobante =
          result.data?.comprobante?.codigo_comprobante || "Sin código";

        toast.success(
          `¡Comprobante creado exitosamente!\nCódigo: ${codigoComprobante}`,
          {
            duration: 2500,
            icon: "🚀",
          }
        );

        // ✅ Generar y descargar PDF después del éxito

        await generarPDF(result.data);

        // Limpiar todo después del éxito
        cleanInvoice();
      } else {
        console.error("Error al crear comprobante:", result.error);
        toast.error(`Error al crear comprobante: ${result.error}`, {
          duration: 2500,
          icon: "❌",
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      toast.error("Error de conexión al crear la comprobante", {
        duration: 2500,
        icon: "❌",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Función para generar PDF
  const generarPDF = async (comprobanteData: any) => {
    try {
      console.log("Generando PDF con datos:", comprobanteData);

      const tipoC = comprobanteData.id_categoria_comprobante;
      const tipoP = comprobanteData.pagos.id_metodo_pago;
      console.log("ID Categoria Comprobante a PDF:", tipoC);
      console.log("TIPO COMPROBANTE: ", tipoC, "TIPO PAGO: ", tipoP);

      let component;
      if (tipoC == 2) {
        component = (
          <InvoicePDFComponent
            comprobante={comprobanteData.comprobante}
            detalles={comprobanteData.detalles}
            cliente={comprobanteData.cliente}
            items={items}
            folio={comprobanteData.folio}
            empresa={comprobanteData.empresa}
            tipoComprobante={comprobanteData.tipoComprobante}
            user={user}
            medioPago={comprobanteData.medioPago}
            cajaActiva={comprobanteData.cajaActiva}
          />
        );
      } else if (tipoC == 1 && tipoP != 1) {
        component = (
          <InvoiceTicketPDFComponent
            comprobante={comprobanteData.comprobante}
            detalles={comprobanteData.detalles}
            cliente={comprobanteData.cliente}
            items={items}
            empresa={comprobanteData.empresa}
            tipoComprobante={comprobanteData.tipoComprobante}
          />
        );
      } else if (tipoC == 1 && tipoP == 1) {
        component = (
          <InvoiceCreditoPDFComponent
            comprobante={comprobanteData.comprobante}
            detalles={comprobanteData.detalles}
            cliente={comprobanteData.cliente}
            items={items}
            empresa={comprobanteData.empresa}
            tipoComprobante={comprobanteData.tipoComprobante}
          />
        );
      } else {
        throw new Error("Tipo de comprobante no soportado");
      }

      const blob = await pdf(component).toBlob();

      // Crear URL del blob y descargar
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `comprobante-${comprobanteData.comprobante.codigo_comprobante}.pdf`;
      link.click();

      // Limpiar URL
      URL.revokeObjectURL(url);

      // Crear el PDF usando react-pdf/renderer
      toast.success("PDF generado exitosamente", {
        duration: 1500,
        icon: "📄",
      });
    } catch (error) {
      console.error("Error generando PDF:", error);
      toast.error("Error al generar PDF", {
        duration: 1500,
        icon: "❌",
      });
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
        onClick={handleGenerarComprobante}
        disabled={isDisabled}
      >
        <Printer className="mr-2" />
        {isLoading ? "Generando..." : "Generar Comprobante"}
      </Button>
    </div>
  );
};
