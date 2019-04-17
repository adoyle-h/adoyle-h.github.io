import {Machine, interpret} from 'xstate';
import {useTranslation} from 'react-i18next';
import siteConfig from 'src/site-config';
import i18next from 'src/i18n/i18next';
import {envConf} from 'src/env-config';
import {history} from 'src/engine/hisotry';

class App {
    siteConfig = siteConfig;
    i18next = i18next;
    services = {};

    version = 'test';
    envs = envConf;

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

    async injectThemeApp() {
        const {themeApp} = await import(`../../themes/${siteConfig.theme}/theme-app`);
        themeApp.injectWindow();
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
        this.injectWindow();
        await this.injectThemeApp();
    }
}

const app = new App();

export {App, app};
