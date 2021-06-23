import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react'

import { getChartBySymbol, getStockMarketBySymbol } from './services';
import BodyStatistic from './components/BodyStatistics';
import HeaderStatistics from './components/HeaderStatistics';
import Header from './components/Header';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const ReactHighstock = require('react-highcharts/ReactHighstock')

const App = () => {

  const [symbol, setSymbol] = useState();
  const [symbolInput, setSymbolInput] = useState('tsla');
  const [chart, setChart] = useState();
  const [loading, setLoading] = useState(true);

  const getYahooFinanceAPI = async (symbol) => {
    try {
      setLoading(true);

      const symbolResponse = await getStockMarketBySymbol(symbol);
      const chartResponse = await getChartBySymbol(symbol);

      setChart(chartResponse);
      setSymbol(symbolResponse);

      setLoading(false);

    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getYahooFinanceAPI('tsla');
  }, []);

  return (
    <div className="app">

      {/* BANNER */}
      <Header title="STOCK MARKET" getYahooFinanceAPI={getYahooFinanceAPI} setSymbolInput={setSymbolInput} symbolInput={symbolInput} />

      {/* LOADER */}
      <Loader size={'big'} active={loading}>LOADING...</Loader>

      {
        !loading && symbol && chart && <>
          {/* HEADER */}
          < div className="app__header">
            <HeaderStatistics  {...symbol.header} />
          </div>

          {/* BODY */}
          <div className="app__body">
            <BodyStatistic statistics={Object.values(symbol.body)} />
          </div>

          {/* CHART */}
          <div className="app__chart">
            <ReactHighstock config={chart} />
          </div>
        </>
      }

    </div >
  );
}

export default App;
