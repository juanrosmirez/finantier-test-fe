import React from 'react'
import { Statistic } from 'semantic-ui-react'

const HeaderStatistics = ({ shortName, symbol, regularMarketPrice, regularMarketChange, regularMarketChangePercent }) => (
  <>
    <div>
      <Statistic value={shortName.value} size={shortName.size} inverted />
      <Statistic value={symbol.value} size={symbol.size} inverted />
    </div>
    <div>
      <div>
        <Statistic value={regularMarketPrice.value} size={regularMarketPrice.size} inverted />
      </div>
      <div>
        <Statistic value={regularMarketChange.value} size={regularMarketChange.size} color={regularMarketChange.color} inverted />
        <Statistic value={regularMarketChangePercent.value} size={regularMarketChangePercent.size} color={regularMarketChangePercent.color} inverted />
      </div>
    </div>
  </>
)

export default HeaderStatistics 