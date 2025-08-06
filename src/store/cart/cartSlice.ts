import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ItemCart {
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

interface CartState {
  moduleName: string;
  moduleTitle: string;
  items: ItemCart[];
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

const initialState: CartState = {
  moduleName: "cart",
  moduleTitle: "Cart Items",
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
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    onCartLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.errorMessage = undefined;
    },

    onAddToCart: (state, action: PayloadAction<ItemCart>) => {
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
      if (state.total < 0) state.total = 0;
    },

    onCartError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.status = "not-loaded";
      state.errorMessage = action.payload;
      state.items = [];
      state.counter = 0;
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
      if (state.total < 0) state.total = 0;
      state.counter = state.items.length;
    },

    onRemoveFromCart: (state, action: PayloadAction<string>) => {
      const codigo_producto = action.payload;
      const existing = state.items.find(
        (item) => item.codigo_producto === codigo_producto
      );
      if (existing) {
        state.items = state.items.filter(
          (item) => item.codigo_producto !== codigo_producto
        );
        state.counter = state.items.length;
        // Recalcular totales
        state.gravado15 = state.items.reduce(
          (acc, item) => acc + (item.gravado15 ?? 0),
          0
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onCartLoading,
  onCartError,
  onAddToCart,
  onApplyDiscount,
  onRemoveFromCart,
  onRecalculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;

export type { CartState };
