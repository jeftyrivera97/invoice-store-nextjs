import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CompraData,
  CompraTableData,
  CompraMeta,
  CompraLinks,
  CompraDataGraficaMes,
  CompraInfoTableData,
  CompraAnalisisMensual,
} from "../../interfaces/Compra";

interface CompraState {
  moduleName: string;
  moduleTitle: string;
  tableHeaders: { [key: string]: string };
  tableData: CompraTableData[];
  pagination: {
    meta?: CompraMeta;
    links?: CompraLinks;
  };
  loading: boolean;
  status: string;
  errorMessage: string | undefined;
  counter: number;
  totalMes: string;
  totalAnual: string;
  totalMesYearAnterior: string;
  dataGraficaMes: CompraDataGraficaMes[];
  categoriasMes: CompraInfoTableData[];
  tiposMes: CompraInfoTableData[];
  analisisMensual: CompraAnalisisMensual[] | null; // Ajusta el tipo según tu necesidad
}

const initialState: CompraState = {
  moduleName: "",
  moduleTitle: "",
  tableHeaders: {},
  tableData: [],
  pagination: {},
  loading: false,
  status: "not-loaded",
  errorMessage: undefined,
  counter: 0,
  totalMes: "L.0",
  totalAnual: "L.0",
  totalMesYearAnterior: "L.0",
  dataGraficaMes: [],
  categoriasMes: [],
  tiposMes: [],
  analisisMensual: [],
};

export const compraSlice = createSlice({
  name: "Compra",
  initialState,
  reducers: {
    onCompraLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.errorMessage = undefined;
      state.tableData = [];
      state.pagination = {};
    },

    onCompraFill: (state, action: PayloadAction<CompraData>) => {
      const { payload } = action;

      state.loading = false;
      state.errorMessage = undefined;
      state.status = "loaded";
      state.moduleName = payload.moduleName || "";
      state.moduleTitle = payload.moduleTitle || "";
      state.tableData = payload.data || [];
      state.pagination = {
        meta: payload.meta,
        links: payload.links,
      };
      state.tableHeaders = payload.tableHeaders || {};
      state.counter = payload.contador || 0;
      state.totalMes = payload.totalMes || "L. 0";
      state.totalAnual = payload.totalAnual || "L. 0";
      state.dataGraficaMes = payload.dataGraficaMes || [];
      state.totalMesYearAnterior = payload.totalMesYearAnterior || "L. 0";
      state.tiposMes = payload.tiposMes || [];
      state.categoriasMes = payload.categoriasMes || [];
      state.analisisMensual = payload.analisisMensual || null; // Asegúrate de que este campo exista en tu payload
    },
    onCompraError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.status = "not-loaded";
      state.errorMessage = action.payload;
      state.moduleName = "";
      state.moduleTitle = "";
      state.tableData = [];
      state.pagination = {};
      state.tableHeaders = {};
      state.counter = 0;
      state.totalMes = "L.0";
      state.totalAnual = "L.0";
      state.dataGraficaMes = [];
      state.totalMesYearAnterior = "L.0";
      state.tiposMes = [];
      state.categoriasMes = [];
      state.analisisMensual = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onCompraLoading, onCompraFill, onCompraError } =
  compraSlice.actions;
