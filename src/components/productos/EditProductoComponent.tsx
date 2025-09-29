import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon, ArrowLeftIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  getCategoriasProductoById,
  getCategoriasProductos,
  getImpuestos,
  getImpuestosById,
  getProductoById,
  getProveedores,
  getProveedoresById,
} from "@/helpers";
import { EditProductoForm } from "./EditProductoForm";


export const EditProductoComponent = async ({
  params,
  alerts,
}: {
  params: { id: string };
  alerts?: { error?: string; success?: string };
}) => {
  const resolvedParams = await params;
  
  const categorias = await getCategoriasProductos();
  const impuestos = await getImpuestos();
  const proveedores = await getProveedores();

  const producto = await getProductoById(params.id);

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?error=Debe iniciar sesión");
  }

  console.log("Type of session.user.id:", typeof session.user.id);

  return (
    <>
      {/* Mostrar mensaje de error */}
      {alerts?.error && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error editando el producto.</AlertTitle>
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
      {alerts?.success && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert>
            <CheckCircle2Icon />
            <AlertTitle>Producto editado exitosamente!</AlertTitle>
            <AlertDescription>
              {decodeURIComponent(alerts.success)}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <Card className="w-full max-w-4xl">
        {" "}
        {/* Aumentar el ancho máximo */}
        <CardHeader>
          <CardTitle>Editar un producto</CardTitle>
          <CardDescription>Edite la información del producto.</CardDescription>
          <CardAction>
            <Button variant="destructive" size="icon" asChild>
              <Link href="/productos">
                <ArrowLeftIcon />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <EditProductoForm
            categorias={categorias.data}
            impuestos={impuestos.data}
            proveedores={proveedores.data}
            usuario={session.user}
            producto={producto.data}  // Extract the inner data object
          />
        </CardContent>
      </Card>
    </>
  );
};
