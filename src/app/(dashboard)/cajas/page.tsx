import { AddButton, IndexPageTitle } from "@/components";
import { IndexTable } from "@/components/cajas/IndexTable";

export default async function CajaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const awaitedSearchParams = await searchParams;

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <div>
          <IndexPageTitle title="Lista de Cajas" />
        </div>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div>
          <AddButton placeholder="Nueva Caja" url="/cajas/new" />
        </div>

        <div></div>

        <div></div>

        <div></div>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <IndexTable searchParams={awaitedSearchParams} />
      </div>
    </>
  );
}
