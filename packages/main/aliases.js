'use strict';

const Path = require('path');

function absPath(...relativePaths) {
    return Path.join(__dirname, 'src', ...relativePaths);
}

exports.aliases = {
    src: absPath('.'),
    components: absPath('components'),
    models: absPath('models'),
    services: absPath('services'),
    pages: absPath('pages'),
    // styles: absPath('styles'),
    assets: absPath('assets'),
    util: absPath('util'),
    libs: absPath('libs'),

    app$: absPath('app'),
    consts$: absPath('consts'),
    assert$: absPath('lib', 'assert'),
    logger$: absPath('lib', 'logger'),
    helper$: absPath('lib', 'helper'),
    request$: absPath('lib', 'request'),
};
