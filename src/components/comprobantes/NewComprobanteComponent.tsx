"use client";
import { useProductoStore } from "@/hooks";
import { useClienteStore } from "@/hooks";
import { useEffect } from "react";



import { ComprobanteItemsTable } from "./ComprobanteItemsTable";
import { ComprobanteProductAddComponent } from "./ComprobanteProductAddComponent";
import { ComprobanteTotalesSection } from "./ComprobanteTotalesSection";


export const NewComprobanteComponent = () => {
  const { startLoading: startProductoLoading } = useProductoStore();
  const { startLoading: startClienteLoading } = useClienteStore();


  useEffect(() => {
    startProductoLoading();
    startClienteLoading();
  }, []);



  return (
    <>
      <div className="grid auto-rows-min w-full gap-4 md:grid-cols-[1fr_4fr]">
        {/* Columna 1 */}
        <div>
          <ComprobanteProductAddComponent />
        </div>

        {/* Columna 2 */}
        <div>
          <ComprobanteTotalesSection />
        </div>
      </div>

      <div className="grid auto-rows-min w-full gap-4 md:grid-cols-1">
        <ComprobanteItemsTable />
      </div>
    </>
  );
};
