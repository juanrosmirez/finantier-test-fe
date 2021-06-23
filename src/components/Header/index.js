import React from 'react';

//Semantic UI && Material UI
import { Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Grid from '@material-ui/core/Grid';

import './index.css'

const Header = ({ title = "STOCK MARKET", setSymbolInput, getYahooFinanceAPI, symbolInput }) => {

    return (
        <div className="header__banner">
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing="3"
            >
                <Grid style={gridStyle} xs={12} md={6} lg={4} item>
                    <span className="header__title">{title}</span>
                </Grid>
                <Grid style={gridStyle} xs={12} md={6} lg={8} item>
                    <Input onChange={(e) => setSymbolInput(e.target.value)} className="header__search" size='big' action={{ icon: 'search', onClick: () => getYahooFinanceAPI(symbolInput) }} placeholder='Type a Symbol...' />
                </Grid>
            </Grid >
        </div >

    );
}

const gridStyle = {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center"
}

export default Header;
