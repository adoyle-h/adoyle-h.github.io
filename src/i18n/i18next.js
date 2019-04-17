import i18next from 'i18next';
import XHRBackend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import axios from 'axios';
import {envConf} from 'src/env-config';
// import siteConfig from 'src/site-config';

// import en from './en.toml';
// import zhCN from './zh-CN.toml';

// const resources = {};
// const addResource = (lang, resource) => {
//     resources[lang] = {
//         translation: resource,
//     };
// };
// addResource('en', en);
// addResource('zh-CN', zhCN);

export const i18nextOpts = {
    debug: false,

    // resources,

    // lng: siteConfig.defaultLanguage,

    /**
     * i18n will load three lang files zh-CN/zh/en by default.
     * So I tried to change the fallbackLng to prevent load zh file, but nothing work.
     *
     * - https://github.com/i18next/i18next/issues/940
     * - https://www.i18next.com/principles/fallback#locals-resolving
     */
    fallbackLng: ['en'],

    react: {
        /**
         * Refer below links:
         * - https://github.com/i18next/react-i18next/issues/715
         * - https://github.com/i18next/react-i18next/issues/735#issuecomment-463572416
         */
        useSuspense: false,
    },

    detection: {
        order: ['path', 'querystring', 'cookie', 'localStorage', 'navigator', 'subdomain', 'htmlTag'],
    },

    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },

    backend: {
        // axios has parsed body
        parse: (data) => data,
        ajax: (url, _options, callback) => {
            axios.get(url, {
                baseURL: `${envConf.SERVER_PROTOCOL}//${envConf.SERVER_HOST}:${envConf.SERVER_PORT}`,
            })
                .then((res) => callback(res.data, res))
                .catch((err) => callback(null, err.response ? err.response : {status: 500}));
        },
        loadPath: '/static/i18n/{{lng}}.json',
        // loadPath: (lng, ns) => `/public/static/i18n/${lng}/${ns}.json`,
    },
};

i18next
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(XHRBackend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init(i18nextOpts);

export default i18next;
