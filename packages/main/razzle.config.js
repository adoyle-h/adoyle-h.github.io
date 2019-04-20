'use strict';

const {getRazzlePlugin} = require('@adoyle.me/dev-tools');
const Path = require('path');
const {aliases} = require('./aliases');

const getPath = (path) => Path.join(__dirname, path);

// Razzle default config at node_modules/razzle/config/createConfig.js

module.exports = {
    plugins: [
        getRazzlePlugin('yaml'),
        getRazzlePlugin('toml'),
        {
            func: getRazzlePlugin('alias'),
            options: {aliases},
        },
        // last 2nd
        {
            func: getRazzlePlugin('i18n'),
            options: {
                inputDir: getPath('src/**/i18n/'),
                outputDir: getPath('public/static/i18n/'),
            },
        },
        // last
        getRazzlePlugin('debug-config'),
    ],
};
