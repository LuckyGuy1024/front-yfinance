import type { NextPage } from 'next'

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useAppDispatch } from '../app/hooks'
import { OHLC } from "../components/candle-chart";
import {
  getStockHistoryAsync, StockHistoryState
} from '../features/stock/stockSlice'

import {Box, TextField, MenuItem} from '@mui/material';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

interface PageProps {
  stock: StockHistoryState
}

const IndexPage: NextPage<PageProps> = ({stock}) => {
  const dispatch = useAppDispatch()

  const [range, setRange] = useState<DateRange<Date>>([null, null]);
  const [symbol, setSymbol] = useState("")
  const [interval, setInterval] = useState<'1d'|'1wk'|'1mo'>('1mo')
  
  useEffect( () => {
    if(range[0] && range[1] && interval)
      dispatch(getStockHistoryAsync({ ticker_symbol: symbol, start: range[0].toISOString().slice(0, 10), end: range[1].toISOString().slice(0, 10), interval: interval }))
  }, [range, interval])
  const intervals = [
    {
      value: '1d',
      label: "Day"
    }, {
      value: '1wk',
      label: "Week"
    }, {
      value: '1mo',
      label: "Month"
    }
  ]


  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2
        }}
      >
        <Box>
          <TextField onChange={ev => setSymbol(ev.target.value)} value={symbol} placeholder="Ticker Symbol" autoComplete=''/>
        </Box>
        <Box sx={{ pl: 2 }} >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="From"
              endText="To"
              value={range}
              onChange={(newRange) => {
                setRange(newRange);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </>
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ pl: 2 }} >
         <TextField
            select
            label="Select Interval"
            value={interval}
            onChange={ev => setInterval(ev.target.value)}
            helperText="Please select interval"
          >
            {intervals.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
         </TextField>
        </Box>

      </Box>
      {typeof window !== "undefined" && <OHLC data={stock.value} symbol={symbol}/>}
    </div>
  )
}

function mapState(state) {
  const { stock } = state
  return { stock: stock }
}

export default connect(mapState)(IndexPage)
