import { ComprobanteIdEditComponent } from "@/components/comprobantes/ComprobanteIdEditComponent";


  interface EditComprobanteProps {
    params: Promise<{ id: string }>; 
    searchParams: Promise<{ error?: string; success?: string }>; 
  }

export default async function EditComprobantePage({
  params,
  searchParams
}: EditComprobanteProps) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <ComprobanteIdEditComponent
        params={resolvedParams}
        alerts={resolvedSearchParams}
      />
    </>
  );
}