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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import getCajas from "@/helpers/cajas/getCajas";
import { activateCajaById, cajasColumns, desactivateCajaById } from "@/helpers";
import { CajaData } from "@/types/Cajas";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
} from "lucide-react";


export const IndexTable = async function ({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) {
  const awaitedSearchParams = await searchParams;

  const columnsTable = cajasColumns;

  const { data } = await getCajas();

  return (
    <>
        {/* Mostrar mensaje de error */}
      {awaitedSearchParams.error && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error desactivando caja.</AlertTitle>
            <AlertDescription>
              <p>{decodeURIComponent(awaitedSearchParams.error)}</p>
              <ul className="list-inside list-disc text-sm mt-2">
                <li>Verifique los detalles el error</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Mostrar mensaje de éxito */}
      {awaitedSearchParams.success && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert>
            <CheckCircle2Icon />
            <AlertTitle>Caja desactivada exitosamente!</AlertTitle>
            <AlertDescription>
              {decodeURIComponent(awaitedSearchParams.success)}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <Table>
        <TableCaption>Lista de cajas disponibles.</TableCaption>
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
          {data.map((caja: CajaData) => (
            <TableRow key={caja.id.toString()}>
              <TableCell className="font-medium">{caja.id}</TableCell>
              <TableCell>{caja.descripcion}</TableCell>
              <TableCell>
                {caja.id_estado === "1" ? (
                  <form action={desactivateCajaById}>
                    <input type="hidden" name="id" value={caja.id} />
                    <Button type="submit" variant="destructive">
                      Desactivar
                    </Button>
                  </form>
                ) : (
                    <form action={activateCajaById}>
                    <input type="hidden" name="id" value={caja.id} />
                    <Button type="submit" variant="default">
                      Activar
                    </Button>
                  </form>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
