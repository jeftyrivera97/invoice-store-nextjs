import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  Save,
  ArrowLeftIcon,
} from "lucide-react";
import Link from "next/link";
import { createNewCliente, validateCreateCliente } from "@/helpers";

export const NewClienteComponent = async ({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) => {
  const awaitedSearchParams = await searchParams;

  async function createFolio(formData: FormData) {
    "use server";

    // Validar datos
    const { session, codigo_cliente, descripcion, direccion, telefono } =
      await validateCreateCliente(formData);

    // Crear folio
    await createNewCliente({
      codigo_cliente,
      descripcion,
      direccion,
      telefono,
      userId: session.user.id,
    });
  }

  return (
    <>
      {/* Mostrar mensaje de error */}
      {awaitedSearchParams.error && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error creando un nuevo cliente.</AlertTitle>
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
            <AlertTitle>Cliente editado exitosamente!</AlertTitle>
            <AlertDescription>
              {decodeURIComponent(awaitedSearchParams.success)}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <form action={createFolio}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Crear nuevo cliente</CardTitle>
            <CardDescription>
              Ingresa los datos del nuevo cliente
            </CardDescription>
            <CardAction>
              <Button variant="destructive" size="icon">
                <Link href="/clientes">
                  <ArrowLeftIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="codigo_cliente">RTN</Label>
                <Input
                  id="codigo_cliente"
                  name="codigo_cliente"
                  type="text"
                  placeholder="XXXX-XXXX-XXXXXX"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nombre_cliente">Nombre</Label>
                <Input
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  placeholder="Nombre del cliente"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="direccion">Direccion</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  type="text"
                  placeholder="Direccion del cliente"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefono">Telefono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="text"
                  placeholder="Telefono del cliente"
                  required
                />
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
