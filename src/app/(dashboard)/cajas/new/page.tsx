import { NewCajaComponent } from "@/components";

export default async function NewCajaPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) {
  const awaitedSearchParams = await searchParams;
  return <NewCajaComponent searchParams={awaitedSearchParams} />;
}
