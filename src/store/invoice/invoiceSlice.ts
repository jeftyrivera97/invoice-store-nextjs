import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InvoiceState,
  InvoiceItem,
  InvoiceCliente,
  InvoiceMetodoPago,
  InvoiceCategoryData,
} from "@/types/Invoices";

// Actualizar el initialState
const initialState: InvoiceState = {
  moduleName: "invoice",
  moduleTitle: "Comprobante",
  items: [],
  loading: false,
  status: "not-loaded",
  errorMessage: undefined,
  counter: 0,
  gravado15: 0,
  gravado18: 0,
  exento: 0,
  exonerado: 0,
  impuesto15: 0,
  impuesto18: 0,
  porcentajeDescuento: 0,
  descuento: 0,
  subtotal: 0,
  total: 0,
  totalUSD: 0,
  totalEUR: 0,
  cambioDolar: 1,
  cambioEuro: 1,
  cliente: {
    id: "",
    codigo_cliente: "",
    descripcion: "",
    direccion: "",
    telefono: "",
    id_estado: "",
    id_usuario: "",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  tipo_comprobante: {
    id: "",
    descripcion: "",
    id_estado: "",
    id_usuario: "",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  estado_comprobante: {
    id: "",
    descripcion: "",
    deleted_at: null,
  },
  metodo_pago: {
    id: "",
    descripcion: "",
    id_estado: "",
    id_usuario: "",
    created_at: "",
    updated_at: "",
  },
  categoria_comprobante: {
    id: "",
    descripcion: "",
    id_estado: "",
    id_usuario: "",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  referencia: "",
  comentario: "",
};

// Actualizar los reducers con los tipos correctos
export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    onInvoiceLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.errorMessage = undefined;
    },

    onAddToInvoice: (state, action: PayloadAction<InvoiceItem>) => {
      const existing = state.items.find(
        (item) => item.codigo_producto === action.payload.codigo_producto
      );
      if (existing) {
        existing.cantidad += action.payload.cantidad;
        existing.gravado15 += action.payload.gravado15;
        existing.gravado18 += action.payload.gravado18;
        existing.impuesto15 += action.payload.impuesto15;
        existing.impuesto18 += action.payload.impuesto18;
        existing.exento += action.payload.exento;
        existing.exonerado += action.payload.exonerado;
        existing.total_linea += action.payload.total_linea;
        existing.total_lineaUSD += action.payload.total_lineaUSD;
        existing.total_lineaEUR += action.payload.total_lineaEUR;
      } else {
        state.items.push(action.payload);
      }

      // Totalizar los campos sumando todos los items
      state.gravado15 = state.items.reduce(
        (acc, item) => acc + (item.gravado15 ?? 0),
        0
      );
      state.gravado18 = state.items.reduce(
        (acc, item) => acc + (item.gravado18 ?? 0),
        0
      );
      state.impuesto15 = state.items.reduce(
        (acc, item) => acc + (item.impuesto15 ?? 0),
        0
      );
      state.impuesto18 = state.items.reduce(
        (acc, item) => acc + (item.impuesto18 ?? 0),
        0
      );
      state.exento = state.items.reduce(
        (acc, item) => acc + (item.exento ?? 0),
        0
      );
      state.exonerado = state.items.reduce(
        (acc, item) => acc + (item.exonerado ?? 0),
        0
      );
      state.subtotal = state.items.reduce(
        (acc, item) => acc + (item.total_linea ?? 0),
        0
      );
      // Aplica el descuento si existe
      const descuentoOtorgado =
        state.subtotal * (state.porcentajeDescuento / 100);

      state.total = state.subtotal - descuentoOtorgado;

      const totalDolar = state.total / state.cambioDolar;
      const totalEuro = state.total / state.cambioEuro;

      state.totalUSD = totalDolar;
      state.totalEUR = totalEuro;

      state.descuento = descuentoOtorgado;
      if (state.total < 0) state.total = 0;

      state.counter = state.items.length;
      state.loading = false;
      state.errorMessage = undefined;
      state.status = "loaded";
    },

    onApplyDiscount: (state, action: PayloadAction<number>) => {
      state.porcentajeDescuento = action.payload;
      // Calcula el subtotal real (sin descuento)
      const subtotal = state.items.reduce(
        (acc, item) => acc + (item.total_linea ?? 0),
        0
      );
      state.subtotal = subtotal; // Asegura que el subtotal esté actualizado
      const descuentoOtorgado = subtotal * (state.porcentajeDescuento / 100);
      state.total = subtotal - descuentoOtorgado;
      state.descuento = descuentoOtorgado;

      const totalDolar = state.total / state.cambioDolar;
      const totalEuro = state.total / state.cambioEuro;

      state.totalUSD = totalDolar;
      state.totalEUR = totalEuro;

      if (state.total < 0) state.total = 0;
    },

    onInvoiceError: (state, action: PayloadAction<string>) => {
      Object.assign(state, initialState);
      state.errorMessage = action.payload;
      state.status = "error";
    },

    onRecalculateTotals: (state) => {
      state.gravado15 = state.items.reduce(
        (acc, item) => acc + (item.gravado15 ?? 0),
        0
      );
      state.gravado18 = state.items.reduce(
        (acc, item) => acc + (item.gravado18 ?? 0),
        0
      );
      state.impuesto15 = state.items.reduce(
        (acc, item) => acc + (item.impuesto15 ?? 0),
        0
      );
      state.impuesto18 = state.items.reduce(
        (acc, item) => acc + (item.impuesto18 ?? 0),
        0
      );
      state.exento = state.items.reduce(
        (acc, item) => acc + (item.exento ?? 0),
        0
      );
      state.exonerado = state.items.reduce(
        (acc, item) => acc + (item.exonerado ?? 0),
        0
      );
      state.subtotal = state.items.reduce(
        (acc, item) => acc + (item.total_linea ?? 0),
        0
      );

      // Aplica el descuento si existe
      const descuentoOtorgado =
        state.subtotal * (state.porcentajeDescuento / 100);
      state.total = state.subtotal - descuentoOtorgado;
      state.descuento = descuentoOtorgado;

      const totalDolar = state.total / state.cambioDolar;
      const totalEuro = state.total / state.cambioEuro;

      state.totalUSD = totalDolar;
      state.totalEUR = totalEuro;
      if (state.total < 0) state.total = 0;
      state.counter = state.items.length;
    },

    onRemoveFromInvoice: (state, action: PayloadAction<string>) => {
      const codigo_producto = action.payload;
      const existing = state.items.find(
        (item) => item.codigo_producto === codigo_producto
      );
      if (existing) {
        state.items = state.items.filter(
          (item) => item.codigo_producto !== codigo_producto
        );
        state.counter = state.items.length;
      }
    },
    onClienteSelection: (state, action: PayloadAction<InvoiceCliente>) => {
      state.cliente = action.payload;
    },

    onMetodoPagoSelection: (
      state,
      action: PayloadAction<InvoiceMetodoPago>
    ) => {
      state.metodo_pago = action.payload;
    },

    onCategoriaComprobanteSelection: (
      state,
      action: PayloadAction<InvoiceCategoryData>
    ) => {
      state.categoria_comprobante = action.payload;
    },

    onReferenciaFill: (state, action: PayloadAction<string>) => {
      state.referencia = action.payload;
    },

    onInvoiceClean: (state) => {
      Object.assign(state, initialState);
    },
    onCurrencyLoad: (
      state,
      action: PayloadAction<{ cambioDolar: number; cambioEuro: number }>
    ) => {
      const { cambioDolar, cambioEuro } = action.payload;
      state.cambioDolar = cambioDolar;
      state.cambioEuro = cambioEuro;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onInvoiceLoading,
  onInvoiceError,
  onAddToInvoice,
  onApplyDiscount,
  onRemoveFromInvoice,
  onRecalculateTotals,
  onClienteSelection,
  onMetodoPagoSelection,
  onReferenciaFill,
  onInvoiceClean,
  onCategoriaComprobanteSelection,
  onCurrencyLoad,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

export type { InvoiceState };
