
  interface EditFacturaProps {
    params: Promise<{ id: string }>; 
    searchParams: Promise<{ error?: string; success?: string }>; 
  }

export default async function EditFacturaPage({
  params,
  searchParams
}: EditFacturaProps) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <div>
      <h1>Editar Factura</h1>
    </div>
  );
}