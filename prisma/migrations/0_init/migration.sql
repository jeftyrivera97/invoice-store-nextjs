-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."areas_empleados" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "areas_empleados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cache" (
    "key" VARCHAR(255) NOT NULL,
    "value" TEXT NOT NULL,
    "expiration" INTEGER NOT NULL,

    CONSTRAINT "cache_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "public"."cache_locks" (
    "key" VARCHAR(255) NOT NULL,
    "owner" VARCHAR(255) NOT NULL,
    "expiration" INTEGER NOT NULL,

    CONSTRAINT "cache_locks_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "public"."cajas" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "cajas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cajas_movimientos" (
    "id" BIGSERIAL NOT NULL,
    "fecha" TIMESTAMPTZ(0) NOT NULL,
    "id_sesion" BIGINT,
    "id_categoria" BIGINT,
    "id_medio" BIGINT,
    "monto" DOUBLE PRECISION NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "cajas_movimientos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cajas_sesiones" (
    "id" BIGSERIAL NOT NULL,
    "fecha" DATE NOT NULL,
    "fecha_apertura" TIMESTAMPTZ(0) NOT NULL,
    "fecha_cierre" TIMESTAMPTZ(0),
    "id_caja" BIGINT,
    "caja_efectivo_inicial" DOUBLE PRECISION NOT NULL,
    "caja_efectivo_final" DOUBLE PRECISION,
    "diferencia" DOUBLE PRECISION,
    "venta_efectivo" DOUBLE PRECISION NOT NULL,
    "venta_tarjeta" DOUBLE PRECISION NOT NULL,
    "venta_transferencia" DOUBLE PRECISION NOT NULL,
    "venta_pago_link" DOUBLE PRECISION NOT NULL,
    "venta_cheque" DOUBLE PRECISION NOT NULL,
    "venta_credito" DOUBLE PRECISION NOT NULL,
    "total_contado" DOUBLE PRECISION,
    "id_estado_sesion" BIGINT,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "id_usuario_auditor" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "cajas_sesiones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias_compras" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_tipo" BIGINT,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "categorias_compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias_comprobantes" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "categorias_comprobantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias_empleados" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "rango" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "categorias_empleados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias_gastos" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_tipo" BIGINT,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "categorias_gastos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias_ingresos" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_tipo" BIGINT,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "categorias_ingresos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias_movimientos" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "categorias_movimientos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias_planillas" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_tipo" BIGINT,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "categorias_planillas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias_productos" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "nombre_imagen" VARCHAR(255),
    "ruta_imagen" VARCHAR(255),
    "id_estado" BIGINT,
    "id_estado_online" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "categorias_productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."clientes" (
    "id" BIGSERIAL NOT NULL,
    "codigo_cliente" VARCHAR(255) NOT NULL,
    "razon_social" VARCHAR(255),
    "nombre" VARCHAR(255),
    "apellido" VARCHAR(255),
    "direccion" VARCHAR(255),
    "telefono" VARCHAR(255),
    "correo" VARCHAR(255),
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."compra_detalles" (
    "id" BIGSERIAL NOT NULL,
    "id_compra" BIGINT,
    "linea" BIGINT NOT NULL,
    "id_producto" BIGINT,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,
    "total_linea" DOUBLE PRECISION NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "compra_detalles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."compras" (
    "id" BIGSERIAL NOT NULL,
    "codigo_compra" VARCHAR(255) NOT NULL,
    "fecha" DATE NOT NULL,
    "id_categoria" BIGINT,
    "id_proveedor" BIGINT,
    "id_tipo_operacion" BIGINT,
    "id_estado_operacion" BIGINT,
    "fecha_pago" DATE,
    "gravado15" DOUBLE PRECISION,
    "gravado18" DOUBLE PRECISION,
    "impuesto15" DOUBLE PRECISION,
    "impuesto18" DOUBLE PRECISION,
    "exento" DOUBLE PRECISION,
    "exonerado" DOUBLE PRECISION,
    "total" DOUBLE PRECISION NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comprobantes" (
    "id" BIGSERIAL NOT NULL,
    "codigo_comprobante" VARCHAR(255) NOT NULL,
    "fecha" DATE NOT NULL,
    "fecha_hora" TIMESTAMPTZ(0) NOT NULL,
    "fecha_vencimiento" DATE NOT NULL,
    "id_cliente" BIGINT,
    "gravado15" DOUBLE PRECISION,
    "gravado18" DOUBLE PRECISION,
    "impuesto15" DOUBLE PRECISION,
    "impuesto18" DOUBLE PRECISION,
    "exento" DOUBLE PRECISION,
    "exonerado" DOUBLE PRECISION,
    "descuentos" DOUBLE PRECISION,
    "subtotal" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "id_categoria" BIGINT,
    "id_tipo_comprobante" BIGINT,
    "id_estado_comprobante" BIGINT,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "comprobantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comprobantes_detalles" (
    "id" BIGSERIAL NOT NULL,
    "linea" DOUBLE PRECISION NOT NULL,
    "id_comprobante" BIGINT,
    "id_producto" BIGINT,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "total_linea" DOUBLE PRECISION NOT NULL,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "comprobantes_detalles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comprobantes_folios" (
    "id" BIGSERIAL NOT NULL,
    "id_folio" BIGINT,
    "id_comprobante" BIGINT,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "comprobantes_folios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comprobantes_pagos" (
    "id" BIGSERIAL NOT NULL,
    "id_comprobante" BIGINT,
    "id_metodo_pago" BIGINT,
    "fecha_hora" TIMESTAMPTZ(0) NOT NULL,
    "referencia" VARCHAR(255),
    "comentario" VARCHAR(255),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "comprobantes_pagos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."currency_exchange" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "compra" DOUBLE PRECISION NOT NULL,
    "venta" DOUBLE PRECISION NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "currency_exchange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."empleados" (
    "id" BIGSERIAL NOT NULL,
    "codigo_empleado" VARCHAR(255) NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "apellido" VARCHAR(255) NOT NULL,
    "id_categoria" BIGINT,
    "id_area" BIGINT,
    "telefono" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "empleados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."empresas" (
    "id" BIGSERIAL NOT NULL,
    "codigo_empresa" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "razon_social" VARCHAR(255) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,
    "ciudad" VARCHAR(255) NOT NULL,
    "departamento" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(255) NOT NULL,
    "celular" VARCHAR(255) NOT NULL,
    "correo" VARCHAR(255) NOT NULL,
    "cai" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estados" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estados_comprobantes" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "estados_comprobantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estados_operaciones" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "estados_operaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estados_productos_online" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "estados_productos_online_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estados_sesiones" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "estados_sesiones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."failed_jobs" (
    "id" BIGSERIAL NOT NULL,
    "uuid" VARCHAR(255) NOT NULL,
    "connection" TEXT NOT NULL,
    "queue" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "exception" TEXT NOT NULL,
    "failed_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "failed_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."folios" (
    "id" BIGSERIAL NOT NULL,
    "codigo_folio" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255),
    "fecha_limite" DATE NOT NULL,
    "inicio" DOUBLE PRECISION NOT NULL,
    "final" DOUBLE PRECISION NOT NULL,
    "actual" DOUBLE PRECISION NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "folios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."gasto_planillas" (
    "id" BIGSERIAL NOT NULL,
    "id_gasto" BIGINT,
    "id_planilla" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "gasto_planillas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."gastos" (
    "id" BIGSERIAL NOT NULL,
    "codigo_gasto" VARCHAR(255) NOT NULL,
    "fecha" DATE NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_categoria" BIGINT,
    "total" DOUBLE PRECISION NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "gastos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."impuestos" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "id_estado" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "impuestos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ingresos" (
    "id" BIGSERIAL NOT NULL,
    "codigo_ingreso" VARCHAR(255) NOT NULL,
    "fecha" DATE NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_categoria" BIGINT,
    "total" DOUBLE PRECISION NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "ingresos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."job_batches" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "total_jobs" INTEGER NOT NULL,
    "pending_jobs" INTEGER NOT NULL,
    "failed_jobs" INTEGER NOT NULL,
    "failed_job_ids" TEXT NOT NULL,
    "options" TEXT,
    "cancelled_at" INTEGER,
    "created_at" INTEGER NOT NULL,
    "finished_at" INTEGER,

    CONSTRAINT "job_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."jobs" (
    "id" BIGSERIAL NOT NULL,
    "queue" VARCHAR(255) NOT NULL,
    "payload" TEXT NOT NULL,
    "attempts" SMALLINT NOT NULL,
    "reserved_at" INTEGER,
    "available_at" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."medios_movimientos" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "medios_movimientos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."metodos_pagos" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_tipo_operacion" BIGINT,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "metodos_pagos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."migrations" (
    "id" SERIAL NOT NULL,
    "migration" VARCHAR(255) NOT NULL,
    "batch" INTEGER NOT NULL,

    CONSTRAINT "migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."password_reset_tokens" (
    "email" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0),

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "public"."personal_access_tokens" (
    "id" BIGSERIAL NOT NULL,
    "tokenable_type" VARCHAR(255) NOT NULL,
    "tokenable_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "token" VARCHAR(64) NOT NULL,
    "abilities" TEXT,
    "last_used_at" TIMESTAMP(0),
    "expires_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "personal_access_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."planillas" (
    "id" BIGSERIAL NOT NULL,
    "codigo_planilla" VARCHAR(255) NOT NULL,
    "fecha" DATE NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_categoria" BIGINT,
    "id_empleado" BIGINT,
    "total" DOUBLE PRECISION NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "planillas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."producto_multimedias" (
    "id" BIGSERIAL NOT NULL,
    "id_producto" BIGINT,
    "nombre_imagen" VARCHAR(255) NOT NULL,
    "ruta_imagen" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "producto_multimedias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."productos" (
    "id" BIGSERIAL NOT NULL,
    "codigo_producto" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_categoria" BIGINT,
    "marca" VARCHAR(255) NOT NULL,
    "size" VARCHAR(255),
    "color" VARCHAR(255),
    "id_proveedor" BIGINT,
    "peso" DOUBLE PRECISION NOT NULL,
    "stock" DOUBLE PRECISION NOT NULL,
    "id_impuesto" BIGINT,
    "gravado15" DOUBLE PRECISION,
    "gravado18" DOUBLE PRECISION,
    "impuesto15" DOUBLE PRECISION,
    "impuesto18" DOUBLE PRECISION,
    "exento" DOUBLE PRECISION,
    "exonerado" DOUBLE PRECISION,
    "costo" DOUBLE PRECISION,
    "precio_venta" DOUBLE PRECISION NOT NULL,
    "precio_web" DOUBLE PRECISION,
    "valor" DOUBLE PRECISION NOT NULL,
    "id_estado_online" BIGINT,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."proveedores" (
    "id" BIGSERIAL NOT NULL,
    "codigo_proveedor" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "categoria" VARCHAR(255) NOT NULL,
    "contacto" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(255),
    "correo" VARCHAR(255),
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "proveedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role_user" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "role_id" BIGINT NOT NULL,
    "id_estado" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "role_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sessions" (
    "id" VARCHAR(255) NOT NULL,
    "user_id" BIGINT,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "payload" TEXT NOT NULL,
    "last_activity" INTEGER NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tipos_compras" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "tipos_compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tipos_comprobantes" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "tipos_comprobantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tipos_gastos" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "tipos_gastos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tipos_ingresos" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "tipos_ingresos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tipos_operaciones" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "tipos_operaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tipos_planillas" (
    "id" BIGSERIAL NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "id_estado" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "tipos_planillas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "email_verified_at" TIMESTAMP(0),
    "password" VARCHAR(255) NOT NULL,
    "remember_token" VARCHAR(100),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ventas" (
    "id" BIGSERIAL NOT NULL,
    "codigo_venta" VARCHAR(255) NOT NULL,
    "fecha" TIMESTAMPTZ(0) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "id_movimiento" BIGINT,
    "id_comprobante" BIGINT,
    "id_estado" BIGINT,
    "id_usuario" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_codigo_empresa_unique" ON "public"."empresas"("codigo_empresa");

-- CreateIndex
CREATE UNIQUE INDEX "failed_jobs_uuid_unique" ON "public"."failed_jobs"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ingresos_codigo_ingreso_unique" ON "public"."ingresos"("codigo_ingreso");

-- CreateIndex
CREATE INDEX "jobs_queue_index" ON "public"."jobs"("queue");

-- CreateIndex
CREATE UNIQUE INDEX "personal_access_tokens_token_unique" ON "public"."personal_access_tokens"("token");

-- CreateIndex
CREATE INDEX "personal_access_tokens_tokenable_type_tokenable_id_index" ON "public"."personal_access_tokens"("tokenable_type", "tokenable_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_user_user_id_role_id_unique" ON "public"."role_user"("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_slug_unique" ON "public"."roles"("slug");

-- CreateIndex
CREATE INDEX "sessions_last_activity_index" ON "public"."sessions"("last_activity");

-- CreateIndex
CREATE INDEX "sessions_user_id_index" ON "public"."sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."areas_empleados" ADD CONSTRAINT "areas_empleados_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."areas_empleados" ADD CONSTRAINT "areas_empleados_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas" ADD CONSTRAINT "cajas_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas" ADD CONSTRAINT "cajas_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas_movimientos" ADD CONSTRAINT "cajas_movimientos_id_categoria_foreign" FOREIGN KEY ("id_categoria") REFERENCES "public"."categorias_movimientos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas_movimientos" ADD CONSTRAINT "cajas_movimientos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas_movimientos" ADD CONSTRAINT "cajas_movimientos_id_medio_foreign" FOREIGN KEY ("id_medio") REFERENCES "public"."medios_movimientos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas_movimientos" ADD CONSTRAINT "cajas_movimientos_id_sesion_foreign" FOREIGN KEY ("id_sesion") REFERENCES "public"."cajas_sesiones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas_movimientos" ADD CONSTRAINT "cajas_movimientos_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas_sesiones" ADD CONSTRAINT "cajas_sesiones_id_caja_foreign" FOREIGN KEY ("id_caja") REFERENCES "public"."cajas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas_sesiones" ADD CONSTRAINT "cajas_sesiones_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas_sesiones" ADD CONSTRAINT "cajas_sesiones_id_estado_sesion_foreign" FOREIGN KEY ("id_estado_sesion") REFERENCES "public"."estados_sesiones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas_sesiones" ADD CONSTRAINT "cajas_sesiones_id_usuario_auditor_foreign" FOREIGN KEY ("id_usuario_auditor") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cajas_sesiones" ADD CONSTRAINT "cajas_sesiones_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_compras" ADD CONSTRAINT "categorias_compras_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_compras" ADD CONSTRAINT "categorias_compras_id_tipo_foreign" FOREIGN KEY ("id_tipo") REFERENCES "public"."tipos_compras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_compras" ADD CONSTRAINT "categorias_compras_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_comprobantes" ADD CONSTRAINT "categorias_comprobantes_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_comprobantes" ADD CONSTRAINT "categorias_comprobantes_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_empleados" ADD CONSTRAINT "categorias_empleados_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_empleados" ADD CONSTRAINT "categorias_empleados_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_gastos" ADD CONSTRAINT "categorias_gastos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_gastos" ADD CONSTRAINT "categorias_gastos_id_tipo_foreign" FOREIGN KEY ("id_tipo") REFERENCES "public"."tipos_gastos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_gastos" ADD CONSTRAINT "categorias_gastos_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_ingresos" ADD CONSTRAINT "categorias_ingresos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_ingresos" ADD CONSTRAINT "categorias_ingresos_id_tipo_foreign" FOREIGN KEY ("id_tipo") REFERENCES "public"."tipos_ingresos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_ingresos" ADD CONSTRAINT "categorias_ingresos_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_movimientos" ADD CONSTRAINT "categorias_movimientos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_movimientos" ADD CONSTRAINT "categorias_movimientos_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_planillas" ADD CONSTRAINT "categorias_planillas_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_planillas" ADD CONSTRAINT "categorias_planillas_id_tipo_foreign" FOREIGN KEY ("id_tipo") REFERENCES "public"."tipos_planillas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_planillas" ADD CONSTRAINT "categorias_planillas_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_productos" ADD CONSTRAINT "categorias_productos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_productos" ADD CONSTRAINT "categorias_productos_id_estado_online_foreign" FOREIGN KEY ("id_estado_online") REFERENCES "public"."estados_productos_online"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias_productos" ADD CONSTRAINT "categorias_productos_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."clientes" ADD CONSTRAINT "clientes_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."clientes" ADD CONSTRAINT "clientes_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."compra_detalles" ADD CONSTRAINT "compra_detalles_id_compra_foreign" FOREIGN KEY ("id_compra") REFERENCES "public"."compras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."compra_detalles" ADD CONSTRAINT "compra_detalles_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."compra_detalles" ADD CONSTRAINT "compra_detalles_id_producto_foreign" FOREIGN KEY ("id_producto") REFERENCES "public"."productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."compra_detalles" ADD CONSTRAINT "compra_detalles_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."compras" ADD CONSTRAINT "compras_id_categoria_foreign" FOREIGN KEY ("id_categoria") REFERENCES "public"."categorias_compras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."compras" ADD CONSTRAINT "compras_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."compras" ADD CONSTRAINT "compras_id_estado_operacion_foreign" FOREIGN KEY ("id_estado_operacion") REFERENCES "public"."estados_operaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."compras" ADD CONSTRAINT "compras_id_proveedor_foreign" FOREIGN KEY ("id_proveedor") REFERENCES "public"."proveedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."compras" ADD CONSTRAINT "compras_id_tipo_operacion_foreign" FOREIGN KEY ("id_tipo_operacion") REFERENCES "public"."tipos_operaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."compras" ADD CONSTRAINT "compras_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes" ADD CONSTRAINT "comprobantes_id_categoria_foreign" FOREIGN KEY ("id_categoria") REFERENCES "public"."categorias_comprobantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes" ADD CONSTRAINT "comprobantes_id_cliente_foreign" FOREIGN KEY ("id_cliente") REFERENCES "public"."clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes" ADD CONSTRAINT "comprobantes_id_estado_comprobante_foreign" FOREIGN KEY ("id_estado_comprobante") REFERENCES "public"."estados_comprobantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes" ADD CONSTRAINT "comprobantes_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes" ADD CONSTRAINT "comprobantes_id_tipo_comprobante_foreign" FOREIGN KEY ("id_tipo_comprobante") REFERENCES "public"."tipos_comprobantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes" ADD CONSTRAINT "comprobantes_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes_detalles" ADD CONSTRAINT "comprobantes_detalles_id_comprobante_foreign" FOREIGN KEY ("id_comprobante") REFERENCES "public"."comprobantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes_detalles" ADD CONSTRAINT "comprobantes_detalles_id_producto_foreign" FOREIGN KEY ("id_producto") REFERENCES "public"."productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes_detalles" ADD CONSTRAINT "comprobantes_detalles_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes_folios" ADD CONSTRAINT "comprobantes_folios_id_comprobante_foreign" FOREIGN KEY ("id_comprobante") REFERENCES "public"."comprobantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes_folios" ADD CONSTRAINT "comprobantes_folios_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes_folios" ADD CONSTRAINT "comprobantes_folios_id_folio_foreign" FOREIGN KEY ("id_folio") REFERENCES "public"."folios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes_folios" ADD CONSTRAINT "comprobantes_folios_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes_pagos" ADD CONSTRAINT "comprobantes_pagos_id_comprobante_foreign" FOREIGN KEY ("id_comprobante") REFERENCES "public"."comprobantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comprobantes_pagos" ADD CONSTRAINT "comprobantes_pagos_id_metodo_pago_foreign" FOREIGN KEY ("id_metodo_pago") REFERENCES "public"."metodos_pagos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."currency_exchange" ADD CONSTRAINT "currency_exchange_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."currency_exchange" ADD CONSTRAINT "currency_exchange_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."empleados" ADD CONSTRAINT "empleados_id_area_foreign" FOREIGN KEY ("id_area") REFERENCES "public"."areas_empleados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."empleados" ADD CONSTRAINT "empleados_id_categoria_foreign" FOREIGN KEY ("id_categoria") REFERENCES "public"."categorias_empleados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."empleados" ADD CONSTRAINT "empleados_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."empleados" ADD CONSTRAINT "empleados_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."empresas" ADD CONSTRAINT "empresas_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."empresas" ADD CONSTRAINT "empresas_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."folios" ADD CONSTRAINT "folios_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."folios" ADD CONSTRAINT "folios_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."gasto_planillas" ADD CONSTRAINT "gasto_planillas_id_gasto_foreign" FOREIGN KEY ("id_gasto") REFERENCES "public"."gastos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."gasto_planillas" ADD CONSTRAINT "gasto_planillas_id_planilla_foreign" FOREIGN KEY ("id_planilla") REFERENCES "public"."planillas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."gastos" ADD CONSTRAINT "gastos_id_categoria_foreign" FOREIGN KEY ("id_categoria") REFERENCES "public"."categorias_gastos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."gastos" ADD CONSTRAINT "gastos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."gastos" ADD CONSTRAINT "gastos_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."impuestos" ADD CONSTRAINT "impuestos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ingresos" ADD CONSTRAINT "ingresos_id_categoria_foreign" FOREIGN KEY ("id_categoria") REFERENCES "public"."categorias_ingresos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ingresos" ADD CONSTRAINT "ingresos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ingresos" ADD CONSTRAINT "ingresos_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."medios_movimientos" ADD CONSTRAINT "medios_movimientos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."medios_movimientos" ADD CONSTRAINT "medios_movimientos_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."metodos_pagos" ADD CONSTRAINT "metodos_pagos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."metodos_pagos" ADD CONSTRAINT "metodos_pagos_id_tipo_operacion_foreign" FOREIGN KEY ("id_tipo_operacion") REFERENCES "public"."tipos_operaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."metodos_pagos" ADD CONSTRAINT "metodos_pagos_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."planillas" ADD CONSTRAINT "planillas_id_categoria_foreign" FOREIGN KEY ("id_categoria") REFERENCES "public"."categorias_planillas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."planillas" ADD CONSTRAINT "planillas_id_empleado_foreign" FOREIGN KEY ("id_empleado") REFERENCES "public"."empleados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."planillas" ADD CONSTRAINT "planillas_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."planillas" ADD CONSTRAINT "planillas_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."producto_multimedias" ADD CONSTRAINT "producto_multimedias_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."producto_multimedias" ADD CONSTRAINT "producto_multimedias_id_producto_foreign" FOREIGN KEY ("id_producto") REFERENCES "public"."productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."producto_multimedias" ADD CONSTRAINT "producto_multimedias_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."productos" ADD CONSTRAINT "productos_id_categoria_foreign" FOREIGN KEY ("id_categoria") REFERENCES "public"."categorias_productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."productos" ADD CONSTRAINT "productos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."productos" ADD CONSTRAINT "productos_id_estado_online_foreign" FOREIGN KEY ("id_estado_online") REFERENCES "public"."estados_productos_online"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."productos" ADD CONSTRAINT "productos_id_impuesto_foreign" FOREIGN KEY ("id_impuesto") REFERENCES "public"."impuestos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."productos" ADD CONSTRAINT "productos_id_proveedor_foreign" FOREIGN KEY ("id_proveedor") REFERENCES "public"."proveedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."productos" ADD CONSTRAINT "productos_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."proveedores" ADD CONSTRAINT "proveedores_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."proveedores" ADD CONSTRAINT "proveedores_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."role_user" ADD CONSTRAINT "role_user_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."role_user" ADD CONSTRAINT "role_user_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."role_user" ADD CONSTRAINT "role_user_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."roles" ADD CONSTRAINT "roles_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tipos_compras" ADD CONSTRAINT "tipos_compras_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tipos_comprobantes" ADD CONSTRAINT "tipos_comprobantes_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tipos_gastos" ADD CONSTRAINT "tipos_gastos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tipos_ingresos" ADD CONSTRAINT "tipos_ingresos_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tipos_operaciones" ADD CONSTRAINT "tipos_operaciones_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tipos_planillas" ADD CONSTRAINT "tipos_planillas_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ventas" ADD CONSTRAINT "ventas_id_comprobante_foreign" FOREIGN KEY ("id_comprobante") REFERENCES "public"."comprobantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ventas" ADD CONSTRAINT "ventas_id_estado_foreign" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ventas" ADD CONSTRAINT "ventas_id_movimiento_foreign" FOREIGN KEY ("id_movimiento") REFERENCES "public"."cajas_movimientos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ventas" ADD CONSTRAINT "ventas_id_usuario_foreign" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

