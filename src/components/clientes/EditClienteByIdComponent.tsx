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
import {
  createNewCliente,
  editClienteById,
  getClienteById,
  validateCreateCliente,
} from "@/helpers";

export const EditClienteByIdComponent = async ({
  params,
  alerts,
}: {
  params: { id: string };
  alerts?: { error?: string; success?: string };
}) => {
  const resolvedParams = await params;
  const { data } = await getClienteById(Number(resolvedParams.id));
  console.log(data);

  const handleUpdate = async (formData: FormData) => {
    "use server";
    await editClienteById({
      codigo_cliente: formData.get("codigo_cliente") as string,
      descripcion: formData.get("descripcion") as string,
      direccion: formData.get("direccion") as string,
      telefono: formData.get("telefono") as string,
      userId: data.userId,
      clienteId: Number(resolvedParams.id),
    });
  };

  return (
    <>
      {/* Mostrar mensaje de error */}
      {alerts?.error && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error editando el cliente.</AlertTitle>
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
            <AlertTitle>Cliente editado exitosamente!</AlertTitle>
            <AlertDescription>
              {decodeURIComponent(alerts.success)}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <form action={handleUpdate}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Editar cliente</CardTitle>
            <CardDescription>
              Modifica los datos del cliente
            </CardDescription>
            <CardAction>
              <Button variant="destructive" size="icon" asChild>
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
                  defaultValue={data.codigo_cliente || ""}
                  type="text"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descripcion">Nombre</Label>
                <Input
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  defaultValue={data.descripcion || ""}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="direccion">Direccion</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  type="text"
                  defaultValue={data.direccion || ""}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefono">Telefono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="text"
                  defaultValue={data.telefono || ""}
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
