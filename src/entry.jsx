import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {app} from 'app';
import {ThemeProvider} from 'styled-components';
import loadable from '@loadable/component';
import 'src/i18n';
import siteConfig from 'src/site';

import Routers from './routers';
import Head from './components/head';
import LangBar from './components/language-bar';
import ErrorBoundary from './components/error-boundary';

if (app.getEnv('SERVER_NODE_ENV') !== 'production'
    && app.getEnv('BUILD_TARGET') === 'client'
) {
    const axe = require('react-axe');
    axe(React, ReactDOM, 1000);
}

app.injectWindow();

const {theme} = siteConfig;

const GlobalStyle = loadable(() => import(`./themes/${theme}/styles`), {fallback: 'Loading global style'});

export const Entry = () => <ThemeProvider theme={{theme}}>
    <ErrorBoundary>
        <Fragment>
            <GlobalStyle />
            <Head />
            <LangBar />
            <Routers />
        </Fragment>
    </ErrorBoundary>
</ThemeProvider>;
