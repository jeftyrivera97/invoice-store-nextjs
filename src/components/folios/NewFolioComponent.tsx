import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  Save,
  ArrowLeftIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ← Importar authOptions
import { createNewFolio, validateCreateFolio } from "@/helpers";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

async function createFolio(formData: FormData) {
  "use server";

  // Validar datos
  const { session, codigo, inicio, final } = await validateCreateFolio(
    formData
  );

  // Crear folio
  await createNewFolio({
    codigo,
    inicio,
    final,
    userId: session.user.id,
  });
}

export const NewFolioComponent = async ({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) => {
  const awaitedSearchParams = await searchParams;

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?error=Debe iniciar sesión");
  }

  return (
    <>
      {/* Mostrar mensaje de error */}
      {awaitedSearchParams.error && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error creando un nuevo folio.</AlertTitle>
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
            <AlertTitle>Folio creado exitosamente!</AlertTitle>
            <AlertDescription>
              {decodeURIComponent(awaitedSearchParams.success)}
            </AlertDescription>
          </Alert>
        </div>
      )}
      <form action={createFolio}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Nuevo Folio</CardTitle>
            <CardDescription>
              Ingrese la información del nuevo folio.
            </CardDescription>
            <CardAction>
              <Button variant="destructive" size="icon">
                <Link href="/folios">
                  <ArrowLeftIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="codigo">*Codigo</Label>
                <Input
                  type="text"
                  name="codigo"
                  id="codigo"
                  required
                  placeholder="Ej. xxx-xxx-xx-xxx"
                  defaultValue=""
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="saldo_inicial">*Inicio</Label>
                    <Input
                      type="number"
                      name="inicio"
                      id="inicio"
                      min="0"
                      step="1"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="saldo_inicial">*Final</Label>
                    <Input
                      type="number"
                      name="final"
                      id="final"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              <Save />
              Guardar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
