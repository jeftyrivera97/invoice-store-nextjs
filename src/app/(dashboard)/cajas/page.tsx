import { AddButton, IndexPageTitle, SearchInput } from "@/components";
import { IndexTable } from "@/components/cajas/IndexTable";

export default async function CajaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const awaitedSearchParams = await searchParams;

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div>
          <IndexPageTitle title="Lista de Cajas de Cobros" />
        </div>
        <div></div>
        <div></div>
        <div>
          <AddButton url="/cajas/new" placeholder="Nueva Caja" />
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-1 w-2/4">
          <div>
            <SearchInput placeholder="Buscar Cajas..." />
          </div>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <IndexTable
         searchParams = {awaitedSearchParams}
        />
      </div>
    </>
  );
}
