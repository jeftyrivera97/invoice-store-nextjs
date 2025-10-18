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
import { ProveedorForm } from "./ProveedorForm";
export const NewProveedorComponent = async ({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) => {
  const awaitedSearchParams = await searchParams;


  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?error=Debe iniciar sesión");
  }

  console.log("Type of session.user.id:", typeof session.user.id);

  return (
    <>
      {/* Mostrar mensaje de error */}
      {awaitedSearchParams.error && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error creando un nuevo proveedor.</AlertTitle>
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
            <AlertTitle>Proveedor creado exitosamente!</AlertTitle>
            <AlertDescription>
              {decodeURIComponent(awaitedSearchParams.success)}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <Card className="w-full max-w-4xl">
        {" "}
        {/* Aumentar el ancho máximo */}
        <CardHeader>
          <CardTitle>Crear un nuevo proveedor</CardTitle>
          <CardDescription>
            Ingrese la información del nuevo proveedor.
          </CardDescription>
          <CardAction>
            <Button variant="destructive" size="icon" asChild>
              <Link href="/proveedores">
                <ArrowLeftIcon />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ProveedorForm
            usuario={session.user}
          />
        </CardContent>
      </Card>
    </>
  );
};
