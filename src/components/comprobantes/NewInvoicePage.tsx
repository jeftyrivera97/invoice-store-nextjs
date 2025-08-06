"use client";
import { useProductoStore } from "@/hooks";
import { useClienteStore } from "@/hooks";
import { useEffect } from "react";

import { TotalesComponent } from "./TotalesComponent";

import { InvoiceItemsTable } from "./InvoiceItemsTable";
import { InvoiceProductAddComponent } from "./InvoiceProductAddComponent";




export const NewInvoicePage = () => {
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
          <InvoiceProductAddComponent />
        </div>

        {/* Columna 2 */}
        <div>
          <TotalesComponent />
        </div>
      </div>

      <div className="grid auto-rows-min w-full gap-4 md:grid-cols-1">
        <InvoiceItemsTable />
      </div>
    </>
  );
};
