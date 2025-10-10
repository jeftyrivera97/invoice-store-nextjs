/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react"; // Agregar useEffect
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Printer, Eye, X } from "lucide-react"; // Agregar X icon
import type { RootState } from "@/store/store";
import { useInvoiceStore } from "@/hooks/store/useInvoiceStore";
import toast, { Toaster } from "react-hot-toast";
import { pdf } from "@react-pdf/renderer";
import InvoicePDFComponent from "./InvoicePDFComponent";
import InvoiceTicketPDFComponent from "./InvoiceTicketPDFComponent";
import InvoiceCreditoPDFComponent from "./InvoiceCreditoPDFComponent";

export const ComprobanteFormSubmitSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // Estado para el PDF

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

  // ✅ Hook para cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && pdfUrl) {
        cerrarPDF();
      }
    };

    if (pdfUrl) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [pdfUrl]);

  // ✅ Función para generar PDF (modificada)
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

      // Crear URL del blob para mostrar en navegador
      const url = URL.createObjectURL(blob);

      // Guardar la URL en el estado para mostrar el PDF
      setPdfUrl(url);

      toast.success("PDF generado exitosamente", {
        duration: 1500,
        icon: "📄",
      });

      return url; // Retornar la URL para usarla si es necesario
    } catch (error) {
      console.error("Error generando PDF:", error);
      toast.error("Error al generar PDF", {
        duration: 1500,
        icon: "❌",
      });
      throw error;
    }
  };

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

        // ✅ Generar PDF y mostrar en pantalla
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

  // Función para cerrar el visor de PDF
  const cerrarPDF = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  // Determinar si el botón debe estar deshabilitado
  const isDisabled =
    isLoading || items.length === 0 || !cliente || !metodo_pago;

  return (
    <>
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
          {isLoading ? "Imprimiendo..." : "Imprimir"}
        </Button>
      </div>

      {/* Modal para mostrar PDF */}
      {pdfUrl && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={cerrarPDF} // Cerrar al hacer clic en el overlay
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[95vh] sm:h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer clic dentro del modal
          >
            {/* Header del modal */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 border-b gap-2">
              <h3 className="text-base sm:text-lg font-semibold">Vista Previa del Comprobante</h3>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none text-xs sm:text-sm"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = pdfUrl;
                    link.download = `comprobante-${Date.now()}.pdf`;
                    link.click();
                  }}
                >
                  <Printer className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Descargar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-none text-xs sm:text-sm"
                  onClick={cerrarPDF}
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Cerrar
                </Button>
              </div>
            </div>

            {/* Contenido del PDF */}
            <div className="flex-1 p-2 sm:p-4 overflow-hidden">
              <iframe
                src={pdfUrl}
                className="w-full h-full border rounded"
                title="Vista previa del comprobante"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
