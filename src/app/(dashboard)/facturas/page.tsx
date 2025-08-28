
import { SearchInput } from "../../../components/shared/SearchInput";
import { FacturasIndexTable, IndexPageTitle } from "@/components";

export default async function FacturasPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const awaitedSearchParams = await searchParams;

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <div>
          <IndexPageTitle title="Lista de Facturas" />
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-1 w-1/4">
          <div>
            <SearchInput placeholder="Buscar Facturas..." />
          </div>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <FacturasIndexTable
          page={awaitedSearchParams.page}
          search={awaitedSearchParams.search}
        />
      </div>
    </>
  );
}