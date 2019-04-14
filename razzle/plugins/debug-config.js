'use strict';

const Logger = require('../logger');

const logger = Logger.create({
    label: 'razzle:plugin:debug-config',
    depth: null,
});

module.exports = (config, env) => {
    const {target, dev} = env;

    logger.debug('target=%O, dev=%O, config=%O', target, dev, config);
    return config;
};
