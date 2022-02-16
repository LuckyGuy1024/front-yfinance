import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import stockReducer from '../features/stock/stockSlice'

export function makeStore() {
  return configureStore({
    reducer: { stock: stockReducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false
    })
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>


export default store
