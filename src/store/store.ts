import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import  productoReducer  from './producto/productoSlice'
import  clienteReducer  from './cliente/clienteSlice'
import invoiceReducer from './invoice/invoiceSlice'
 // Import the default export as `authReducer`

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // Use the default export directly
      producto: productoReducer,
      cliente: clienteReducer,
      invoice: invoiceReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']