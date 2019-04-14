import i18n from 'i18next';
// import XHRBackend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import siteConfig from 'src/site';
import en from './en.toml';
import zhCN from './zh-CN.toml';

const resources = {};
const addResource = (lang, resource) => {
    resources[lang] = {
        translation: resource,
    };
};
addResource('en', en);
addResource('zh-CN', zhCN);

i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    // .use(XHRBackend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources,
        lng: siteConfig.language,
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        backend: {
            loadPath: '/i18n/{{lng}}/{{ns}}.json',
        },
    });

export {i18n, resources};
