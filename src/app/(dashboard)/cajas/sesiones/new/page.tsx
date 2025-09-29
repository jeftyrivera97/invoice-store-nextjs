import { NewSesionComponent } from "@/components";





export default async function NewSessionPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const awaitedSearchParams = await searchParams;
  return (
    <>
      <NewSesionComponent searchParams={awaitedSearchParams} />
    </>
  );
}