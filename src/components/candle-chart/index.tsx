import * as React from "react";
import {
  Inject,
  DateTime,
  Tooltip,
  RangeTooltip,
  Crosshair,
  CandleSeries,
  Category,
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Zoom,
  ITooltipRenderEventArgs,
} from "@syncfusion/ej2-react-charts";
import { StockHistoryItem } from "../../features/stock/stockSlice";
import { useEffect, useRef } from "react";

export const OHLC = ({data}: {data: StockHistoryItem[]}) => {
  const chartInstance: any = useRef(null);
  useEffect(() => {
    if (chartInstance.current)
      chartInstance.current.refresh()
  })
  let legendSettings = { visible: false };
 
  let tooltipRender = (args: ITooltipRenderEventArgs) => {
    args.text = ` <b>${args.point.x.toLocaleDateString()}</b><br/>
                  <b>high:${args.point.high}</b><br/>
                  <b>low:${args.point.low}</b><br/>
                  <b>open:${args.point.open}</b><br/>
                  <b>close:${args.point.close}</b>`;
  };
  return (
    <ChartComponent
      ref={chartInstance}
      id='charts'
      primaryXAxis={{
        valueType: "DateTime",
        majorGridLines: { width: 0 },
        majorTickLines: { color: "transparent" },
        crosshairTooltip: { enable: true },
      }}
      primaryYAxis={{
        labelFormat: "n0",
        lineStyle: { width: 0 },
        rangePadding: "None",
        majorTickLines: { width: 0 },
      }}
      legendSettings={legendSettings}
      title='Shirpur Gold Refinery Share Price'
      tooltipRender={tooltipRender}
      tooltip={{ enable: true }}
      crosshair={{ enable: true }}
    >
      <Inject services={[CandleSeries, Tooltip, Category, Crosshair, Zoom, DateTime, RangeTooltip]}/>
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data} 
          xName='date'
          high="high"
          low="low"
          open="open"
          close="close"
          type="Candle"
          name='Summary'
        >
        </SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}
