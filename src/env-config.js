/* eslint-env node */
import {get} from 'lodash';

const genEnvConfig = () => {
    const envs = {};
    let setEnv;
    if (typeof window === 'undefined') {
        // server
        setEnv = (name, path = name, defa) => {
            envs[name] = get(process.env, path);
            if (envs[name] === undefined && defa !== undefined) {
                envs[name] = defa;
            }
        };

        setEnv('SERVER_PROTOCOL', 'PROTOCOL', 'http:');
        setEnv('SERVER_HOST', 'HOST', 'localhost');
        setEnv('SERVER_PORT', 'PORT');
        setEnv('SERVER_NODE_ENV', 'NODE_ENV');
    } else {
        // client
        Object.assign(envs, window.env);
    }

    return envs;
};
const envConf = genEnvConfig();

export {envConf};
