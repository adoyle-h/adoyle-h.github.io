/* eslint-env node */
import {get} from 'lodash';

const genEnvConfig = () => {
    const envs = {};
    let setEnv;
    if (typeof window === 'undefined') {
        // server
        setEnv = (name, path, defaults) => {
            envs[name] = get(process.env, path);
            if (envs[name] === undefined && defaults !== undefined) {
                envs[name] = defaults;
            }
        };

        setEnv('SERVER_PROTOCOL', 'PROTOCOL', 'http:');
        setEnv('SERVER_HOST', 'HOST', 'localhost');
        setEnv('SERVER_PORT', 'PORT');
        setEnv('SERVER_NODE_ENV', 'NODE_ENV');
        setEnv('BUILD_TARGET', 'BUILD_TARGET');
    } else {
        // client
        Object.assign(envs, window.env);
    }

    return envs;
};
const envConf = genEnvConfig();

export {envConf};
