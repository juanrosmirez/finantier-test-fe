import { getConfigPrice } from '../utils';

const axios = require('axios');

const API_KEY = `d9f059e70emsh890c52a47cb2b2fp16678fjsn2f3d268190cf`;
const BASE_API = `https://apidojo-yahoo-finance-v1.p.rapidapi.com`;

const HOST = `apidojo-yahoo-finance-v1.p.rapidapi.com`;


const axiosYahooFinanceAPI = axios.create({
    baseURL: BASE_API,
    headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': HOST,
        'x-rapidapi-key': API_KEY
    },
});

const getStockMarketBySymbol = async (symbol = 'tsla') => {

    const defaultSymbol = symbol !== '' ? symbol : 'tsla';

    return await axiosYahooFinanceAPI.get(`/stock/v2/get-summary?symbol=${defaultSymbol}`)
        .then(function (stockMarket) {
            let symbolResponse;
            if (stockMarket && Object.entries(stockMarket.data)) {

                const { price, summaryDetail } = stockMarket.data;
                const regularMarketChangeIsPositive = price.regularMarketChange.raw > 0 ? '+' : '';

                symbolResponse = {
                    header: {
                        regularMarketPrice: { value: price.regularMarketPrice.fmt, size: 'large' }, //PRICE
                        regularMarketChange: { value: `${regularMarketChangeIsPositive}${price.regularMarketChange.fmt}`, size: 'mini', color: regularMarketChangeIsPositive ? "green" : "red" }, // VARIATION
                        regularMarketChangePercent: { value: `(${regularMarketChangeIsPositive}${price.regularMarketChangePercent.fmt})`, size: 'mini', color: regularMarketChangeIsPositive ? "green" : "red" }, // PERCENT
                        symbol: { value: `(${price.symbol})`, size: 'small' }, // SYMBOL
                        shortName: { value: `${price.shortName}`, size: 'small' }, // SHORT NAME
                    },
                    body: {
                        marketCap: { value: price.marketCap.fmt || '-', label: 'MARKET CAP' }, //MARKET CAP
                        regularMarketPreviousClose: { value: price.regularMarketPreviousClose.fmt || '-', label: 'PREVIOUS CLOSE' }, // PREVIOUS CLOSE
                        regularMarketOpen: { value: price.regularMarketOpen.fmt || '-', label: 'OPEN' }, // OPEN
                        bid: { value: summaryDetail.bid.fmt || '-', label: 'BID' }, // BID
                        volume: { value: summaryDetail.volume.fmt || '-', label: 'VOLUME' }, // VOLUME
                        averageVolume: { value: summaryDetail.averageVolume.fmt || '-', label: 'AVG VOLUME' }, // AVG VOLUME
                        ask: { value: summaryDetail.ask.fmt || '-', label: 'ASK' }, // ASK
                        postMarketPrice: { value: price.postMarketPrice.fmt || '-', label: 'POST MARKET PRICE' } // ASK
                    }
                }
            }
            return symbolResponse;
        })
        .catch(function (error) {
            console.log(error.response);
        })
};

const getChartBySymbol = async (symbol = 'tsla', interval = '60m', range = '3mo') => {

    const defaultSymbol = symbol !== '' ? symbol : 'tsla';

    return await axiosYahooFinanceAPI.get(`/stock/v2/get-chart?symbol=${defaultSymbol}&interval=${interval}&range=${range}`)
        .then(function (stockMarketInfo) {

            const timestamp = stockMarketInfo.data.chart.result[0].timestamp;
            const open = stockMarketInfo.data.chart.result[0].indicators.quote[0].open;

            let priceData = [];

            if (timestamp) {
                for (let index = 0; index < timestamp.length; index++) {
                    priceData.push([timestamp[index] * 1000, open[index]])
                }
            }

            return getConfigPrice(priceData);
        })
        .catch(function (error) {
            console.log(error);
        })
};

export { getChartBySymbol, getStockMarketBySymbol };