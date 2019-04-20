import {createGlobalStyle} from 'styled-components';
import theme from 'styled-theming';
import 'normalize.css';
import './typography.css';

const bgColor = theme('theme', {
    'hack-world': 'red',
});

export default createGlobalStyle`
    html {
        height: 100%;
        box-sizing: border-box;
        font-family: 'PingFang SC', 'Helvetica Neue', 'Microsoft YaHei', Helvetica, SimSun, sans-serif;
    }

    body {
        min-height: 100%;
        height: auto;
        display: flex;
        background-color: ${bgColor};
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
