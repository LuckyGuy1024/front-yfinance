import {StockHistoryItem, StockHistoryQuery} from "./stockSlice";

export async function fetchStockHistory(
    params: StockHistoryQuery
  ): Promise<{ data: StockHistoryItem[] }> {
  let url = 'http://localhost:5000/api'
  let query = new URLSearchParams({...params}).toString();

  const response = await fetch(`${url}?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const result = await response.json()
  return result
}
