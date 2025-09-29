import { EditCategoriaProductoForm } from "@/components";


interface EditCategoriaProductoPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}

export default async function EditCategoriaProductoPage({
  params,
  searchParams
}: EditCategoriaProductoPageProps) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <EditCategoriaProductoForm 
        params={resolvedParams}
        alerts={resolvedSearchParams} 
      />
    </>
  );
}