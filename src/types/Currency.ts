export interface CurrencyType {
    data: CurrencyData[];
}

export interface CurrencyData {
    id:          string;
    descripcion: string;
    compra:      number;
    venta:       number;
    id_estado:   string;
    id_usuario:  string;
    created_at:  string;
    updated_at:  string;
    deleted_at:  null;
}
