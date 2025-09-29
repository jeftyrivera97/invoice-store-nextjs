import { AddButton, IndexPageTitle } from "@/components";
import IndexTable from "@/components/cajas/sesiones/IndexTable";


export default function SesionesPage() {
  return (
    <>
     <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <div>
              <IndexPageTitle title="Lista de Sesiones" />
            </div>
          </div>
    
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div>
              <AddButton placeholder="Nueva Sesion" url="/cajas/sesiones/new" />
            </div>
    
            <div></div>
    
            <div></div>
    
            <div></div>
          </div>
    
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <IndexTable />
          </div>
       
    </>
  )
}
