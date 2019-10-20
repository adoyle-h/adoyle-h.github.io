'use strict';

const Path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('rollup-plugin-node-resolve');
const url = require('rollup-plugin-url');
const svgr = require('@svgr/rollup').default;
const autoExternal = require('rollup-plugin-auto-external');
const loadz0r = require('rollup-plugin-loadz0r');

const globals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'styled-components': 'styled',
    'lodash': '_',
};

const commonConfig = (pkg) => (custom) => ({
    context: 'module',
    input: pkg['main.src'],
    output: custom.output,
    plugins: [
        ...(custom.plugins || []),
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
            // namedExports: {
            //     'node_modules/@adoyle.me/website-basics': ['ThemeApp'],
            //     '@adoyle.me/website-basics': ['ThemeApp'],
            //     '/Users/adoyle/Workspace/FE/adoyle-h.github.io/packages/basics/build/index.umd.js': ['ThemeApp'],
            //     'basics': ['ThemeApp'],
            //     '../basics/build/index.umd.js': ['ThemeApp'],
            // },
        }),
    ],
});

const parentPath = Path.dirname(module.parent.parent.filename);

module.exports = ({
    pkg,
    // useDynamicImport = true,
}) => [
    commonConfig(pkg)({
        output: [
            {
                // file: pkg.main,
                dir: Path.dirname(pkg.main),
                entryFileNames: Path.basename(pkg.main),
                chunkFileNames: 'chunk-[name]-[hash].[format].js',
                format: 'cjs',
                sourcemap: true,
                // globals,
            },
        ],
        plugins: [
            autoExternal({
                packagePath: Path.resolve(parentPath, 'package.json'),
            }),
        ],
    }),

    commonConfig(pkg)({
        output: [
            {
                // file: pkg.browser,
                dir: Path.dirname(pkg.browser),
                entryFileNames: Path.basename(pkg.browser),
                chunkFileNames: 'chunk-[name]-[hash].[format].js',
                format: 'umd',
                sourcemap: true,
                name: pkg['module.var'],
                globals,
            },
            {
                // file: pkg.module,
                dir: Path.dirname(pkg.module),
                entryFileNames: Path.basename(pkg.module),
                chunkFileNames: 'chunk-[name]-[hash].[format].js',
                format: 'es',
                sourcemap: true,
                name: pkg['module.var'],
                globals,
            },
        ],
        plugins: [
            peerDepsExternal(),
        ],
    }),
];
