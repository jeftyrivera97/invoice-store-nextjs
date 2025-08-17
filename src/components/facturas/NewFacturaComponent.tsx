"use client";
import { useProductoStore } from "@/hooks";
import { useClienteStore } from "@/hooks";
import { useEffect } from "react";



import { FacturaItemsTable } from "./FacturaItemsTable";
import { FacturaProductAddComponent } from "./FacturaProductAddComponent";
import { FacturaTotalesSection } from "./FacturaTotalesSection";


export const NewFacturaComponent = () => {
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
          <FacturaProductAddComponent />
        </div>

        {/* Columna 2 */}
        <div>
          <FacturaTotalesSection />
        </div>
      </div>

      <div className="grid auto-rows-min w-full gap-4 md:grid-cols-1">
        <FacturaItemsTable />
      </div>
    </>
  );
};
