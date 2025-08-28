  interface ShowFacturaProps {
    params: Promise<{ id: string }>; 
    searchParams: Promise<{ error?: string; success?: string }>; 
  }
export default async function FacturaPage({
  params,
  searchParams
}: ShowFacturaProps) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  return (
    <div>
      <h1>Factura Id Page</h1>
    </div>
  );
}