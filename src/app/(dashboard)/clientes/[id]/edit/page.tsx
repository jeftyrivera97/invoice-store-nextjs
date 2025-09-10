import { EditClienteByIdComponent } from "@/components";

interface EditClientePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}

export default async function EditClienteByIdPage({
  params,
  searchParams,
}: EditClientePageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  return (
    <>
      <EditClienteByIdComponent
        params={resolvedParams}
        alerts={resolvedSearchParams}
      />
    </>
  );
}
