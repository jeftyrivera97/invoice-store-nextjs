import IndexTable from "@/components/productos/IndexTable";
import { SearchInput } from "../../../components/shared/SearchInput";
import { AddButton, IndexPageTitle } from "@/components";

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const awaitedSearchParams = await searchParams;

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div>
          <IndexPageTitle title="Lista de Productos" />
        </div>
        <div></div>
        <div></div>
        <div>
          <AddButton url="/productos/new" placeholder="Nuevo Producto" />
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-1 w-2/4">
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
    </>
  );
}
