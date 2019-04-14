import URI from 'urijs';
import pathToRegexp from 'path-to-regexp';
import routerMap from 'src/router-map';

class UrlInfo {
    // eslint-disable-next-line no-shadow
    constructor({fields, routerMap, queryFields}) {
        this.routers = routerMap.map((router) => ({
            ...router,
        }));
        this.fields = fields;
        this.queryFields = queryFields;

        const listeners = fields.reduce((map, field) => {
            map[field] = [];
            return map;
        }, {});

        this.routers.forEach((router) => {
            const {path} = router;
            const keys = [];
            const re = pathToRegexp(path, keys);
            router.keys = keys;
            router.re = re;

            keys.forEach(({name: field}, index) => {
                if (fields.includes(field)) {
                    listeners[field].push({
                        field,
                        index,
                        re,
                        keys,
                    });
                }
            });
        });

        this.checkLiseners(listeners);
        this.listeners = listeners;
    }

    getMatchedRouter(pathname) {
        return this.routers.find((router) => {
            return router.re.exec(pathname) !== undefined;
        });
    }

    checkLiseners(listeners) {
        const {fields} = this;
        fields.forEach((field) => {
            const l = listeners[field];
            if (l.length === 0) {
                throw new Error(`No router have the field "${field}"`);
            }
        });
    }

    getListeners(field) {
        const listeners = this.listeners[field];
        if (!listeners) throw new Error(`not found listener for "${field}"`);
        return listeners;
    }

    get(field, opts = {}) {
        const {checkResult = true} = opts;

        if (this.fields.includes(field) === false) {
            throw new Error(`The field "${field}" is not subscribed in UrlInfo.fields`);
        }

        const {pathname} = window.location;
        const listeners = this.getListeners(field);
        let result;
        listeners.some(({index, re}) => {
            const results = re.exec(pathname);
            if (results) {
                result = results[index + 1];
            }

            return !!results;
        });

        if (checkResult === true) {
            if (result === undefined) throw new Error(`No matched router for field ${field}`);
        }
        return result;
    }

    getQueryField(field, opts = {}) {
        const {checkResult = true} = opts;

        if (this.queryFields.includes(field) === false) {
            throw new Error(`The field "${field}" is not subscribed in UrlInfo.queryFields`);
        }

        const query = URI.parseQuery(window.location.search);
        const result = query[field];

        if (checkResult === true) {
            if (result === undefined) throw new Error(`The value of query field "${field}" is undefined`);
        }
        return result;
    }
}

const urlInfo = new UrlInfo({
    routerMap,
    fields: [],
    queryFields: [],
});

export default urlInfo;
