'use strict';

const {getRazzlePlugin} = require('@adoyle.me/dev-tools');
const Path = require('path');
const {aliases} = require('./aliases');

const getPath = (path) => Path.join(__dirname, path);

// Razzle default config at node_modules/razzle/config/createConfig.js


const _ignoreCompileJSInNodeModules = (config) => {
    const {rules} = config.module;
    const matchTests = [
        '/\\.(js|jsx|mjs)$/',
    ];

    rules.forEach((rule) => {
        if (!rules.test) return;
        const test = rules.test.toString();
        if (matchTests.includes(test)) {
            const {exclude = []} = rule;
            exclude.push(/node_modules/);
            rule.exclude = exclude;
        }
    });
    return config;
};

const _resolveModulesIncludeMyPkgs = (config) => {
    config.resolve.modules.push();
    return config;
};

const _fixCSSIncludeMissingMyPkgs = (config) => {
    const {rules} = config.module;
    const cssRule = rules.find(({test}) => test && test.toString() === '/.css$/');
    if (cssRule) {
        cssRule.include = [
            Path.resolve(__dirname, '../basics/node_modules'),
            Path.resolve(__dirname, '../dark/node_modules'),
            Path.resolve(__dirname, '../win95/node_modules'),
            Path.resolve(__dirname, '../basics'),
            Path.resolve(__dirname, '../dark'),
            Path.resolve(__dirname, '../win95'),
        ];
    }
    return config;
};


module.exports = {
    plugins: [
        // ignoreCompileJSInNodeModules,
        // fixCSSIncludeMissingMyPkgs,
        getRazzlePlugin('yaml'),
        getRazzlePlugin('toml'),
        {
            func: getRazzlePlugin('alias'),
            options: {aliases},
        },
        // last 2nd
        {
            func: getRazzlePlugin('i18n'),
            options: {
                inputDir: getPath('src/**/i18n/'),
                outputDir: getPath('public/static/i18n/'),
            },
        },
        // last
        getRazzlePlugin('debug-config'),
    ],
};
