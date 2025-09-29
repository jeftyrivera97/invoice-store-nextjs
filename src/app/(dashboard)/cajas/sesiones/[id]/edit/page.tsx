import { EditSesionComponent } from "@/components/cajas/sesiones/EditSesionComponent";

interface EditSesionPageProps {
  params: Promise<{ id: string }>; 
  searchParams: Promise<{ error?: string; success?: string }>; 
}

export default async function EditSesionPage({
  params,
  searchParams
}: EditSesionPageProps) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <EditSesionComponent 
        params={resolvedParams}
        alerts={resolvedSearchParams} 
      />
    </>
  );
}