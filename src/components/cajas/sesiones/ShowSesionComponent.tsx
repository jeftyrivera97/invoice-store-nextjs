import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { getSesionById, getUsers } from "@/helpers";
import { CajaSesionesData } from '../../../types/Cajas';

// Cambiar la interface del componente
export const ShowSesionComponent = async ({
  params,
  alerts,
}: {
  params: { id: string };
  alerts?: { error?: string; success?: string };
}) => {
  //  Usar params.id directamente
  const { data: sesionData }: { data: CajaSesionesData } = await getSesionById(Number(params.id));

  if (!sesionData) {
    redirect("/cajas/sesiones?error=Sesión no encontrada");
  }

  return (
    <>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Ver Sesion de Caja</CardTitle>
          <CardDescription>Visualize los detalles.</CardDescription>
          <CardAction>
            <Button variant="destructive" size="icon">
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
                <Label htmlFor="usuario">Usuario de Sesion</Label>
                <Input
                  type="text"
                  readOnly
                  value={sesionData.users_cajas_sesiones_id_usuarioTousers.name || ""}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="usuario">Usuario Auditor</Label>
                <Input
                  type="text"
                  readOnly
                  value={sesionData.users_cajas_sesiones_id_usuario_auditorTousers.name  || ""}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fecha_apertura">Fecha Apertura</Label>
                <Input
                  type="text"
                  readOnly
                  value={
                    new Date(sesionData?.fecha_apertura).toLocaleString() || ""
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fecha_apertura">Fecha de Cierre</Label>
                <Input
                  type="text"
                  readOnly
                  value={
                    new Date(sesionData?.fecha_cierre).toLocaleString() || ""
                  }
                />
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
                <Label htmlFor="venta_efectivo">
                  Dinero Contado Final en Efectivo
                </Label>
                <Input
                 type="text"
                  readOnly
               value={`L. ${sesionData?.caja_efectivo_final || 0}`}
                  id="venta_efectivo"
                  name="venta_efectivo"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="venta_efectivo">Ventas en Efectivo</Label>
                <Input
                  type="text"
                  readOnly
                  value={`L. ${sesionData?.venta_efectivo || 0}`}
                  id="venta_efectivo"
                  name="venta_efectivo"
                />
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="venta_tarjeta">Ventas con Tarjeta</Label>
                <Input
                   type="text"
                  readOnly
                  value={`L. ${sesionData?.venta_tarjeta || 0}`}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="venta_transferencia">
                  Ventas por Transferencia
                </Label>
                <Input
                 type="text"
                  readOnly
                  value={`L. ${sesionData?.venta_transferencia || 0}`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="venta_pago_link">Ventas Pago Link</Label>
                <Input
                  type="text"
                  readOnly
                    value={`L. ${sesionData?.venta_pago_link || 0}`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="venta_cheque">Ventas con Cheque</Label>
                <Input
                   type="text"
                  readOnly
                  value={`L. ${sesionData?.venta_cheque || 0}`}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="venta_credito">Créditos Otorgados</Label>
                <Input
                 type="text"
                  readOnly
                  value={`L. ${sesionData?.venta_credito || 0}`}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="total_ventas">Total Ventas Contado</Label>
                <Input
                   type="text"
                  readOnly
                  value={`L. ${sesionData?.total_contado || 0}`}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="saldo_inicial">Balance de Sesion</Label>
                <Input
                  type="text"
                  readOnly
                  value={`L. ${sesionData?.diferencia || 0}`}
                  id="diferencia"
                  name="diferencia"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
