import { AddButton, IndexPageTitle } from "@/components";
import IndexTable from "@/components/folios/IndexTable";

export default function FoliosPage() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
              <div>
                <IndexPageTitle title="Lista de Folios" />
              </div>
            </div>
      
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
              <div>
                <AddButton placeholder="Nuevo Folio" url="/folios/new" />
              </div>
      
              <div></div>
      
              <div></div>
      
              <div></div>
            </div>
      
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
              <IndexTable />
            </div>
    </>
  );
}