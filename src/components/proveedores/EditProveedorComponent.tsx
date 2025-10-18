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
  getProveedoresById,
} from "@/helpers";

import { EditProveedorForm } from "./EditProveedorForm";


export const EditProveedorComponent = async ({
  params,
  alerts,
}: {
  params: { id: string };
  alerts?: { error?: string; success?: string };
}) => {
  const resolvedParams = await params;
  const proveedor = await getProveedoresById(params.id);

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
            <AlertTitle>Error editando el proveedor.</AlertTitle>
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
            <AlertTitle>Proveedor editado exitosamente!</AlertTitle>
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
          <CardTitle>Editar un proveedor</CardTitle>
          <CardDescription>Edite la información del proveedor.</CardDescription>
          <CardAction>
            <Button variant="destructive" size="icon" asChild>
              <Link href="/proveedores">
                <ArrowLeftIcon />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <EditProveedorForm
            usuario={session.user}
            proveedor={proveedor.data}  // Extract the inner data object
          />
        </CardContent>
      </Card>
    </>
  );
};
