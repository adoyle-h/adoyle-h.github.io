import {injectGlobal} from 'emotion';
import './typography.css';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
    html {
        height: 100%;
        box-sizing: border-box;
        font-family: 'PingFang SC', 'Helvetica Neue', 'Microsoft YaHei', Helvetica, SimSun, sans-serif;
    }

    body {
        min-height: 100%;
        height: auto;
        display: flex;
    }

    #root {
        width: 100%;
    }

    *,
    *::after,
    *::before {
        box-sizing: inherit;
    }

    a {
        font: inherit;
        color: inherit;
        text-decoration: inherit;
    }
`;
