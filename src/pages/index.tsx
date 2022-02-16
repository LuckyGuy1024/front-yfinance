import type { NextPage } from 'next'

import { OHLC } from "../components/candle-chart";
import { useAppDispatch } from '../app/hooks'

import {
  getStockHistoryAsync, StockHistoryState
} from '../features/stock/stockSlice'
import { useEffect } from 'react';
import { connect } from 'react-redux';

interface PageProps {
  stock: StockHistoryState
}

const IndexPage: NextPage<PageProps> = ({stock}) => {
  const dispatch = useAppDispatch()

  useEffect( () => {
    dispatch(getStockHistoryAsync({ ticker_symbol: "aapl", start: "2020-01-01", end: "2020-02-01", interval: "1d" }))
  }, [])

  return (
    <div>
      {typeof window !== "undefined" && <OHLC data={stock.value}/>}
    </div>
  )
}

function mapState(state) {
  const { stock } = state
  return { stock: stock }
}

export default connect(mapState)(IndexPage)
