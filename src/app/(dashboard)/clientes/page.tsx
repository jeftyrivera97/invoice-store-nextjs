import ClienteIndexTable from "@/components/clientes/ClienteIndexTable";
import { SearchInput } from "../../../components/shared/SearchInput";
import { AddButton, IndexPageTitle } from "@/components";
import { Button } from "@/components/ui/button";

export default async function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const awaitedSearchParams = await searchParams;

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div>
          <IndexPageTitle title="Lista de Clientes" />
        </div>
        <div></div>
        <div></div>
        <div>
          <AddButton placeholder="Nuevo Cliente" url="/clientes/new" />
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-1 w-2/4">
          <div>
            <SearchInput placeholder="Buscar Clientes..." />
          </div>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <ClienteIndexTable
          page={awaitedSearchParams.page}
          search={awaitedSearchParams.search}
        />
      </div>
    </>
  );
}
