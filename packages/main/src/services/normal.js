import axios from 'axios';
import util from 'lodash';
import assert from 'lib/assert';
import logger from 'lib/logger';
import BaseService from './base';

class NormalService extends BaseService {
    /**
     * @param {Object} config
     * @param {Object|Boolean} config.useMock
     *   If it is an Object, it is a map to toggle mock for each action, such as {'action-name': Boolean}.
     *   Otherwise a Boolean as toggle for all action.
     */
    constructor(config) {
        super(config);
        this.useMock = config.useMock || {};
    }

    /**
     * @param {Object} args  Same to axios(config) https://github.com/axios/axios#axiosconfig
     * @param {String} args.method
     * @param {String} args.path    Alias to args.url
     * @param {Obejct} [args.query] Alias to args.params
     * @param {Boolean} [args.useMock=false]
     */
    async request(args) {
        const {method} = args;
        const path = args.path || args.url;
        const query = args.query || args.params;
        const rc = {
            ...args,
            url: path,
            params: query,
        };

        let useMock = args.useMock || this.useMock;
        if (useMock === true || useMock[`${method}-${path}`] === true) {
            useMock = true;
        } else {
            useMock = false;
        }

        if (useMock) {
            rc.baseURL = window.browserConf.api.mockBaseURL;
        } else {
            rc.baseURL = window.browserConf.api.baseURL;
        }

        logger.debug('[Service] send request with config=%O', rc);
        return axios(rc);
    }

    checkStatus(res) {
        // const {data: body} = res;
        // const {code} = body;
    }

    async getRaw(args) {
        assert(util.isPlainObject(args), 'arguments must be a plain object');
        const res = await this.request({...args, method: 'get'});
        this.checkStatus(res);
        return res;
    }

    async postRaw(args) {
        assert(util.isPlainObject(args), 'arguments must be a plain object');
        const res = await this.request({...args, method: 'post'});
        this.checkStatus(res);
        return res;
    }

    async putRaw(args) {
        assert(util.isPlainObject(args), 'arguments must be a plain object');
        const res = await this.request({...args, method: 'put'});
        this.checkStatus(res);
        return res;
    }

    async deleteRaw(args) {
        assert(util.isPlainObject(args), 'arguments must be a plain object');
        const res = await this.request({...args, method: 'delete'});
        this.checkStatus(res);
        return res;
    }

    async get(args) {
        const res = await this.getRaw(args);
        return res.data.data;
    }

    async post(args) {
        const res = await this.postRaw(args);
        return res.data.data;
    }

    async put(args) {
        const res = await this.putRaw(args);
        return res.data.data;
    }

    async delete(args) {
        const res = await this.deleteRaw(args);
        return res.data.data;
    }
}

const normalService = new NormalService({
    useMock: window.browserConf.service.normal.useMock,
});

export default normalService;
