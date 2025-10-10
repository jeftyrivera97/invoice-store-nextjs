"use client";
import { useInvoiceStore, useProductoStore } from "@/hooks";
import { useClienteStore } from "@/hooks";
import { useEffect } from "react";
import { ComprobanteItemsTable } from "./ComprobanteItemsTable";
import { ComprobanteCardProductAddComponent } from "./ComprobanteCardProductAddComponent";
import { ComprobanteCardImpuestosSection } from "./ComprobanteCardImpuestosSection";
import { ComprobanteCardPagosComponent } from './ComprobanteCardPagosComponent';
import { ComprobanteCardTotalesSection } from "./ComprobanteCardTotalesSection";



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
          <ComprobanteCardProductAddComponent />
        </div>

        {/* Columna 2 */}
        <div>
          <ComprobanteCardImpuestosSection />
        </div>
          {/* Columna 3 */}
         <div>
          <ComprobanteCardTotalesSection />
        </div>

        {/* Columna 4 - Nueva */}
        <div>
          <ComprobanteCardPagosComponent />
        </div>
      </div>

      <div className="grid auto-rows-min w-full gap-4 md:grid-cols-1 mt-4">
        <ComprobanteItemsTable />
      </div>
    </>
  );
};
