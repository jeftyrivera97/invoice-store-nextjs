import { AddButton, IndexPageTitle, SearchInput } from "@/components";
import IndexCategoriaProductoDataTableComponent from "@/components/categorias-productos/IndexCategoriaProductoDataTableComponent";

interface CategoriasProductosPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function CategoriasProductosPage({
  searchParams,
}: CategoriasProductosPageProps) {
  const awaitedSearchParams = await searchParams;
  const page = awaitedSearchParams.page;
  const search = awaitedSearchParams.search;

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div>
          <IndexPageTitle title="Lista de Categorias" />
        </div>
        <div></div>
        <div></div>
        <div>
          <AddButton url="/categorias-productos/new" placeholder="Nueva Categoria" />
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-1 w-2/4">
          <div>
            <SearchInput placeholder="Buscar Categorias..." />
          </div>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <IndexCategoriaProductoDataTableComponent
          page={awaitedSearchParams.page}
          search={awaitedSearchParams.search}
        />
      </div>
    </>
  );
}
