class BaseService {
    /**
     * @property {Object} config
     */
    constructor(config) {
        this.config = config;
    }

    // eslint-disable-next-line no-unused-vars,no-empty-function
    async request({url, params, data}) {
    }
}

export default BaseService;
