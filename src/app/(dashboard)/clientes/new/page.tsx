import { NewClienteComponent } from "@/components";


export default async function NewClientePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const awaitedSearchParams = await searchParams;
  return (
    <>
      <NewClienteComponent searchParams={awaitedSearchParams} />
    </>
  );
}
