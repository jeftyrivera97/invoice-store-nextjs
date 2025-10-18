export interface InvoiceState {
  moduleName: string;
  moduleTitle: string;
  cliente: InvoiceCliente;
  tipo_operacion: InvoiceTipoOperacion;
  categoria_comprobante: InvoiceCategoryData;
  estado_comprobante: InvoiceEstados;
  metodo_pago: InvoiceMetodoPago;
  referencia: string;
  comentario: string;
  items: InvoiceItem[];
  gravado15: number;
  gravado18: number;
  exento: number;
  exonerado: number;
  impuesto15: number;
  impuesto18: number;
  porcentajeDescuento: number;
  descuento: number;
  subtotal: number;
  total: number;
  totalUSD: number;
  totalEUR: number;
  cambioDolar: number;
  cambioEuro: number;
  loading: boolean;
  status: string;
  errorMessage: string | undefined;
  counter: number;
}

export interface InvoiceMetodoPago {
  id: string;
  descripcion: string;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  precio_venta: number;
  codigo_producto: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  gravado15: number;
  gravado18: number;
  impuesto15: number;
  impuesto18: number;
  exento: number;
  exonerado: number;
  total_linea: number;
  total_lineaUSD: number;
  total_lineaEUR: number;
}

export interface InvoiceDetail {
  id: string;
  linea: string;
  id_comprobante: InvoiceData;
  productos: InvoiceItem;
  cantidad: number;
  precio: number;
  total_linea: number;
  id_usuario: InvoiceUsers;
  created_at: string;
  updated_at: string;
}


export interface InvoiceType {
  data: InvoiceData[];
}

export interface InvoiceData {
  id:                      string;
  codigo_comprobante:      string;
  fecha:                   string;
  fecha_hora:              string;
  fecha_vencimiento:       string;
  id_cliente:              string;
  gravado15:               number;
  gravado18:               number;
  impuesto15:              number;
  impuesto18:              number;
  exento:                  number;
  exonerado:               number;
  descuentos:              number;
  subtotal:                number;
  total:                   number;
  id_categoria:            string;
  id_tipo_operacion:       string;
  id_estado_comprobante:   string;
  id_estado:               string;
  id_usuario:              string;
  created_at:              string;
  updated_at:              string;
  deleted_at:              null;
  clientes:                InvoiceCliente;
  categorias_comprobantes: InvoiceCategoryData;
  tipos_operaciones:       InvoiceCategoryData;
  estados_comprobantes:    InvoiceEstados;
  estados:                 InvoiceEstados;
  users:                   InvoiceUsers;
  comprobantes_detalles:   any[];
  comprobantes_pagos:      any[];
  comprobantes_folios:     any[];
}

export interface InvoiceCategoryData {
  id:          string;
  descripcion: string;
  id_tipo?:    string;
  id_estado:   string;
  id_usuario?: string;
  created_at:  string;
  updated_at:  string;
  deleted_at:  null;
}

export interface InvoiceTipoOperacion {
  id:          string;
  descripcion: string;
  id_estado:   string;
  id_usuario?: string;
  created_at:  string;
  updated_at:  string;
  deleted_at:  null;
}

export interface InvoiceCliente {
  id:             string;
  codigo_cliente: string;
  razon_social:   string;
  nombre:         string;
  apellido:       string;
  direccion:      string;
  telefono:       string;
  correo:         string;
  id_estado:      string;
  id_usuario:     string;
  created_at:     string;
  updated_at:     string;
  deleted_at:     null;
}

export interface InvoiceEstados {
  id:          string;
  descripcion: string;
  deleted_at:  null;
}

export interface InvoiceUsers {
  id:                string;
  name:              string;
  email:             string;
  email_verified_at: null;
  password:          string;
  remember_token:    null;
  created_at:        null;
  updated_at:        null;
}









