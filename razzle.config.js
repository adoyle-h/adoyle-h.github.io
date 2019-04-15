'use strict';

const Path = require('path');

const localPlugin = (name) => require(Path.join(__dirname, 'razzle/plugins', name));

// Razzle default config at node_modules/razzle/config/createConfig.js

module.exports = {
    plugins: [
        localPlugin('yaml'),
        localPlugin('toml'),
        localPlugin('alias'),
        localPlugin('loadable'),
        // last 2nd
        localPlugin('i18n'),
        // last
        localPlugin('debug-config'),
    ],
};
