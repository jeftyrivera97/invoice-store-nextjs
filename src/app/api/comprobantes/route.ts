/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
    console.log("Datos recibidos para nueva comprobante:", body);

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
      id_categoria_comprobante,
    } = body;

    // Validaciones básicas actualizadas
    if (
      !id_cliente ||
      !id_usuario ||
      !total ||
      !productos ||
      productos.length === 0 ||
      !id_metodo_pago || // ← Agregar validación
      !id_categoria_comprobante
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

      // 1. Crear el comprobante
      const nuevaComprobante = await tx.comprobantes.create({
        data: {
          codigo_comprobante:
            id_categoria_comprobante != 1
              ? await generarNumeroComprobante(tx)
              : `TICKET-${Date.now()}`, // ← Usar codigo_comprobante
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
          id_categoria: id_categoria_comprobante,
          id_tipo_comprobante: BigInt(1),
          id_estado_comprobante: BigInt(3),
          id_estado: BigInt(1),
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      // 2. Crear el detalle de la comprobante
      const detallesComprobante: any[] = [];
      for (const producto of productos) {
        const detalle = await tx.comprobantes_detalles.create({
          data: {
            linea: detallesComprobante.length + 1,
            id_comprobante: nuevaComprobante.id,
            id_producto: BigInt(producto.id_producto),
            cantidad: parseInt(producto.cantidad),
            precio: parseFloat(producto.precio_unitario),
            total_linea: parseFloat(producto.subtotal),
            id_usuario: BigInt(id_usuario),
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
        detallesComprobante.push(detalle);

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

      const comprobante_pagos = await tx.comprobantes_pagos.create({
        data: {
          id_comprobante: nuevaComprobante.id,
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

      const idTF = Number(nuevaComprobante.id_tipo_comprobante);
      const tipos_comprobantes = await tx.tipos_comprobantes.findUnique({
        where: { id: BigInt(idTF) },
      });

      const tipoComprobante = tipos_comprobantes?.descripcion;

      // Si no es un ticket, se registra un folio
      if (id_categoria_comprobante != 1) {
        const folioComprobante = await tx.comprobantes_folios.create({
          data: {
            id_comprobante: nuevaComprobante.id,
            id_folio: folios.id,
            id_estado: BigInt(1),
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
      }

      // Si es de contado, se registra un movimiento de caja y venta

      const caja_movimiento = await tx.cajas_movimientos.create({
        data: {
          fecha: new Date(),
          id_sesion: sesion.id,
          id_categoria: 1, // Ingreso
          id_medio: id_metodo_pago,
          monto: total,
          descripcion: id_categoria_comprobante == 1 ? "Pago de ticket" : "Pago de Factura",
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
          id_comprobante: nuevaComprobante.id,
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

      return {
        comprobante: nuevaComprobante,
        detalles: detallesComprobante,
        pagos: comprobante_pagos,
        sesion: caja_sesion,
        movimiento: caja_movimiento,
        venta: venta,
        ingreso: ingreso,
        cliente: cliente,
        empresa: empresa,
        folio: folio,
        tipoComprobante: tipoComprobante,
        id_categoria_comprobante: id_categoria_comprobante,
      };
    });

    console.log("Comprobante creada exitosamente:", result.comprobante.id);

    // Convertir BigInt a string para la respuesta
    const comprobanteResponse = convertBigIntToString(result);

    return NextResponse.json(
      {
        success: true,
        message: "Comprobante creada exitosamente",
        data: comprobanteResponse,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error al crear comprobante:", error.message, error.stack);

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
async function generarNumeroComprobante(tx: any): Promise<string> {
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
    console.log("Iniciando consulta de comprobantes...");
    const data = await prisma.comprobantes.findMany({
      include: {
        clientes: true,
        categorias_comprobantes: true,
        tipos_comprobantes: true,
        estados_comprobantes: true,
        estados: true,
        users: true,
      },
    });

    // Convierte todos los BigInt a string
    const comprobantes = convertBigIntToString(data);

    console.log(comprobantes);

    return NextResponse.json(
      { data: comprobantes },
      { status: 200 } // Cambia el estado a 200 para solicitudes GET exitosas
    );
  } catch (error: any) {
    console.error(
      "Error al obtener las comprobantes:",
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: error.message || "Error al obtener las comprobantes" },
      { status: 500 }
    );
  }
}
