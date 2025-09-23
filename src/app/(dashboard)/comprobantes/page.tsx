import { SearchInput } from "../../../components/shared/SearchInput";
import { AddButton, ComprobantesIndexTable, IndexPageTitle } from "@/components";

export default async function ComprobantesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const awaitedSearchParams = await searchParams;

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div>
          <IndexPageTitle title="Lista de Comprobantes" />
        </div>
        <div></div>
        <div></div>
        <div>
          <AddButton
            url="/comprobantes/new"
            placeholder="Nuevo Comprobante"
          />
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-1 w-2/4">
          <div>
            <SearchInput placeholder="Buscar Comprobantes..." />
          </div>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <ComprobantesIndexTable
          page={awaitedSearchParams.page}
          search={awaitedSearchParams.search}
        />
      </div>
    </>
  );
}
