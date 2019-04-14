'use strict';

const Factory = require('@adoyle.me/winston-logger');

module.exports = Factory.new({
    files: [
        {
            level: 'error',
            filename: 'logs/razzle/error.log',
        },
        {
            level: 'debug',
            filename: 'logs/razzle/all.log',
        },
    ],
});
