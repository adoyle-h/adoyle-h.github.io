import FS from 'fs';
import Path from 'path';
import serialize from 'serialize-javascript';
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import express from 'express';
import {renderToString} from 'react-dom/server';
import {Helmet} from 'react-helmet';
import i18next from 'i18next';
import {i18nextOpts} from 'src/i18n/i18next';
import {withSSR} from 'react-i18next';
import i18nextMW from 'i18next-express-middleware';
import {envConf} from '../env-config';
import Logger from './logger';
import {Entry} from '../entry';

// Below codes are Invalid! Because server codes are translated by Webpack! process.env.<var>
// const {
//     RAZZLE_ASSETS_MANIFEST, RAZZLE_PUBLIC_DIR, NODE_ENV,
// } = process.env;

const logger = Logger.create({label: 'server:index'});

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const isProd = process.env.NODE_ENV === 'production';

/* eslint-disable indent */
const renderHTML = (helmet, markup) => `<!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
    <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
    </head>

    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
        <script>window.env = ${serialize(envConf)};</script>
        ${
          isProd
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </body>
</html>`;
/* eslint-enable indent */

const i18nStoreMap = {};
// @TODO use async function
const loadI18nStore = (lang, reloadLangStore) => {
    if (!!reloadLangStore && i18nStoreMap[lang]) return i18nStoreMap[lang];
    logger.info('loadI18nStore lang=%s', lang);

    const filepath = Path.join(process.env.RAZZLE_PUBLIC_DIR, `static/i18n/${lang}.json`);
    i18nStoreMap[lang] = JSON.parse(FS.readFileSync(filepath, {encoding: 'utf8'}));

    return i18nStoreMap[lang];
};

const ssrI18next = i18next.createInstance();
ssrI18next
    .use(i18nextMW.LanguageDetector)
    .init({
        fallbackLng: i18nextOpts.fallbackLng,
    });
const I18nEntry = withSSR()(Entry);

const server = express();
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .use(i18nextMW.handle(ssrI18next))
    .get('/*', (req, res) => {
        const context = {};
        const {language: lang} = req;
        logger.info('Get request lang=%s', lang);

        const reloadLangStore = req.param('reloadLangStore');
        const i18nStore = loadI18nStore(lang, reloadLangStore);

        const markup = renderToString(
            <StaticRouter context={context} location={req.url}>
                <I18nEntry initialLanguage={lang} initialI18nStore={i18nStore} />
            </StaticRouter>
        );
        const helmet = Helmet.renderStatic();

        if (context.url) {
            res.redirect(context.url);
        } else {
            res.status(200).send(renderHTML(helmet, markup));
        }
    });

export default server;
