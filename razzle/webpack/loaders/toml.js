'use strict';

const {getOptions} = require('loader-utils');
const Toml = require('toml');
const Logger = require('../../logger');

const _logger = Logger.create({label: 'webpack:plugin:toml'});

module.exports = function(source) {
    // eslint-disable-next-line no-unused-expressions
    this.cacheable && this.cacheable();

    try {
        const _options = getOptions(this) || {};
        const json = Toml.parse(source);
        const str = JSON.stringify(json);
        return `module.exports = ${str};`;
    } catch(err) {
        this.emitError(err);
        return null;
    }
};
