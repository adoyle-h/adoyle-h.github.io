/* eslint-disable */
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import loadable from '@loadable/component';
import siteConfig from 'src/site';
import Loading from 'components/loading';
import routerConfig from './config.yaml';

const {theme} = siteConfig;

// const createRoute = (config) => {
//     const {path, component} = config;
//     const comp = loadable(() => import(`../${component}`), {fallback: Loading});
//     return <Route key={path} exact path={path} component={comp} />;
// };

// const createThemeRoute = (config) => {
//     const {path, component} = config;
//     const comp = loadable(() => import(`../themes/${theme}/${component}`), {fallback: Loading});
//     return <Route key={path} exact path={path} component={comp} />;
// };

const _createRoute = (importComp) => (config) => {
    const {path} = config;
    const comp = loadable(() => importComp(config), {fallback: Loading});
    return <Route key={path} exact path={path} component={comp} />;
};

// const createThemeRoute = _createRoute(({component}) => import('../src/pages/magic-img'));
// const createRoute = _createRoute(({component}) => import('../src/pages/magic-img'));

// const createNoMatchRoute = () => {
//     const comp = loadable(() => import('../src/pages/magic-img'), {fallback: Loading});
//     return <Route component={comp} />;
// };

const createThemeRoute = _createRoute(({component}) => import(`../themes/${theme}/${component}`));
const createRoute = _createRoute(({component}) => import(`../${component}`));

const createNoMatchRoute = () => {
    const comp = loadable(() => import(`../themes/${theme}/${routerConfig.theme.noMatch.component}`), {fallback: Loading});
    return <Route component={comp} />;
};

export default () => <Switch>
    {routerConfig.routes.map(createRoute)}
    {routerConfig.theme.routes.map(createThemeRoute)}
    {createNoMatchRoute()}
</Switch>;
