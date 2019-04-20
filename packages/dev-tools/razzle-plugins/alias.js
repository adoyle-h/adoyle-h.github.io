'use strict';

const Logger = require('../logger');

const logger = Logger.create({label: 'razzle:plugin:alias'});

module.exports = (config, _env, _webpack, options) => {
    const {aliases} = options;
    logger.debug('aliases=%O', aliases);
    Object.assign(config.resolve.alias, aliases);
    return config;
};
