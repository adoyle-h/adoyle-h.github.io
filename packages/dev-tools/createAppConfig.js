/* eslint-disable no-console */
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production';

// Ensure environment variables are read.
require('razzle/config/env');
const paths = require('razzle/config/paths');
const createConfig = require('razzle/config/createConfig');

const webpack = require('webpack');
const fs = require('fs-extra');
const chalk = require('chalk');
const printErrors = require('razzle-dev-utils/printErrors');
const logger = require('razzle-dev-utils/logger');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const measureFileSizesBeforeBuild =
    FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// Helper function to copy public directory to build/public
function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuildPublic, {
        dereference: true,
        filter: (file) => file !== paths.appHtml,
    });
}

// Wrap webpack compile in a try catch.
function compile(config, cb) {
    let compiler;
    try {
        compiler = webpack(config);
    } catch(e) {
        printErrors('Failed to compile.', [e]);
        process.exit(1);
    }
    compiler.run((err, stats) => {
        cb(err, stats);
    });
}

function build(previousFileSizes) {
    // Check if razzle.config.js exists
    let razzle = {};
    try {
        razzle = require(paths.appRazzleConfig);
        /* eslint-disable no-empty */
    } catch(ignoreErr) {}
    /* eslint-enable no-empty */

    if (razzle.clearConsole === false || Boolean(razzle.host) || Boolean(razzle.port)) {
        logger.warn(`Specifying options \`port\`, \`host\`, and \`clearConsole\` in razzle.config.js has been deprecated.
Please use a .env file instead.

${razzle.host !== 'localhost' && `HOST=${razzle.host}`}
${razzle.port !== '3000' && `PORT=${razzle.port}`}
`);
    }

    // Create our production webpack configurations and pass in razzle options.
    const clientConfig = createConfig('web', 'prod', razzle, webpack);

    process.noDeprecation = true; // turns off that loadQuery clutter.

    console.log('Creating an optimized production build...');
    console.log('Compiling client...');
    // First compile the client. We need it to properly output assets.json (asset
    // manifest file with the correct hashes on file names BEFORE we can start
    // the server compiler.
    return new Promise((resolve, reject) => {
        compile(clientConfig, (err, clientStats) => {
            if (err) {
                reject(err);
            }
            const clientMessages = formatWebpackMessages(
                clientStats.toJson({}, true)
            );
            if (clientMessages.errors.length) {
                return reject(new Error(clientMessages.errors.join('\n\n')));
            }
            if (
                process.env.CI &&
                (typeof process.env.CI !== 'string' ||
                    process.env.CI.toLowerCase() !== 'false') &&
                clientMessages.warnings.length
            ) {
                console.log(
                    chalk.yellow(
                        '\nTreating warnings as errors because process.env.CI = true.\n' +
                        'Most CI servers set it automatically.\n'
                    )
                );
                return reject(new Error(clientMessages.warnings.join('\n\n')));
            }

            console.log(chalk.green('Compiled client successfully.'));

            resolve({
                stats: clientStats,
                previousFileSizes,
                warnings: Object.assign(
                    {},
                    clientMessages.warnings,
                ),
            });
        });
    });
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.appBuildPublic)
    .then((previousFileSizes) => {
        // Remove all content but keep the directory so that
        // if you're in it, you don't end up in Trash
        fs.emptyDirSync(paths.appBuild);

        // Merge with the public folder
        copyPublicFolder();

        // Start the webpack build
        return build(previousFileSizes);
    })
    .then(
        ({stats, previousFileSizes, warnings}) => {
            if (warnings.length) {
                console.log(chalk.yellow('Compiled with warnings.\n'));
                console.log(warnings.join('\n\n'));
                console.log(
                    `\nSearch for the ${
                        chalk.underline(chalk.yellow('keywords'))
                    } to learn more about each warning.`
                );
                console.log(
                    `To ignore, add ${
                        chalk.cyan('// eslint-disable-next-line')
                    } to the line before.\n`
                );
            } else {
                console.log(chalk.green('Compiled successfully.\n'));
            }
            console.log('File sizes after gzip:\n');
            printFileSizesAfterBuild(stats, previousFileSizes, paths.appBuild);
            console.log();
        },
        (err) => {
            console.log(chalk.red('Failed to compile.\n'));
            console.log(`${err.message || err}\n`);
            process.exit(1);
        }
    );
