

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
import { createNewCategoriaProducto, validateCreateCategoriaProducto } from "@/helpers";

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

async function createSession(formData: FormData) {
  "use server";

  // Validar datos
  const { session, descripcion } = await validateCreateCategoriaProducto(
    formData
  );

  // Crear sesión
  await createNewCategoriaProducto({
    descripcion,
    userId: session.user.id,
  });
}

export const NewCategoriaProductoForm = async ({
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
            <AlertTitle>Error creando una nueva categoria.</AlertTitle>
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
            <AlertTitle>Categoria creada exitosamente!</AlertTitle>
            <AlertDescription>
              {decodeURIComponent(awaitedSearchParams.success)}
            </AlertDescription>
          </Alert>
        </div>
      )}
      <form action={createSession}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Nueva Categoria de Producto</CardTitle>
            <CardDescription>
              Ingrese la información de la nueva categoria de producto.
            </CardDescription>
            <CardAction>
              <Button variant="destructive" size="icon">
                <Link href="/categorias-productos">
                  <ArrowLeftIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="descripcion">*Descripcion</Label>
                  <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Ingrese Descripcion"
                    required
                  />
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
