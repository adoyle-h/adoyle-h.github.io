'use strict';

const {aliases} = require('./aliases');

module.exports = {
    root: true,
    extends: [
        "adoyle-style/browser",
        "adoyle-style/browser/es6",
        "adoyle-style/plugin/import",
        "adoyle-style/plugin/jsx-a11y",
        "adoyle-style/plugin/react",
        "adoyle-style/plugin/babel",
    ],
    rules: {
        'no-console': 1,
        'react/prop-types': 0,
        'no-magic-numbers': 0,
    },
    globals: {
        require: false,
    },
    settings: {
        'import/resolver': {
            [require.resolve('@adoyle.me/build-tools/eslint/import-resolver.js')]: {
                aliases,
            }
        }
    }
};
