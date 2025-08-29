
export interface ClientesType {
    data: ClientesData[];
}

export interface ClientesData {
    id:             string;
    codigo_cliente: string;
    descripcion:    string;
    direccion:      string;
    telefono:       string;
    id_estado:      string;
    id_usuario:     string;
    created_at:     string;
    updated_at:     string;
    deleted_at:     null;
}
