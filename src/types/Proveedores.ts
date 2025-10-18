export interface ProveedoresType {
  data: ProveedorData[];
}

export interface ProveedorData {
  id: string;
  codigo_proveedor: string;
  descripcion: string;
  categoria: string;
  contacto: string;
  telefono: string;
  correo: string;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
