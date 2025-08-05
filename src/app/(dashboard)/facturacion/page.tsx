import { CreateInvoicePage } from "@/components";





export default function FacturacionPage() {



  return (
    <>

     <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-2">
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">

        <CreateInvoicePage />
      </div>

      </div>
      
    
    </>
  );
}