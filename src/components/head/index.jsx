import React from 'react';
import {Helmet} from 'react-helmet';
import siteConfig from 'src/site-config';
// import {app} from 'app';
import i18next from 'src/i18n/i18next';
import logo from 'src/assets/logo.png';

export default () => <Helmet>
    <html lang={i18next.language} />
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />


    {/* <!-- Short description of the document (limit to 150 characters) --> */}
    {/* <!-- This content *may* be used as a part of search engine results. --> */}
    <meta name="description" content={siteConfig.description} />
    {/* <!-- Theme Color for Chrome, Firefox OS and Opera --> */}
    <meta name="theme-color" content="#4285f4" />
    {/* <!-- Control the behavior of search engine crawling and indexing --> */}
    <meta name="robots" content="index,follow" />
    {/* <!-- All Search Engines --> */}
    <meta name="googlebot" content="index,follow" />
    {/* <!-- Tells Google not to provide a translation for this document --> */}
    <meta name="google" content="notranslate" />


    {/*
        // @TODO Waiting fix https://github.com/nfl/react-helmet/issues/437
        <title itemProp="name" lang={i18next.language}>{app.t('site.title')}</title>
    */}
    <title itemProp="name" lang={i18next.language}>{siteConfig.title}</title>

    <link rel="shortcut icon" type="image/png" href={logo} sizes="32x32" />
</Helmet>;
