import { EditProductoComponent } from "@/components";


interface EditProductoPageProps {
  params: Promise<{ id: string }>; 
  searchParams: Promise<{ error?: string; success?: string }>; 
}

export default async function EditProductoPage({
  params,
  searchParams
}: EditProductoPageProps) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <EditProductoComponent 
        params={resolvedParams}
        alerts={resolvedSearchParams} 
      />
    </>
  );
}