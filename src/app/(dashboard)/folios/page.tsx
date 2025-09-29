import { AddButton, IndexPageTitle, SearchInput } from "@/components";
import IndexTable from "@/components/folios/IndexTable";

export default function FoliosPage() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
              <div>
                <IndexPageTitle title="Lista de Folios de Facturacion" />
              </div>
              <div></div>
              <div></div>
              <div>
                <AddButton
                  url="/folios/new"
                  placeholder="Nuevo Folio"
                />
              </div>
      
              <div className="grid auto-rows-min gap-4 md:grid-cols-1 w-2/4">
                <div>
                  <SearchInput placeholder="Buscar Folios..." />
                </div>
              </div>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
              <IndexTable
              />
            </div>
    </>
  );
}