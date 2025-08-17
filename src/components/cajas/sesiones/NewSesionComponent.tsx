import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import getCajas from "@/helpers/cajas/getCajas";
import { CajaData } from "@/types/Cajas";
import { redirect } from "next/navigation";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ← Importar authOptions
import { createNewSesion, validateCreateSesion } from "@/helpers";


async function createSession(formData: FormData) {
  "use server";

  // Validar datos
  const { session, cajaId, saldoInicial } = await validateCreateSesion(formData);

  // Crear sesión 
  await createNewSesion({
    cajaId,
    saldoInicial,
    userId: session.user.id
  });
}



export const NewSesionComponent = async ({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) => {
  const awaitedSearchParams = await searchParams;

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?error=Debe iniciar sesión");
  }

  const { data } = await getCajas();

  return (
    <>
      {/* Mostrar mensaje de error */}
      {awaitedSearchParams.error && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error creando una nueva sesión.</AlertTitle>
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
            <AlertTitle>Sesión creada exitosamente!</AlertTitle>
            <AlertDescription>
              {decodeURIComponent(awaitedSearchParams.success)}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <form
        action={createSession}
        className="grid grid-cols-1 gap-4 w-full max-w-sm border border-gray-200 rounded-md p-4"
      >
        {/* Fila 1: Select de Caja */}

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="caja">*Usuario en Caja</Label>
          <Input type="text" readOnly value={session.user.name} />
        </div>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="caja">*Caja</Label>
          <Select name="caja" required>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una caja" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cajas</SelectLabel>
                {data.map((caja: CajaData) => (
                  <SelectItem
                    key={caja.id.toString()}
                    value={caja.id.toString()}
                  >
                    {caja.descripcion}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Fila 2: Input de Saldo */}
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="saldo_inicial">Saldo en Caja</Label>
          <Input
            type="number"
            name="saldo_inicial"
            id="saldo_inicial"
            placeholder="Saldo Inicial"
            defaultValue="0"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Fila 3: Botón */}
        <div className="grid w-full items-center gap-3">
          <Button type="submit" className="w-full">
            Abrir Sesión
          </Button>
        </div>
      </form>
    </>
  );
};
