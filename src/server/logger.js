import Factory from '@adoyle.me/winston-logger';

export default Factory.new({
    files: [
        {
            level: 'error',
            filename: 'logs/server/error.log',
        },
        {
            level: 'debug',
            filename: 'logs/server/all.log',
        },
    ],
});
