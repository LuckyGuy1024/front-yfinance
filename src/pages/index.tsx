import type { NextPage } from 'next'

import { OHLC } from "../components/candle-chart";

const IndexPage: NextPage = () => {
  return (
    <div>
      {typeof window !== "undefined" && <OHLC />}
    </div>
  )
}

export default IndexPage
