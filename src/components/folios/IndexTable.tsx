import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { foliosColumns } from "@/helpers";
import getFolios from "@/helpers/folios/getFolios";
import { FolioData } from "@/types/Folios";

export default async function IndexTable() {
  const { data } = await getFolios();
  const columnsTable = foliosColumns;

  return (
    <>
      <Table>
        <TableCaption>Lista Folios disponibles.</TableCaption>
        <TableHeader>
          <TableRow>
            {columnsTable.map((col) => (
              <TableHead key={col.label} className={col.className ?? ""}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((folio: FolioData) => (
            <TableRow key={folio.id.toString()}>
              <TableCell className="font-medium">{folio.id}</TableCell>
              <TableCell className="font-medium">{folio.codigo_folio}</TableCell>
              <TableCell>{folio.inicio}</TableCell>
              <TableCell>{folio.final}</TableCell>
              <TableCell>{folio.actual}</TableCell>
              <TableCell>{folio.estados.descripcion}</TableCell>
              <TableCell>
                {folio.estados.id === "1" ? (
                  <Button variant="destructive">Cerrar</Button>
                ) : (
                  <Button variant="secondary">Ver</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
