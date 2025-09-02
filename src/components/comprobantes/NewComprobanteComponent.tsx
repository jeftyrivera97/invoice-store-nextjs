"use client";
import { useInvoiceStore, useProductoStore } from "@/hooks";
import { useClienteStore } from "@/hooks";
import { useEffect } from "react";
import { ComprobanteItemsTable } from "./ComprobanteItemsTable";
import { ComprobanteProductAddComponent } from "./ComprobanteProductAddComponent";
import { ComprobanteImpuestosSection } from "./ComprobanteImpuestosSection";
import { ComprobantePagosComponent } from './ComprobantePagosComponent';
import { ComprobanteTotalesSection } from "./ComprobanteTotalesSection";



export const NewComprobanteComponent = () => {
  const { startLoading: startProductoLoading } = useProductoStore();
  const { startLoading: startClienteLoading } = useClienteStore();
  const { startCurrencyLoading } = useInvoiceStore();


  useEffect(() => {
    startProductoLoading();
    startClienteLoading();
    startCurrencyLoading();
  }, []);



  return (
    <>
       <div className="grid w-full gap-2 md:grid-cols-[0.8fr_2.5fr_0.8fr_1.8fr]">
        {/* Columna 1 */}
        <div>
          <ComprobanteProductAddComponent />
        </div>

        {/* Columna 2 */}
        <div>
          <ComprobanteImpuestosSection />
        </div>
          {/* Columna 3 */}
         <div>
          <ComprobanteTotalesSection />
        </div>

        {/* Columna 4 - Nueva */}
        <div>
          <ComprobantePagosComponent />
        </div>
      </div>

      <div className="grid auto-rows-min w-full gap-4 md:grid-cols-1 mt-4">
        <ComprobanteItemsTable />
      </div>
    </>
  );
};
