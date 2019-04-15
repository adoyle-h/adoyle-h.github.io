'use strict';

const Path = require('path');
const I18nPlugin = require('../webpack/plugins/i18n');

const getPath = (path) => Path.join(__dirname, '../../', path);

module.exports = (config, {target}) => {
    const {plugins} = config;

    if (target === 'web') {
        // client only
        plugins.push(new I18nPlugin({
            inputDir: getPath('src/**/i18n/'),
            inputExt: '.toml',
            outputDir: getPath('public/static/i18n/'),
        }));
    }

    return config;
};
