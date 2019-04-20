import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {app} from 'app';
import {ThemeProvider} from 'styled-components';
import loadable from '@loadable/component';
import 'src/i18n/i18next';
import siteConfig from 'src/site-config';
import Routers from 'src/routers';
import Head from 'components/head';
import ErrorBoundary from 'components/error-boundary';

if (app.getEnv('SERVER_NODE_ENV') !== 'production'
    && app.getEnv('BUILD_TARGET') === 'client'
) {
    const axe = require('react-axe');
    axe(React, ReactDOM, 1000);
}

app.start();

const {theme} = siteConfig;

const GlobalStyle = loadable(() => import(`./themes/${theme}/styles`), {fallback: <Fragment />});

export const Entry = () => <ThemeProvider theme={{theme}}>
    <ErrorBoundary>
        <GlobalStyle />
        <Head />
        <Routers />
    </ErrorBoundary>
</ThemeProvider>;
