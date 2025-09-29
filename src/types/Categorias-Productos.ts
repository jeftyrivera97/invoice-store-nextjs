export interface CategoriaProductoType {
    data: CategoriaProductoData[];
}

export interface CategoriaProductoData {
    id:               string;
    descripcion:      string;
    nombre_imagen:    string;
    ruta_imagen:      string;
    id_estado:        string;
    id_estado_online: string;
    id_usuario:       string;
    created_at:       string;
    updated_at:       string;
    deleted_at:       null;
    estados:          Estados;
}

export interface Estados {
    id:          string;
    descripcion: Descripcion;
    deleted_at:  null;
}

export enum Descripcion {
    Activo = "Activo",
}
