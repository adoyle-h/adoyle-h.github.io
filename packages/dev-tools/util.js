'use strict';

const Path = require('path');

exports.localPlugin = (name) => require(Path.join(__dirname, 'razzle/plugins', name));

exports.localLoader = (name) => require.resolve(Path.join(__dirname, 'webpack/loaders', name));
