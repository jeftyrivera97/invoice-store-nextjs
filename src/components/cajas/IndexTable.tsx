import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import  getCajas from "@/helpers/cajas/getCajas";
import { cajasColumns } from "@/helpers";

export default async function IndexTable() {
  

  // Usa el helper para obtener cajas y paginación
  const { data } = await getCajas();

  const columnsTable = cajasColumns;

  return (
    <>
      <Table>
        <TableCaption>Lista de cajas disponibles.</TableCaption>
        <TableHeader>
          <TableRow>
            {columnsTable.map((col) => (
              <TableHead key={col.label} className={col.className ?? ""}>
                {col.label}
              </TableHead>
            ))}
              <TableHead>Opciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((caja) => (
            <TableRow key={caja.id.toString()}>
              <TableCell className="font-medium">{caja.id}</TableCell>
              <TableCell>{caja.descripcion}</TableCell>
               <TableCell>Desactivar</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    
    </>
  );
}
