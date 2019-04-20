import {createMemoryHistory, createBrowserHistory} from 'history';

// eslint-disable-next-line import/no-mutable-exports
let history;

if (typeof window === 'undefined') {
    history = createMemoryHistory();
} else {
    history = createBrowserHistory();
}

export {history};
