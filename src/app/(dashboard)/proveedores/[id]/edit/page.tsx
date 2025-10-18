import { EditProveedorComponent } from "@/components";


interface EditProveedorPageProps {
  params: Promise<{ id: string }>; 
  searchParams: Promise<{ error?: string; success?: string }>; 
}

export default async function EditProveedorPage({
  params,
  searchParams
}: EditProveedorPageProps) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <EditProveedorComponent 
        params={resolvedParams}
        alerts={resolvedSearchParams} 
      />
    </>
  );
}