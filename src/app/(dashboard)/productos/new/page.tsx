import { NewProductoComponent } from "@/components";


export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const awaitedSearchParams = await searchParams;
  return (
    <>
      <NewProductoComponent searchParams={awaitedSearchParams} />
    </>
  );
}