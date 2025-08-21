import { NewFolioComponent } from "@/components";


export default async function NewFoliosPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) {
  const awaitedSearchParams = await searchParams;
  return (
    <>
      <NewFolioComponent searchParams={awaitedSearchParams} />
    </>
  );
}