import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../app/store'
import { fetchStockHistory } from './stockAPI'

// -------------------------------Interface Definitions-------------------------------
export interface StockHistoryItem {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockHistoryState {
  value: StockHistoryItem[]
  status: 'idle' | 'loading' | 'failed'
}

export interface StockHistoryQuery {
  ticker_symbol: string,
  start: string,
  end: string,
  interval: "1d" | "1w" | "1m"
}
//-----------------------------------End of Interface---------------------------------

const initialState: StockHistoryState = {
  value: [],
  status: 'idle'
}

export const getStockHistoryAsync = createAsyncThunk(
  'stock/getHistory',
  async (query: StockHistoryQuery) => {
    const response = await fetchStockHistory(query)
    return response.data
  }
)

export const stockHistorySlice = createSlice({
  name: 'stockHistory',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockHistoryAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getStockHistoryAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload
      })
  },
})

export default stockHistorySlice.reducer
