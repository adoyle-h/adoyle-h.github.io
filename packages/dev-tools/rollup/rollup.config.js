'use strict';

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('rollup-plugin-node-resolve');
const url = require('rollup-plugin-url');
const svgr = require('@svgr/rollup').default;

const globals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'styled-components': 'styled',
    'lodash': '_',
};

module.exports = (pkg) => ({
    context: 'module',
    input: pkg['main.src'],
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            globals,
        },
        {
            file: pkg.browser,
            format: 'umd',
            sourcemap: true,
            name: pkg['module.var'],
            globals,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            name: pkg['module.var'],
            globals,
        },
    ],
    plugins: [
        peerDepsExternal(),
        url(),
        svgr(),
        babel({
            configFile: require.resolve('../babel.config.js'),
        }),
        resolve({
            mainFields: ['module', 'main'],

            // some package.json files have a "browser" field which specifies
            // alternative files to load for people bundling for the browser. If
            // that's you, either use this option or add "browser" to the
            // "mainfields" option, otherwise pkg.browser will be ignored
            browser: false, // Default: false
            extensions: ['.mjs', '.js', '.jsx', '.json'],

            // customResolveOptions: {
            //     moduleDirectory: 'js_modules'
            // },
        }),
        commonjs({
            include: /node_modules/,
            namedExports: {
                'node_modules/@adoyle.me/website-basics': ['ThemeApp'],
                '@adoyle.me/website-basics': ['ThemeApp'],
                '/Users/adoyle/Workspace/FE/adoyle-h.github.io/packages/basics/build/index.umd.js': ['ThemeApp'],
                'basics': ['ThemeApp'],
                '../basics/build/index.umd.js': ['ThemeApp'],
            },
        }),
    ],
});
