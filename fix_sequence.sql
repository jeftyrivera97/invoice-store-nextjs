-- Arreglar secuencias de auto-incremento para TODAS las tablas
-- Esto sincroniza las secuencias con el valor máximo actual en cada tabla

-- Areas empleados
SELECT setval('areas_empleados_id_seq', COALESCE((SELECT MAX(id) + 1 FROM areas_empleados), 1), false);

-- Cajas
SELECT setval('cajas_id_seq', COALESCE((SELECT MAX(id) + 1 FROM cajas), 1), false);

-- Cajas movimientos
SELECT setval('cajas_movimientos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM cajas_movimientos), 1), false);

-- Cajas sesiones
SELECT setval('cajas_sesiones_id_seq', COALESCE((SELECT MAX(id) + 1 FROM cajas_sesiones), 1), false);

-- Categorias compras
SELECT setval('categorias_compras_id_seq', COALESCE((SELECT MAX(id) + 1 FROM categorias_compras), 1), false);

-- Categorias comprobantes
SELECT setval('categorias_comprobantes_id_seq', COALESCE((SELECT MAX(id) + 1 FROM categorias_comprobantes), 1), false);

-- Categorias empleados
SELECT setval('categorias_empleados_id_seq', COALESCE((SELECT MAX(id) + 1 FROM categorias_empleados), 1), false);

-- Categorias gastos
SELECT setval('categorias_gastos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM categorias_gastos), 1), false);

-- Categorias ingresos
SELECT setval('categorias_ingresos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM categorias_ingresos), 1), false);

-- Categorias movimientos
SELECT setval('categorias_movimientos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM categorias_movimientos), 1), false);

-- Categorias planillas
SELECT setval('categorias_planillas_id_seq', COALESCE((SELECT MAX(id) + 1 FROM categorias_planillas), 1), false);

-- Categorias productos
SELECT setval('categorias_productos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM categorias_productos), 1), false);

-- Clientes
SELECT setval('clientes_id_seq', COALESCE((SELECT MAX(id) + 1 FROM clientes), 1), false);

-- Compra detalles
SELECT setval('compra_detalles_id_seq', COALESCE((SELECT MAX(id) + 1 FROM compra_detalles), 1), false);

-- Compras
SELECT setval('compras_id_seq', COALESCE((SELECT MAX(id) + 1 FROM compras), 1), false);

-- Comprobantes
SELECT setval('comprobantes_id_seq', COALESCE((SELECT MAX(id) + 1 FROM comprobantes), 1), false);

-- Comprobantes detalles
SELECT setval('comprobantes_detalles_id_seq', COALESCE((SELECT MAX(id) + 1 FROM comprobantes_detalles), 1), false);

-- Comprobantes folios
SELECT setval('comprobantes_folios_id_seq', COALESCE((SELECT MAX(id) + 1 FROM comprobantes_folios), 1), false);

-- Comprobantes pagos
SELECT setval('comprobantes_pagos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM comprobantes_pagos), 1), false);

-- Currency exchange
SELECT setval('currency_exchange_id_seq', COALESCE((SELECT MAX(id) + 1 FROM currency_exchange), 1), false);

-- Empleados
SELECT setval('empleados_id_seq', COALESCE((SELECT MAX(id) + 1 FROM empleados), 1), false);

-- Empresas
SELECT setval('empresas_id_seq', COALESCE((SELECT MAX(id) + 1 FROM empresas), 1), false);

-- Estados
SELECT setval('estados_id_seq', COALESCE((SELECT MAX(id) + 1 FROM estados), 1), false);

-- Estados comprobantes
SELECT setval('estados_comprobantes_id_seq', COALESCE((SELECT MAX(id) + 1 FROM estados_comprobantes), 1), false);

-- Estados operaciones
SELECT setval('estados_operaciones_id_seq', COALESCE((SELECT MAX(id) + 1 FROM estados_operaciones), 1), false);

-- Estados productos online
SELECT setval('estados_productos_online_id_seq', COALESCE((SELECT MAX(id) + 1 FROM estados_productos_online), 1), false);

-- Estados sesiones
SELECT setval('estados_sesiones_id_seq', COALESCE((SELECT MAX(id) + 1 FROM estados_sesiones), 1), false);

-- Failed jobs
SELECT setval('failed_jobs_id_seq', COALESCE((SELECT MAX(id) + 1 FROM failed_jobs), 1), false);

-- Folios
SELECT setval('folios_id_seq', COALESCE((SELECT MAX(id) + 1 FROM folios), 1), false);

-- Gasto planillas
SELECT setval('gasto_planillas_id_seq', COALESCE((SELECT MAX(id) + 1 FROM gasto_planillas), 1), false);

-- Gastos
SELECT setval('gastos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM gastos), 1), false);

-- Impuestos
SELECT setval('impuestos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM impuestos), 1), false);

-- Ingresos
SELECT setval('ingresos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM ingresos), 1), false);

-- Job batches (no tiene secuencia - usa string ID)

-- Jobs
SELECT setval('jobs_id_seq', COALESCE((SELECT MAX(id) + 1 FROM jobs), 1), false);

-- Medios movimientos
SELECT setval('medios_movimientos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM medios_movimientos), 1), false);

-- Metodos pagos
SELECT setval('metodos_pagos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM metodos_pagos), 1), false);

-- Migrations (usa autoincrement de tipo Int)
SELECT setval('migrations_id_seq', COALESCE((SELECT MAX(id) + 1 FROM migrations), 1), false);

-- Personal access tokens
SELECT setval('personal_access_tokens_id_seq', COALESCE((SELECT MAX(id) + 1 FROM personal_access_tokens), 1), false);

-- Planillas
SELECT setval('planillas_id_seq', COALESCE((SELECT MAX(id) + 1 FROM planillas), 1), false);

-- Producto multimedias
SELECT setval('producto_multimedias_id_seq', COALESCE((SELECT MAX(id) + 1 FROM producto_multimedias), 1), false);

-- Productos
SELECT setval('productos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM productos), 1), false);

-- Proveedores
SELECT setval('proveedores_id_seq', COALESCE((SELECT MAX(id) + 1 FROM proveedores), 1), false);

-- Tipos compras
SELECT setval('tipos_compras_id_seq', COALESCE((SELECT MAX(id) + 1 FROM tipos_compras), 1), false);

-- Tipos comprobantes
SELECT setval('tipos_comprobantes_id_seq', COALESCE((SELECT MAX(id) + 1 FROM tipos_comprobantes), 1), false);

-- Tipos gastos
SELECT setval('tipos_gastos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM tipos_gastos), 1), false);

-- Tipos ingresos
SELECT setval('tipos_ingresos_id_seq', COALESCE((SELECT MAX(id) + 1 FROM tipos_ingresos), 1), false);

-- Tipos operaciones
SELECT setval('tipos_operaciones_id_seq', COALESCE((SELECT MAX(id) + 1 FROM tipos_operaciones), 1), false);

-- Tipos planillas
SELECT setval('tipos_planillas_id_seq', COALESCE((SELECT MAX(id) + 1 FROM tipos_planillas), 1), false);

-- Users
SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) + 1 FROM users), 1), false);

-- Ventas
SELECT setval('ventas_id_seq', COALESCE((SELECT MAX(id) + 1 FROM ventas), 1), false);

-- Mensaje de confirmación
SELECT 'Todas las secuencias han sido sincronizadas exitosamente' as resultado;