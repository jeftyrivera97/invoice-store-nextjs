export interface FolioType {
  data: FolioData[];
}

export interface FolioData {
  id: string;
  codigo_folio: string;
  descripcion: string;
  inicio: number;
  final: number;
  actual: number;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  estados: FolioEstados;
}

export interface FolioEstados {
  id: string;
  descripcion: string;
  deleted_at: null;
}
