'use strict';

const Toml = require('toml');
const {promisify} = require('util');
const Path = require('path');
const FS = require('fs');
const fg = require('fast-glob');
const Logger = require('../../logger');

const logger = Logger.create({label: 'webpack:plugin:i18n'});


const readFile = promisify(FS.readFile);
const writeFile = promisify(FS.writeFile);

module.exports = class I18nPlugin {
    constructor(opts) {
        this.opts = opts;
    }

    apply(compiler) {
        compiler.hooks.done.tapPromise('I18nPlugin', async () => {
            const {inputDir, inputExt, outputDir} = this.opts;
            const inputGlob = Path.join(inputDir, `*${inputExt}`);

            logger.debug('inputGlob=%s outputDir=%s', inputGlob, outputDir);
            FS.mkdirSync(outputDir, {recursive: true});

            //  entries = [
            //   'src/i18n/common.toml',
            //   'src/i18n/en.toml',
            //   'src/i18n/zh-CN.toml',
            //   'src/themes/hacker-world/i18n/zn-CN.toml'
            //  ]
            const entries = await fg(inputGlob);
            logger.debug('entries=%O', entries);

            const tasks = {};

            await entries.map(async (path) => {
                const tomlStr = await readFile(path);
                const json = Toml.parse(tomlStr);

                const lang = Path.basename(path, inputExt);
                tasks[lang] = Object.assign(tasks[lang] || {}, json);
            });

            await Object.keys(tasks).map((lang) => {
                const jsonStr = JSON.stringify(tasks[lang]);
                const outputPath = Path.join(outputDir, `${lang}.json`);
                return writeFile(outputPath, jsonStr);
            });
        });
    }
};
