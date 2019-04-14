'use strict';

const {getOptions} = require('loader-utils');
const yaml = require('js-yaml');
const Logger = require('../../logger');

const _logger = Logger.create({label: 'webpack:plugin:yaml', noConsole: false});

module.exports = function(source) {
    // eslint-disable-next-line no-unused-expressions
    this.cacheable && this.cacheable();

    try {
        const options = getOptions(this) || {};
        const safe = options.safe !== false;
        const json = safe ? yaml.safeLoad(source) : yaml.load(source);
        const str = JSON.stringify(json);
        return `module.exports = ${str};`;
    } catch(err) {
        this.emitError(err);
        return null;
    }
};
