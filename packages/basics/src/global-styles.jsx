import {normalize} from 'styled-normalize'
import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    ${normalize}

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
