'use strict';

module.exports = (config, env) => {
    const {target, dev} = env;

    if (target === 'web') {
        // client only
    }

    if (target === 'server') {
        // server only
    }

    if (dev) {
        // dev only
    } else {
        // prod only
    }

    // Do some stuff...
    return config;
};
