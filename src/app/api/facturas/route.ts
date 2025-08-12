/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parse } from "path";

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
      id_categoria,
      id_tipo_factura,
      id_metodo_pago, // ← Agregar esta validación
      productos,
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
          error: "Faltan campos requeridos: id_cliente, id_usuario, total, productos, id_metodo_pago",
        },
        { status: 400 }
      );
    }

    // Usar transacción para asegurar consistencia
    const result = await prisma.$transaction(async (tx) => {
      // 1. Crear la factura
      const nuevaFactura = await tx.facturas.create({
        data: {
          codigo_factura: await generarNumeroFactura(tx), // ← Usar codigo_factura
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
          id_categoria: BigInt(id_categoria || 1),
          id_tipo_factura: BigInt(id_tipo_factura || 1),
          id_estado_factura: BigInt(3),
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

      return {
        factura: nuevaFactura,
        detalles: detallesFactura,
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
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// Función auxiliar corregida
async function generarNumeroFactura(tx: any): Promise<string> {
  try {
    // Obtener la última factura para generar el siguiente número
    const ultimaFactura = await tx.facturas.findFirst({
      orderBy: { id: "desc" },
      select: { codigo_factura: true }, // ← Cambiar a codigo_factura
    });

    if (!ultimaFactura || !ultimaFactura.codigo_factura) {
      return "FAC-00001";
    }

    // Extraer el número de la última factura
    const ultimoNumero = ultimaFactura.codigo_factura.split("-")[1];
    const siguienteNumero = (parseInt(ultimoNumero) + 1)
      .toString()
      .padStart(5, "0");

    return `FAC-${siguienteNumero}`;
  } catch (error) {
    // Si hay error, generar uno basado en timestamp
    const timestamp = Date.now().toString().slice(-5);
    return `FAC-${timestamp}`;
  }
}


