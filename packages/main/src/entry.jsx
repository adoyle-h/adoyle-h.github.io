import React from 'react';
import {ThemeProvider} from 'styled-components';
import 'src/i18n/i18next';
import siteConfig from 'src/site-config';
import Routers from 'src/routers';
import Head from 'components/head';
import ErrorBoundary from 'components/error-boundary';
import {GlobalStyle} from '@adoyle.me/website-basics';

const {theme} = siteConfig;

export const Entry = () => <ThemeProvider theme={{theme}}>
    <ErrorBoundary>
        <GlobalStyle />
        <Head />
        <Routers />
    </ErrorBoundary>
</ThemeProvider>;
