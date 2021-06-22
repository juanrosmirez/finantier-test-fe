import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'

import { getChartBySymbol, getStockMarketBySymbol } from './services';
import StatisticActionBodyGroup from './components/StatisticActionBodyGroup';
import StatisticActionHeaderGroup from './components/StatisticActionHeaderGroup';
import Header from './components/Header';
import { getConfigPrice } from './utils';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const loadingText = 'LOADING...';
const defaultSymbol = 'tsla';

const App = () => {

  const [symbol, setSymbol] = useState();
  const [inputSymbol, setInputSymbol] = useState(defaultSymbol);
  const [chart, setChart] = useState();
  const [loading, setLoading] = useState(true);

  const isLoading = loading || !symbol || symbol.header.symbol.value.toLowerCase() !== `(${inputSymbol.toLowerCase()})`;

  useEffect(() => {

    const getYahooFinanceAPI = async () => {
      try {
        setLoading(true);

        const symbolResponse = await getStockMarketBySymbol(inputSymbol);
        const chartResponse = await getChartBySymbol(inputSymbol);

        setChart(chartResponse);
        setSymbol(symbolResponse);

        setLoading(false);

      } catch (e) {
        setLoading(false);
      }
    }
    getYahooFinanceAPI();
  }, [inputSymbol]);

  return (
    <div className="app">

      {/* BANNER */}
      <Header title="STOCK MARKET" setInputSymbol={setInputSymbol} inputSymbol={inputSymbol} />

      {/* LOADER */}
      <Loader size={'big'} active={isLoading}>{loadingText}</Loader>

      {
        !isLoading && <>
          {/* HEADER */}
          <div className="app__header">
            <StatisticActionHeaderGroup  {...symbol.header} />
          </div>

          {/* BODY */}
          <div className="app__body">
            <StatisticActionBodyGroup statistics={Object.values(symbol.body)} />
          </div>

          {/* CHART */}
          {chart &&
            <div div className="app__chart">
              <ReactHighcharts config={getConfigPrice(chart, symbol.header.shortName.value)} />
            </div>}
        </>
      }



    </div >
  );
}

export default App;
