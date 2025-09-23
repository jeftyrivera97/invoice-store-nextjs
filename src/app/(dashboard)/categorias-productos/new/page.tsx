import { NewCategoriaProductoForm } from "@/components";

export default async function NewCategoriaProductoPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const awaitedSearchParams = await searchParams;
  return (
    <>
      <NewCategoriaProductoForm searchParams={awaitedSearchParams} />
    </>
  );
}