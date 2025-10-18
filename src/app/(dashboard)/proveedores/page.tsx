import IndexTable from "@/components/proveedores/IndexProveedorTable";
import { SearchInput } from "../../../components/shared/SearchInput";
import { AddButton, IndexPageTitle } from "@/components";

export default async function ProveedoresPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const awaitedSearchParams = await searchParams;

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div>
          <IndexPageTitle title="Lista de Proveedores" />
        </div>
        <div></div>
        <div></div>
        <div>
          <AddButton url="/proveedores/new" placeholder="Nuevo Proveedor" />
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-1 w-2/4">
          <div>
            <SearchInput placeholder="Buscar Proveedors..." />
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
