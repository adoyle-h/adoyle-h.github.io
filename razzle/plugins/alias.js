'use strict';

const Path = require('path');
const Logger = require('../logger');

const logger = Logger.create({label: 'razzle:plugin:alias'});

function absPath(...relativePaths) {
    return Path.join(__dirname, '../../src', ...relativePaths);
}

const aliases = {
    src: absPath('.'),
    components: absPath('components'),
    models: absPath('models'),
    services: absPath('services'),
    // pages: absPath('pages'),
    // styles: absPath('styles'),
    assets: absPath('assets'),
    util: absPath('util'),
    lib: absPath('lib'),

    app$: absPath('engine/app'),
    consts$: absPath('consts'),
    assert$: absPath('lib', 'assert'),
    logger$: absPath('lib', 'logger'),
    helper$: absPath('lib', 'helper'),
    request$: absPath('lib', 'request'),
};

module.exports = exports = (config) => {
    Object.assign(config.resolve.alias, aliases);
    return config;
};

exports.aliases = aliases;
logger.debug('exports.aliases=%O', aliases);
