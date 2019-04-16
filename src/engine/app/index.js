import {Machine, interpret} from 'xstate';
import {useTranslation} from 'react-i18next';
import siteConfig from 'src/site';
import {i18n} from 'src/i18n';
import {envConf} from 'src/env-config';

class App {
    siteConfig = siteConfig;

    i18n = {
        i18n,
    };

    models = {};
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
        if (typeof window !== 'undefined') window.app = this;
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
        i18n.changeLanguage(lang);
    }
}

const app = new App();

export {App, app};
