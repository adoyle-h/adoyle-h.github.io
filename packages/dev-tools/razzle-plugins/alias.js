'use strict';

const Logger = require('../logger');

const logger = Logger.create({label: 'razzle:plugin:alias'});

module.exports = (config, _env, _webpack, options) => {
    const {aliases} = options;
    logger.debug('aliases=%O', aliases);

    if (config.resolve === undefined) config.resolve = {};
    const {resolve} = config;

    if (resolve.alias === undefined) resolve.alias = {};
    Object.assign(resolve.alias, aliases);

    return config;
};
