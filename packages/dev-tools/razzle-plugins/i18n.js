'use strict';

const I18nPlugin = require('../webpack/plugins/i18n');

module.exports = (config, {target}, _webpack, options) => {
    const {plugins} = config;
    const {inputDir, outputDir} = options;

    if (target === 'web') {
        // client only
        plugins.push(new I18nPlugin({
            inputDir, outputDir,
            inputExt: '.toml',
        }));
    }

    return config;
};
