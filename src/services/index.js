const axios = require('axios');

const API_KEY = `b8ae2dd2e5msh0d1bdded3918dc5p1e4553jsndf4838a27cf5`;
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

    const symbolQuery = symbol !== '' ? symbol : 'tsla';

    return await axiosYahooFinanceAPI.get(`/stock/v2/get-summary?symbol=${symbolQuery}`)
        .then(function (stockMarketInfo) {
            let symbolResponse;
            if (stockMarketInfo && Object.entries(stockMarketInfo.data)) {

                const { price, summaryDetail } = stockMarketInfo.data;
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

    const symbolQuery = symbol !== '' ? symbol : 'tsla';

    return await axiosYahooFinanceAPI.get(`/stock/v2/get-chart?symbol=${symbolQuery}&interval=${interval}&range=${range}`)
        .then(function (stockMarketInfo) {
            const timestamp = stockMarketInfo.data.chart.result[0].timestamp;
            const open = stockMarketInfo.data.chart.result[0].indicators.quote[0].open;

            let priceData = [];
            for (let index = 0; index < timestamp.length; index++) {
                priceData.push([timestamp[index] * 1000, open[index]])
            }

            return priceData;
        })
        .catch(function (error) {
            console.log(error.response);
        })
};

export { getChartBySymbol, getStockMarketBySymbol };