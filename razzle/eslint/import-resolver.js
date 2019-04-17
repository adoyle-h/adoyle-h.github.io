'use strict';

const FS = require('fs');
const util = require('lodash');
const Path = require('path');
const {aliases} = require('../plugins/alias');
const Logger = require('../logger');

const logger = Logger.create({label: 'eslint:import-resolver'});

exports.interfaceVersion = 2;

const extentions = ['.js', '.jsx'];
const regexList = [];
util.forOwn(aliases, (dirPath, keyword) => {
    regexList.push({regex: new RegExp(`^${keyword}`), dirPath});
});

logger.debug('regexList=%O', regexList);

exports.resolve = (source, file, _config) => {
    let path;
    // eslint-disable-next-line array-callback-return
    regexList.some(({regex, dirPath}) => {
        logger.debug('source=%s dirPath=%s', source, dirPath);
        if (!source.match(regex)) return false;

        const _path = Path.join(dirPath, source.replace(regex, ''));
        logger.debug('_path=%s', _path);

        try {
            const realPath = _path;
            const stat = FS.statSync(realPath);

            if (stat.isFile()) {
                path = realPath;
                return true;
            } else if (stat.isDirectory()) {
                extentions.some((ext) => {
                    const realPath = `${_path}${ext}`;
                    if (FS.existsSync(realPath)) {
                        path = realPath;
                        return true;
                    } else {
                        return false;
                    }
                });

                if (!path) {
                    extentions.map((ext) => `/index${ext}`).some((ext) => {
                        const realPath = `${_path}${ext}`;
                        if (FS.existsSync(realPath)) {
                            path = realPath;
                            return true;
                        } else {
                            return false;
                        }
                    });
                }
            } else {
                logger.error('Unknown file stat. realPath=%s stat=%O', realPath, stat);
                return false;
            }

            if (path) return true;
            else return false;
        } catch(_error) {
            extentions.some((ext) => {
                const realPath = `${_path}${ext}`;
                if (FS.existsSync(realPath)) {
                    path = realPath;
                    return true;
                } else {
                    return false;
                }
            });
        }
    });

    logger.debug('[file=%s] path=%s', file, path);
    if (path) {
        return {found: true, path};
    } else {
        return {found: false};
    }
};
