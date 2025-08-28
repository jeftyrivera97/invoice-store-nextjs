import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  ArrowLeftIcon,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Link from "next/link";
import { editSesionById, getSesionById, getUsers } from "@/helpers";
import { UsersType } from "@/types/User";

// ✅ Mover server action fuera del componente y corregir
async function editSession(formData: FormData) {
  "use server";

  const sesionId = formData.get("sesionId");
  const efectivoCajaFinal = formData.get("efectivo_caja_final");
  const efectivoCajaInicial = formData.get("efectivo_caja_inicial");
  const efectivoVenta = formData.get("venta_efectivo");
  const usuarioAuditor = formData.get("usuario_auditor");

  if (
    !sesionId ||
    !efectivoCajaFinal ||
    !efectivoCajaInicial ||
    !efectivoVenta ||
    !usuarioAuditor
  ) {
    redirect(`/cajas/sesiones/${sesionId}/edit?error=Faltan datos requeridos`);
  }

  await editSesionById({
    sesionId: Number(sesionId),
    cajaEfectivoInicial: Number(efectivoCajaInicial),
    cajaEfectivoContado: Number(efectivoCajaFinal),
    ventaEfectivo: Number(efectivoVenta),
    id_usuario_auditor: Number(usuarioAuditor),
  });
}

// Cambiar la interface del componente
export const EditSesionComponent = async ({
  params,
  alerts,
}: {
  params: { id: string };
  alerts?: { error?: string; success?: string };
}) => {
  // No necesitas await params porque ya están resueltos
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?error=Debe iniciar sesión");
  }

  //  Usar params.id directamente
  const { data: sesionData } = await getSesionById(Number(params.id));
  const { data: users } = await getUsers();

  if (!sesionData) {
    redirect("/cajas/sesiones?error=Sesión no encontrada");
  }

  return (
    <>
      {/* Mostrar mensaje de error */}
      {alerts?.error && (
        <div className="grid w-full max-w-xl items-start gap-4 mb-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error editando la sesión.</AlertTitle>
            <AlertDescription>
              <p>{decodeURIComponent(alerts.error)}</p>
              <ul className="list-inside list-disc text-sm mt-2">
                <li>Verifique los detalles del error</li>
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
            <AlertTitle>Sesión actualizada exitosamente!</AlertTitle>
            <AlertDescription>
              {decodeURIComponent(alerts.success)}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <form action={editSession}>
        {/* ✅ Usar params.id directamente */}
        <input type="hidden" name="sesionId" value={params.id} />

        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Cerrar Sesión de Caja</CardTitle>
            <CardDescription>
              Verifique los detalles y ingrese el efectivo contado manualmente.
            </CardDescription>
            <CardAction>
              <Button variant="outline" size="icon">
                <Link href="/cajas/sesiones">
                  <ArrowLeftIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna Izquierda */}
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="usuario">Usuario en Caja</Label>
                  <Input type="text" readOnly value={session.user.name || ""} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="caja">Caja</Label>
                  <Input
                    type="text"
                    readOnly
                    value={sesionData?.cajas?.descripcion || "N/A"}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fecha_apertura">Fecha Apertura</Label>
                  <Input
                    type="text"
                    readOnly
                    value={
                      new Date(sesionData?.fecha_apertura).toLocaleString() ||
                      ""
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="venta_efectivo">Ventas en Efectivo</Label>
                  <Input
                    type="number"
                    readOnly
                    value={sesionData?.venta_efectivo || 0}
                    id="venta_efectivo"
                    name="venta_efectivo"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="venta_tarjeta">Ventas con Tarjeta</Label>
                  <Input
                    type="number"
                    readOnly
                    value={sesionData?.venta_tarjeta || 0}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="venta_transferencia">
                    Ventas por Transferencia
                  </Label>
                  <Input
                    type="number"
                    readOnly
                    value={sesionData?.venta_transferencia || 0}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="venta_pago_link">Ventas Pago Link</Label>
                  <Input
                    type="number"
                    readOnly
                    value={sesionData?.venta_pago_link || 0}
                  />
                </div>
              </div>

              {/* Columna Derecha */}
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="venta_cheque">Ventas con Cheque</Label>
                  <Input
                    type="number"
                    readOnly
                    value={sesionData?.venta_cheque || 0}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="venta_credito">Créditos Otorgados</Label>
                  <Input
                    type="number"
                    readOnly
                    value={sesionData?.venta_credito || 0}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="total_ventas">Total Ventas Contado</Label>
                  <Input
                    type="number"
                    readOnly
                    value={sesionData?.total_contado || 0}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="saldo_inicial">Efectivo Inicial</Label>
                  <Input
                    type="number"
                    readOnly
                    value={sesionData?.caja_efectivo_inicial || 0}
                    id="efectivo_caja_inicial"
                    name="efectivo_caja_inicial"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fecha_cierre">Fecha Cierre</Label>
                  <Input
                    type="text"
                    readOnly
                    value={new Date().toLocaleString()}
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="usuario"
                    className="text-red-600 font-semibold"
                  >
                    *Usuario Auditor (Requerido)
                  </Label>
                  <Select name="usuario_auditor" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un Usuario Auditor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Usuarios</SelectLabel>
                        {users.map((user: UsersType) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="efectivo_caja_final"
                    className="text-red-600 font-semibold"
                  >
                    *Efectivo Contado (Requerido)
                  </Label>
                  <Input
                    type="number"
                    name="efectivo_caja_final"
                    id="efectivo_caja_final"
                    placeholder="Ingrese el efectivo contado"
                    step="0.01"
                    min="0"
                    required
                    className="border-red-300 focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" variant="destructive">
              <CheckCircle className="mr-2" />
              Cerrar Sesión Definitivamente
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
