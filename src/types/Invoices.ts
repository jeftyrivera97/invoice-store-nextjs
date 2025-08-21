import { FolioData } from "./Folios";

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
}

export interface InvoiceState {
  moduleName: string;
  moduleTitle: string;
  cliente: InvoiceCliente;
  tipo_factura: InvoiceCategoryData;
  estado_factura: InvoiceEstados;
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
  loading: boolean;
  status: string;
  errorMessage: string | undefined;
  counter: number;
}

export interface InvoiceType {
  data: InvoiceData[];
}

export interface InvoiceData {
  id: string;
  codigo_factura: string;
  fecha: Date;
  fecha_hora: Date;
  fecha_vencimiento: Date;
  id_cliente: string;
  gravado15: number;
  gravado18: number;
  impuesto15: number;
  impuesto18: number;
  exento: number;
  exonerado: number;
  descuentos: number;
  subtotal: number;
  total: number;
  id_folio: string;
  id_categoria: string;
  id_tipo_factura: string;
  id_estado_factura: string;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  clientes: InvoiceCliente;
  categorias_facturas: InvoiceCategoryData;
  tipos_facturas: InvoiceCategoryData;
  estados_facturas: InvoiceEstados;
  estados: InvoiceEstados;
  users: InvoiceUsers;
  folios: FolioData;
}

export interface InvoiceCategoryData {
  id: string;
  descripcion: string;
  id_estado: string;
  id_usuario?: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface InvoiceCliente {
  id: string;
  codigo_cliente: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface InvoiceEstados {
  id: string;
  descripcion: string;
  deleted_at: null;
}

export interface InvoiceUsers {
  id: string;
  name: string;
  email: string;
  email_verified_at: null;
  password: string;
  remember_token: null;
  created_at: string;
  updated_at: string;
}
