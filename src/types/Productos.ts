export interface ProductsData {
  data: ProductoData[];
}

export interface ProductoData {
  id: bigint;
  codigo_producto: string;
  descripcion: string;
  id_categoria: string;
  marca: string;
  size: string;
  color: string;
  id_proveedor: string;
  peso: number;
  stock: number;
  id_impuesto: string;
  gravado15: number;
  gravado18: number;
  impuesto15: number;
  impuesto18: number;
  exento: number;
  exonerado: number;
  costo: number;
  precio_venta: number;
  precio_web: number;
  valor: number;
  id_estado_web: string;
  id_estado: string;
  id_usuario: null | string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  categorias_productos: ProductoCategorias;
  proveedores: ProductoProveedores;
  impuestos: ProductoImpuestos;
}

export interface ProductoImpuestos {
  id: string;
  descripcion: string;
  valor: number;
  id_estado: string;
  created_at: null;
  updated_at: null;
  deleted_at: null;
}


export interface ProductoCategorias {
  id: string;
  descripcion: string;
  nombre_imagen: null;
  ruta_imagen: null;
  id_estado: string;
  id_estado_web: string;
  id_usuario: null | string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface ProductoProveedores {
  id: string;
  codigo_proveedor: string;
  descripcion: string;
  categoria: string;
  contacto: string;
  telefono: string;
  id_estado: string;
  id_usuario: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}
