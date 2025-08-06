import { NewInvoicePage } from "@/components/comprobantes/NewInvoicePage";
import { NewReceiptPage } from "@/components/comprobantes/NewReceiptPage";



export default async function NewComprobantePage({
  params,
}: {
  params: { type: string };
}) {

   const awaitedSearchParams = await params;

  console.log("params.type:", awaitedSearchParams);
  return (
    <>
      {awaitedSearchParams.type === "facturas" && <NewInvoicePage />}
      {awaitedSearchParams.type === "recibos" && <NewReceiptPage />}
    </>
  );
}