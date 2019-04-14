import React from 'react';
import {StaticRouter} from 'react-router-dom';
import express from 'express';
import {renderToString} from 'react-dom/server';
import {Helmet} from 'react-helmet';
import Logger from './logger';
import Entry from '../entry';

const logger = Logger.create({label: 'server.js'});

logger.info('process.env=%O', process.env);

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

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
            res.status(200).send(
`<!doctype html>
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
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>

    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
    </body>
</html>`
            );
        }
    });

export default server;
