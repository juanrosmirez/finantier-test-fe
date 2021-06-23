import React from 'react'

import { Statistic } from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid';


const BodyStatistics = ({ statistics }) => (
  <Grid container>
    {statistics.map((statistic) => {
      return (
        <Grid xs={12} sm={4} md={3} item>
          <Statistic style={statisticStyle} size={statistic.size ? statistic.size : "small"} inverted>
            <Statistic.Value>{statistic.value}</Statistic.Value>
            <Statistic.Label>{statistic.label}</Statistic.Label>
          </Statistic>
        </Grid>
      )
    })
    }
  </Grid >
)

const statisticStyle = {
  paddingTop: "2rem"
}

export default BodyStatistics 