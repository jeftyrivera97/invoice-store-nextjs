/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  ventas,
  metodos_pagos,
  tipos_facturas,
} from "../../../generated/prisma/index";

// Función para convertir BigInt a string
function convertBigIntToString(obj: any): any {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Datos recibidos para nueva factura:", body);

    // Validar datos requeridos
    const {
      id_cliente,
      id_usuario, // ← Agregar esta validación
      gravado15,
      gravado18,
      impuesto15,
      impuesto18,
      exento,
      exonerado,
      descuentos,
      subtotal,
      total,
      id_metodo_pago,
      productos,
      referencia,
    } = body;

    // Validaciones básicas actualizadas
    if (
      !id_cliente ||
      !id_usuario ||
      !total ||
      !productos ||
      productos.length === 0 ||
      !id_metodo_pago // ← Agregar validación
    ) {
      return NextResponse.json(
        {
          error:
            "Faltan campos requeridos: id_cliente, id_usuario, total, productos, id_metodo_pago",
        },
        { status: 400 }
      );
    }

    const sesion = await prisma.cajas_sesiones.findFirst({
      where: {
        id_usuario: BigInt(id_usuario),
        id_estado_sesion: BigInt(1), // Asegurarse de que la sesión esté abierta
      },
    });

    if (!sesion) {
      throw new Error("No hay una sesión abierta para el usuario");
    }

    const folios = await prisma.folios.findFirst({
      where: {
        id_estado: BigInt(1),
      },
    });

    if (!folios) {
      throw new Error("No hay un folio activo");
    }

    if (folios.actual == folios.final) {
      throw new Error(
        "El folio actual ha alcanzado su límite. Debe crear un nuevo folio"
      );
    }

    // Usar transacción para asegurar consistencia
    const result = await prisma.$transaction(async (tx) => {
      const metodos_pagos = await tx.metodos_pagos.findUnique({
        where: { id: BigInt(id_metodo_pago) },
      });

      const idTipoOperacion: number = Number(
        metodos_pagos?.id_tipo_operacion || "1"
      );

      // 1. Crear la factura
      const nuevaFactura = await tx.facturas.create({
        data: {
          codigo_factura:
            idTipoOperacion === 1
              ? await generarNumeroFactura(tx)
              : `CREDITO - ${Date.now()}`, // ← Usar codigo_factura
          fecha: new Date(),
          fecha_hora: new Date(),
          fecha_vencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          id_cliente: BigInt(id_cliente),
          id_usuario: BigInt(id_usuario), // ← Agregar id_usuario
          gravado15: parseFloat(gravado15) || 0,
          gravado18: parseFloat(gravado18) || 0,
          impuesto15: parseFloat(impuesto15) || 0,
          impuesto18: parseFloat(impuesto18) || 0,
          exento: parseFloat(exento) || 0,
          exonerado: parseFloat(exonerado) || 0,
          descuentos: parseFloat(descuentos) || 0,
          subtotal: parseFloat(subtotal) || 0,
          total: parseFloat(total) || 0,
          id_folio: idTipoOperacion === 1 ? BigInt(folios.id) : null,
          id_categoria: idTipoOperacion == 1 ? BigInt(1) : BigInt(3),
          id_tipo_factura: idTipoOperacion == 1 ? BigInt(1) : BigInt(2),
          id_estado_factura: idTipoOperacion == 1 ? BigInt(3) : BigInt(2),
          id_estado: BigInt(1),
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      // 2. Crear el detalle de la factura
      const detallesFactura: any[] = [];
      for (const producto of productos) {
        const detalle = await tx.facturas_detalles.create({
          data: {
            linea: detallesFactura.length + 1,
            id_factura: nuevaFactura.id,
            id_producto: BigInt(producto.id_producto),
            cantidad: parseInt(producto.cantidad),
            precio: parseFloat(producto.precio_unitario),
            total_linea: parseFloat(producto.subtotal),
            id_usuario: BigInt(id_usuario),
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
        detallesFactura.push(detalle);

        // 3. Actualizar stock del producto (opcional)
        await tx.productos.update({
          where: { id: BigInt(producto.id_producto) },
          data: {
            stock: {
              decrement: parseInt(producto.cantidad),
            },
            updated_at: new Date(),
          },
        });
      }

      const factura_pagos = await tx.facturas_pagos.create({
        data: {
          id_factura: nuevaFactura.id,
          id_metodo_pago: BigInt(id_metodo_pago),
          fecha_hora: new Date(),
          referencia:
            id_metodo_pago == 2
              ? "N/A"
              : id_metodo_pago == 1
              ? "N/A"
              : referencia,
          comentario:
            id_metodo_pago == 1
              ? "Credito"
              : id_metodo_pago == 2
              ? "Pagado con Efectivo"
              : id_metodo_pago == 3 || id_metodo_pago == 4
              ? "Pagado con Tarjeta"
              : "Pagado con Cheque",
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      let venta_efectivo = sesion.venta_efectivo || 0;
      let venta_tarjeta = sesion.venta_tarjeta || 0;
      let venta_transferencia = sesion.venta_transferencia || 0;
      let venta_pago_link = sesion.venta_pago_link || 0;
      let venta_cheque = sesion.venta_cheque || 0;
      let venta_credito = sesion.venta_credito || 0;
      const saldoCajaEfectivo = sesion.caja_efectivo_inicial || 0;

      if (id_metodo_pago === "1") {
        venta_credito = venta_credito + total;
      } else if (id_metodo_pago === "2") {
        venta_efectivo = venta_efectivo + total;
      } else if (id_metodo_pago === "3") {
        venta_tarjeta = venta_tarjeta + total;
      } else if (id_metodo_pago === "4") {
        venta_transferencia = venta_transferencia + total;
      } else if (id_metodo_pago === "5") {
        venta_pago_link = venta_pago_link + total;
      } else if (id_metodo_pago === "6") {
        venta_cheque = venta_cheque + total;
      }

      const totalVendido =
        venta_efectivo +
        venta_tarjeta +
        venta_transferencia +
        venta_pago_link +
        venta_cheque;

      // 4. Actualizar el saldo de la sesión
      const caja_sesion = await tx.cajas_sesiones.update({
        where: { id: sesion.id, id_estado_sesion: BigInt(1) },
        data: {
          caja_efectivo_final: venta_efectivo + saldoCajaEfectivo,
          venta_efectivo: venta_efectivo,
          venta_tarjeta: venta_tarjeta,
          venta_transferencia: venta_transferencia,
          venta_pago_link: venta_pago_link,
          venta_cheque: venta_cheque,
          venta_credito: venta_credito,
          total_contado: totalVendido,
          updated_at: new Date(),
        },
      });

      const cliente = await tx.clientes.findUnique({
        where: { id: BigInt(id_cliente) },
      });

      const empresa = await tx.empresas.findUnique({
        where: { id: 1 },
      });

      const folio = await tx.folios.findFirst({
        where: {
          id_estado: BigInt(1),
        },
      });

      const idTF = Number(nuevaFactura.id_tipo_factura);
      const tipos_facturas = await tx.tipos_facturas.findUnique({
        where: { id: BigInt(idTF) },
      });

      const tipoFactura = tipos_facturas?.descripcion;

      if (idTipoOperacion == 1) {
        // Si es de contado, se registra un movimiento de caja y venta
        const caja_movimiento = await tx.cajas_movimientos.create({
          data: {
            fecha: new Date(),
            id_sesion: sesion.id,
            id_categoria: 1, // Ingreso
            id_medio: id_metodo_pago,
            monto: total,
            descripcion: "Pago de factura",
            id_estado: 1,
            id_usuario: BigInt(id_usuario),
            created_at: new Date(),
            updated_at: new Date(),
          },
        });

        const venta = await tx.ventas.create({
          data: {
            fecha: new Date(),
            total: total,
            id_movimiento: caja_movimiento.id,
            id_estado: 1,
            id_usuario: BigInt(id_usuario),
            created_at: new Date(),
            updated_at: new Date(),
          },
        });

        const ingreso = await tx.ingresos.create({
          data: {
            descripcion: "Ingreso por venta de productos",
            fecha: new Date(),
            id_categoria: 1, // Ingreso por venta de productos
            total: total,
            id_estado: 1,
            id_usuario: BigInt(id_usuario),
            created_at: new Date(),
            updated_at: new Date(),
          },
        });

        await tx.folios.update({
          where: { id: BigInt(folios.id) },
          data: {
            actual: {
              increment: 1,
            },
            updated_at: new Date(),
          },
        });

        return {
          factura: nuevaFactura,
          detalles: detallesFactura,
          pagos: factura_pagos,
          sesion: caja_sesion,
          movimiento: caja_movimiento,
          venta: venta,
          ingreso: ingreso,
          cliente: cliente,
          empresa: empresa,
          folio: folio,
          tipoFactura: tipoFactura,
        };
      }

      return {
        factura: nuevaFactura,
        detalles: detallesFactura,
        pagos: factura_pagos,
        sesion: caja_sesion,
        cliente: cliente,
        empresa: empresa,
        folio: folio,
        tipoFactura: tipoFactura,
      };
    });

    console.log("Factura creada exitosamente:", result.factura.id);

    // Convertir BigInt a string para la respuesta
    const facturaResponse = convertBigIntToString(result);

    return NextResponse.json(
      {
        success: true,
        message: "Factura creada exitosamente",
        data: facturaResponse,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error al crear factura:", error.message, error.stack);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Error interno del servidor",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// Función auxiliar corregida
async function generarNumeroFactura(tx: any): Promise<string> {
  try {
    // Obtener la último folio para generar el siguiente número
    const folio = await tx.folios.findFirst({
      where: { id_estado: BigInt(1) },
      orderBy: { id: "desc" },
      select: { codigo_folio: true, inicio: true, final: true, actual: true },
    });

    if (!folio || !folio.codigo_folio) {
      return "N/A";
    }

    // Extraer el número de la último folio
    const ultimoNumero = folio.actual;
    const siguienteNumero = ultimoNumero + 1;
    return `${folio.codigo_folio}${siguienteNumero}`;
  } catch (error) {
    // Si hay error, generar uno basado en timestamp
    const timestamp = Date.now().toString().slice(-5);
    return `FAC-${timestamp}`;
  }
}

export async function GET() {
  try {
    console.log("Iniciando consulta de facturas...");
    const data = await prisma.facturas.findMany({
      include: {
        clientes: true,
        categorias_facturas: true,
        tipos_facturas: true,
        estados_facturas: true,
        estados: true,
        users: true,
      },
    });

    // Convierte todos los BigInt a string
    const facturas = convertBigIntToString(data);

    console.log(facturas);

    return NextResponse.json(
      { data: facturas },
      { status: 200 } // Cambia el estado a 200 para solicitudes GET exitosas
    );
  } catch (error: any) {
    console.error("Error al obtener las facturas:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Error al obtener las facturas" },
      { status: 500 }
    );
  }
}
