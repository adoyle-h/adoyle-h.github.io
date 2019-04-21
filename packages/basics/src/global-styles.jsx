import {createGlobalStyle} from 'styled-components';
import 'normalize.css';

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
        box-sizing: border-box;
        font-family: 'PingFang SC', 'Helvetica Neue', 'Microsoft YaHei', Helvetica, SimSun, sans-serif;
    }

    body {
        min-height: 100%;
        height: auto;
        display: flex;
        background-color: white;
    }

    #root {
        width: 100%;
    }

    *,
    *::after,
    *::before {
        box-sizing: inherit;
    }
`;
