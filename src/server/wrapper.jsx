import http from 'http';
import Logger from './logger';

const logger = Logger.create({
    label: 'server:wrapper',
    console: true,
});

export default (module) => {
    let app = require('./index.jsx').default;

    const server = http.createServer(app);

    let currentApp = app;

    server.listen(process.env.PORT, (error) => {
        if (error) {
            logger.error('Failed to start server. Error Message=%s', error.message);
            logger.error(error.stack);
        }

        logger.info('🚀 started');
    });


    if (module.hot) {
        logger.info('✅  Server-side HMR Enabled!');

        module.hot.accept('./index.jsx', () => {
            logger.info('🔁  HMR Reloading server...');

            try {
                app = require('./index.jsx').default;
                server.removeListener('request', currentApp);
                server.on('request', app);
                currentApp = app;
            } catch(error) {
                logger.error('Failed to HMR Reloading. error=', error);
            }
        });
    }
};
