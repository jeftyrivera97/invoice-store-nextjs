import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProductoData,
  ProductsData,
} from "../../types/Productos";

interface ProductoState {
  moduleName: string;
  moduleTitle: string;
  data: ProductoData[];
  loading: boolean;
  status: string;
  errorMessage: string | undefined;
  counter: number;
}

const initialState: ProductoState = {
  moduleName: "productos",
  moduleTitle: "Productos",
  data: [],
  loading: false,
  status: "not-loaded",
  errorMessage: undefined,
  counter: 0,
};

export const productoSlice = createSlice({
  name: "Producto",
  initialState,
  reducers: {
    onProductoLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.errorMessage = undefined;
      state.data = [];
    },

    onProductoFill: (state, action: PayloadAction<ProductsData>) => {
      const { payload } = action;

      state.loading = false;
      state.errorMessage = undefined;
      state.status = "loaded";
      state.data = payload.data || [];
       state.counter = payload.data ? payload.data.length : 0;
    },
    onProductoError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.status = "not-loaded";
      state.errorMessage = action.payload;
      state.data = [];
      state.counter = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onProductoLoading,
  onProductoFill,
  onProductoError,
} = productoSlice.actions;

export default productoSlice.reducer;

export type { ProductoState, ProductoData };