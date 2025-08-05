import IndexTable from "@/components/productos/IndexTable";
import { SearchInput } from "../../../components/shared/SearchInput";
import { IndexPageTitle } from "@/components";

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
   const awaitedSearchParams = await searchParams;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-2">
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <div>
          <IndexPageTitle title="Lista de Productos" />
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-1 w-1/4">
          <div>
            <SearchInput placeholder="Buscar Productos..." />
          </div>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <IndexTable
          page={awaitedSearchParams.page}
          search={awaitedSearchParams.search}
        />
      </div>
    </div>
  );
}
