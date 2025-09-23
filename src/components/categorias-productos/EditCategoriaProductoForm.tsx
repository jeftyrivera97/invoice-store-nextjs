
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
import { createNewCategoriaProducto, validateCreateCategoriaProducto, getCategoriaProductoById } from "@/helpers";

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
import { editCategoriaProductoById } from "@/helpers/categorias-productos/editCategoriaProductoById";

async function editCategoriaAction(formData: FormData) {
  "use server";

  // Obtener el ID de la categoría desde el formulario
  const categoriaId = parseInt(formData.get("categoriaId") as string);
  
  // Validar datos
  const { session, descripcion } = await validateCreateCategoriaProducto(
    formData
  );

  // Editar categoría
  await editCategoriaProductoById({
    descripcion,
    userId: session.user.id,
    categoriaId: categoriaId
  });
}

export const EditCategoriaProductoForm = async ({
  params,
  alerts
}: {
  params: { id: string };
  alerts: { error?: string; success?: string };
}) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?error=Debe iniciar sesión");
  }

  // Obtener datos de la categoría para precargar el formulario
  const categoriaId = parseInt(params.id);
  const categoria = await getCategoriaProductoById(categoriaId);

  return (
    <>
      {/* Mostrar mensaje de error */}
      {alerts.error && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error editando la categoría.</AlertTitle>
            <AlertDescription>
              <p>{decodeURIComponent(alerts.error)}</p>
              <ul className="list-inside list-disc text-sm mt-2">
                <li>Verifique los detalles el error</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Mostrar mensaje de éxito */}
      {alerts.success && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert>
            <CheckCircle2Icon />
            <AlertTitle>Categoría editada exitosamente!</AlertTitle>
            <AlertDescription>
              {decodeURIComponent(alerts.success)}
            </AlertDescription>
          </Alert>
        </div>
      )}
      <form action={editCategoriaAction}>
        {/* Campo oculto para el ID de la categoría */}
        <input type="hidden" name="categoriaId" value={categoriaId} />
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Editar Categoria de Producto</CardTitle>
            <CardDescription>
              Modifique la información de la categoria de producto.
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
                    defaultValue={categoria.descripcion}
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
