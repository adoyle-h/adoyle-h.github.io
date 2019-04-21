'use strict';

const {getRazzlePlugin} = require('@adoyle.me/dev-tools');
const Path = require('path');
const {aliases} = require('./aliases');

const getPath = (path) => Path.join(__dirname, path);

// Razzle default config at node_modules/razzle/config/createConfig.js


const ignoreCompileJSInNodeModules = (config) => {
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


module.exports = {
    plugins: [
        ignoreCompileJSInNodeModules,
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
