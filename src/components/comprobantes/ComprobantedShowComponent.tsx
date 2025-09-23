import { getComprobanteById } from "@/helpers";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ArrowLeftIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceDetail } from "@/types";

export const ComprobanteIdShowComponent = async ({
  params,
}: {
  params: { id: string };
}) => {
  const resolvedParams = await params;
  const { data, detalles } = await getComprobanteById(Number(resolvedParams.id));
  console.log(data);

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Ver Comprobante</CardTitle>
        <CardDescription>Verifique los detalles del comprobante</CardDescription>
        <CardAction>
          <Button variant="outline" size="icon">
            <Link href="/comprobantes">
              <ArrowLeftIcon />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-[250px_250px_1fr] gap-6">
          {/* Columna Izquierda */}
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="codigo_comprobante">Codigo Comprobante</Label>
              <Input type="text" readOnly value={data.codigo_comprobante || ""} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input type="text" readOnly value={data.fecha} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                type="text"
                readOnly
                value={data.clientes.razon_social || "N/A"}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gravado15">Gravado 15</Label>
              <Input
                type="text"
                readOnly
                value={`L. ${data.gravado15 || 0}`}
                id="gravado15"
                name="gravado15"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gravado18">Gravado 18</Label>
              <Input
                type="text"
                readOnly
                value={`L. ${data.gravado18 || 0}`}
                id="gravado18"
                name="gravado18"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="exento">Exento</Label>
              <Input
                type="text"
                readOnly
                value={`L. ${data.exento || 0}`}
                id="exento"
                name="exento"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="exonerado">Exonerado</Label>
              <Input
                type="text"
                readOnly
                value={`L. ${data.exonerado || 0}`}
                id="exonerado"
                name="exonerado"
              />
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="subtotal">Subtotal</Label>
              <Input
                type="text"
                readOnly
                value={`L. ${data.subtotal || 0}`}
                id="subtotal"
                name="subtotal"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="descuentos">Descuentos</Label>
              <Input
                type="text"
                readOnly
                value={`L. ${data.descuentos || 0}`}
                id="descuentos"
                name="descuentos"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="total">Total</Label>
              <Input
                type="text"
                readOnly
                value={`L. ${data.total || 0}`}
                id="total"
                name="total"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Input
                type="text"
                readOnly
                value={data.categorias_comprobantes.descripcion}
                id="categoria"
                name="categoria"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tipo_comprobante">Tipo Comprobante</Label>
              <Input
                type="text"
                readOnly
                value={data.tipos_comprobantes.descripcion}
                id="tipo_comprobante"
                name="tipo_comprobante"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="estado">Estado</Label>
              <Input
                type="text"
                readOnly
                value={data.estados_comprobantes.descripcion}
                id="estado"
                name="estado"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                type="text"
                readOnly
                value={data.users.name || 0}
                id="usuario"
                name="usuario"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Linea</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detalles.map((detalle: InvoiceDetail) => (
                    <TableRow key={detalle.id}>
                      <TableCell className="font-medium">
                        {detalle.linea}
                      </TableCell>
                      <TableCell>{detalle.productos.descripcion}</TableCell>
                      <TableCell>{detalle.cantidad}</TableCell>
                      <TableCell>L. {detalle.precio}</TableCell>
                      <TableCell className="text-right">
                        L. {detalle.total_linea}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">L. {data.total}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
