import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductoCart {
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
  items: ProductoCart[];
  loading: boolean;
  status: string;
  errorMessage: string | undefined;
  counter: number;
}

const initialState: CartState = {
  moduleName: "productos",
  moduleTitle: "Productos",
  items: [],
  loading: false,
  status: "not-loaded",
  errorMessage: undefined,
  counter: 0,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    onCartLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.errorMessage = undefined;
      state.items = [];
    },

    onCartFill: (state, action: PayloadAction<CartState>) => {
      const { payload } = action;

      state.loading = false;
      state.errorMessage = undefined;
      state.status = "loaded";
      state.items = payload.items || [];
      state.counter = payload.items ? payload.items.length : 0;
    },
    onCartError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.status = "not-loaded";
      state.errorMessage = action.payload;
      state.items = [];
      state.counter = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onCartLoading, onCartFill, onCartError } =
  cartSlice.actions;

export default cartSlice.reducer;

export type {  CartState };
