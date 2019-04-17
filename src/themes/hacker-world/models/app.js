const namespace = 'app';

export default {
    namespace,

    state: {
        curPath: undefined,
    },

    statechart: {
        initial: 'inactive',

        context: {
        },

        states: {
            uninit: {
                on: {
                    start: 'loading',
                },
            },
            loading: {
                on: {
                    loaded: 'running',
                    error: 'aberrant',
                },
            },
            running: {
                on: {
                    TOGGLE: 'inactive',
                },
            },
            aberrant: {
            },
        },
    },

    reducers: {
        setCurPath(state, {payload: curPath}) {
            return {...state, curPath};
        },
    },

    effects: {
        f: async () => {
        },
    },
};
