import serialize from 'serialize-javascript';
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import express from 'express';
import {renderToString} from 'react-dom/server';
import {Helmet} from 'react-helmet';
import {envConf} from '../env-config';
import Logger from './logger';
import {Entry} from '../entry';


const _logger = Logger.create({label: 'server:index'});

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

const server = express();
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        const context = {};
        const markup = renderToString(
            <StaticRouter context={context} location={req.url}>
                <Entry />
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
