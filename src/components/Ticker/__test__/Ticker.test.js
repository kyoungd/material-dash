import React from 'react';
import ReactDom from 'react-dom';
import Ticker from '../Ticker';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { render } from '@testing-library/react';
import { LayoutProvider } from "../../../context/LayoutContext";
import { UserProvider } from "../../../context/UserContext";

import Themes from "../../../themes";

describe('fix it ', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        const company = "";
        const symbol = "MSFT";
        const sentiment = { "yahoo": 40, "google": 35, "tweet": 42 };
        const avgVol = 750;
        const floats = 300;
        const shortPercent = 27;
        const shortVolume = 120;
        const institutions = "NYSE";
        const summary = "One that strated the tech revolution";
        const dispatch = jest.fn();
        ReactDom.render(
            <LayoutProvider>
                <UserProvider>
                    <ThemeProvider theme={Themes.default}>
                        <CssBaseline />
                    </ThemeProvider>
                </UserProvider>
            </LayoutProvider>, div);
    })

})
