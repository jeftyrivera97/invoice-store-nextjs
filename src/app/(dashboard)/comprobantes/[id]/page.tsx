import { ComprobanteIdShowComponent } from "@/components";


  interface ShowComprobanteProps {
    params: Promise<{ id: string }>; 
  }
export default async function ComprobantePage({
  params,
}: ShowComprobanteProps) {

  const resolvedParams = await params;
  return (
    <>
      <ComprobanteIdShowComponent
        params={resolvedParams}
      />
    </>
  );
}