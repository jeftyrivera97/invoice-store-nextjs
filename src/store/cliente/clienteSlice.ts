import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ClientesType,
  ClientesData,
} from "../../types/Clientes";

interface ClienteState {
  moduleName: string;
  moduleTitle: string;
  data: ClientesData[];
  loading: boolean;
  status: string;
  errorMessage: string | undefined;
  counter: number;
}

const initialState: ClienteState = {
  moduleName: "clientes",
  moduleTitle: "Clientes",
  data: [],
  loading: false,
  status: "not-loaded",
  errorMessage: undefined,
  counter: 0,
};

export const productoSlice = createSlice({
  name: "Cliente",
  initialState,
  reducers: {
    onClienteLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.errorMessage = undefined;
      state.data = [];
    },

    onClienteFill: (state, action: PayloadAction<ClientesType>) => {
      const { payload } = action;

      state.loading = false;
      state.errorMessage = undefined;
      state.status = "loaded";
      state.data = payload.data || [];
       state.counter = payload.data ? payload.data.length : 0;
    },
    onClienteError: (state, action: PayloadAction<string>) => {
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
  onClienteLoading,
  onClienteFill,
  onClienteError,
} = productoSlice.actions;

export default productoSlice.reducer;

export type { ClienteState, ClientesType };