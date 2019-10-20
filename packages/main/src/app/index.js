import React from 'react';
import ReactDOM from 'react-dom';
import {Machine, interpret} from 'xstate';
import {useTranslation} from 'react-i18next';
import siteConfig from 'src/site-config';
import i18next from 'src/i18n/i18next';
import {envConf} from 'src/env-config';
import {history} from 'libs/history';

class App {
    siteConfig = siteConfig;
    i18next = i18next;
    services = {};
    logger = console;

    version = 'test';
    envs = envConf;

    status = 'loading';
    themeApp = null;
    _UI = null;

    set UI(Comp) {
        this._UI = Comp;
    }

    get UI() {
        return this._UI;
    }

    loadModel({namespace, statechart}) {
        const machine = new Machine({
            id: namespace,
            ...statechart,
        });
        this.models[namespace] = machine;

        const service = interpret(machine)
            .start();
        this.services[namespace] = service;
    }

    injectWindow() {
        if (typeof window === 'undefined') return;
        window.app = this;
    }

    async getThemeApp(name) {
        // @TODO Poor webpack dynamic import
        // const {themeApp} = await import(`@adoyle.me/website-theme-${name}`);
        let m;
        if (name === 'dark') {
            m = await import(`@adoyle.me/website-theme-dark`);
        } else if (name === 'win95') {
            m = await import(`@adoyle.me/website-theme-win95`);
        } else {
            throw new Error(`Invalid theme "${name}"`);
        }
        return m.themeApp;
    }

    async changeThemeApp(name) {
        const {themeApp, logger} = this;
        this.themeApp = await this.getThemeApp(name);
        this.themeApp.injectWindow();

        if (themeApp) {
            themeApp.destroy().catch((error) => {
                logger.error(`Failed to destroy themeApp "${themeApp.name}"`);
                logger.error(`Error Message=${error.message}`);
                logger.error(`Error Stack=${error.stack}`);
            });
        }
    }

    getEnv(name) {
        return this.envs[name];
    }

    get t() {
        const {t} = useTranslation();
        return t;
    }

    getTS(scope) {
        const {t} = useTranslation();
        return (path, ...args) => t(`${scope}.${path}`, ...args);
    }

    changeLanguage(lang) {
        if (typeof window === 'undefined') return;

        const {pathname} = window.location;
        const newPathname = pathname === '/'
            ? `/${lang}`
            : pathname.replace(/^\/([a-zA-Z0-9_-]+)(\/.+)?$/, (_, _p1, p2 = '') => {
                return `/${lang}${p2}`;
            });
        if (pathname === newPathname) return;

        history.push(newPathname);
        i18next.changeLanguage(lang);
    }

    async start() {
        const app = this;
        app.injectWindow();
        await app.changeThemeApp(siteConfig.theme);
        app.openAxe();
    }

    openAxe() {
        const app = this;
        if (app.getEnv('SERVER_NODE_ENV') !== 'production'
            && app.getEnv('BUILD_TARGET') === 'client'
        ) {
            const axe = require('react-axe');
            axe(React, ReactDOM, 1000);
        }
    }
}

const app = new App();

app.start();

export {App, app};
