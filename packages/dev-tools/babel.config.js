/* eslint-disable quotes,strict */
module.exports = {
    "exclude": /node_modules/,
    "plugins": [
        // "@babel/plugin-external-helpers",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
    ],
    "presets": [
        ["@babel/env", {
            "modules": false,
        }],
        "@babel/preset-react",
    ],
};
