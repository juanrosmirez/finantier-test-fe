import React from 'react';

//Semantic UI && Material UI
import { Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Grid from '@material-ui/core/Grid';

import './index.css'


const Header = ({ title = "STOCK MARKET", setInputSymbol }) => {

    return (
        <div className="header__banner">
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing="3"
            >
                <Grid style={headerGridStyle} xs={12} md={6} lg={4} item>
                    <span className="header__title">{title}</span>
                </Grid>
                <Grid style={headerGridStyle} xs={12} md={6} lg={8} item>
                    <Input onChange={(e) => setInputSymbol(e.target.value)} className="header__search" size='big' icon='search' placeholder='Search...' />
                </Grid>
            </Grid >
        </div >

    );
}

const headerGridStyle = {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center"
}

export default Header;
