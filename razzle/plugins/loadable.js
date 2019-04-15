'use strict';

const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = (config, {target}) => {
    if (target === 'web') {
        // client only
        config.plugins.push(new LoadablePlugin({
            filename: 'loadable-stats.json',
            writeToDisk: true,
        }));
    }

    return config;
};
