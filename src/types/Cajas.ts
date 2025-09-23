export interface CajaType {
  data: CajaData[];
}

export interface CajaSesionesType {
  data: CajaSesionesData[];
}

export interface CajaMovimientosType {
  data: CajaMovimientosData[];
}

export interface CajaData {
  id: string;
  descripcion: string;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  estados: CajaEstados;
}

export interface CajaSesionesData {
  id: string;
  id_caja: string;
  caja_efectivo_inicial: number;
  caja_efectivo_final: number;
  diferencia: number;
  fecha_apertura: string;
  fecha_cierre: string;
  venta_efectivo: number;
  venta_tarjeta: number;
  venta_transferencia: number;
  venta_pago_link: number;
  venta_cheque: number;
  venta_credito: number;
  total_contado: number;
  id_estado_sesion: string;
  id_estado: string;
  id_usuario: string;
  id_usuario_auditor: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  users_cajas_sesiones_id_usuarioTousers: CajaUsers;
    users_cajas_sesiones_id_usuario_auditorTousers: CajaUsers;
  cajas: CajaData;
  estados_sesiones: CajaEstados;
  estados: CajaEstados;
}

export interface CajaMovimientosData {
  id: string;
  fecha: Date;
  id_sesion: string;
  id_categoria: string;
  monto: number;
  descripcion: string;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  cajas_sesiones: CajaSesionesData;
  cajas_categorias_movimientos: CajasCategoriasMovimientos;
  estados: CajaEstados;
  users: CajaUsers;
}

export interface CajasCategoriasMovimientos {
  id: string;
  categoria: string;
  medio: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface CajaEstados {
  id: string;
  descripcion: string;
  deleted_at: null;
}

export interface CajaUsers {
  id: string;
  name: string;
  email: string;
  email_verified_at: null;
  password: string;
  remember_token: null;
  created_at: null;
  updated_at: null;
}

