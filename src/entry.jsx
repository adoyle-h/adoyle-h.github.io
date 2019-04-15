import React, {Fragment} from 'react';
import {app} from 'app';
import {ThemeProvider} from 'styled-components';
import loadable from '@loadable/component';
import 'src/i18n';
import siteConfig from 'src/site';

import Routers from './routers';
import Head from './components/head';
import LangBar from './components/language-bar';
import ErrorBoundary from './components/error-boundary';

app.injectWindow();

const {theme} = siteConfig;

const GlobalStyle = loadable(() => import(`./themes/${theme}/styles`), {fallback: ''});

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
