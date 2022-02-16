export async function fetchStockHistory(
    tickerSymbol: string,
    start: string,
    end: string,
    interval: '1d' | '1w' | '1m',
  ): Promise<{ data: number }> {
  const response = await fetch('/api/counter', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  })
  const result = await response.json()

  return result
}
