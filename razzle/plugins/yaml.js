'use strict';

const {localLoader} = require('../util');
const Logger = require('../logger');

const _logger = Logger.create({label: 'razzle:plugin:yaml'});

module.exports = (config) => {
    const {rules} = config.module;

    // fix file-loader excludes
    const rule = rules.find((x) => x.exclude);
    const extExp = /\.(yaml|yml)$/;
    rule.exclude.push(extExp);

    rules.push({
        test: extExp,
        use: [
            localLoader('yaml'),
        ],
    });

    return config;
};

