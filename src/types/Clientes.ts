export interface ClientesType {
    data: ClientesData[];
}

export interface ClientesData {
    id:             string;
    codigo_cliente: string;
    descripcion:    string;
    telefono:       string;
    id_estado:      string;
    id_usuario:     string;
    created_at:     Date;
    updated_at:     Date;
    deleted_at:     null;
}
