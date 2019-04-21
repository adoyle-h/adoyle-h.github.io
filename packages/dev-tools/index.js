'use strict';

const Path = require('path');

const getPath = (...args) => Path.join(__dirname, ...args);

exports.getWebpackLoaderPath = (loaderName) => getPath('webpack/loaders', loaderName);
exports.getWebpackPluginPath = (loaderName) => getPath('webpack/plugins', loaderName);
exports.getRazzlePluginPath = (pluginName) => getPath('razzle-plugins', pluginName);
exports.getRazzlePlugin = (pluginName) => require(exports.getRazzlePluginPath(pluginName));

exports.makeRollup = require('./rollup/rollup.config.js');
