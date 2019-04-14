import React from 'react';
import {Switch, Route} from 'react-router-dom';
import loadable from '@loadable/component';
import siteConfig from 'src/site';
import Loading from '../components/loading';
import routerConfig from './config.yaml';

const {theme} = siteConfig;

const createRoute = (config) => {
    const {path, component} = config;
    // const compFilePath = `../themes/${theme}/${component}/index.jsx`;
    const comp = loadable(() => import(`../themes/${theme}/${component}`), {fallback: Loading});
    return <Route key={path} exact path={path} component={comp} />;
};

const createRoutes = () => routerConfig.routes.map(createRoute);

const createNoMatchRoute = () => {
    const comp = loadable(() => import(`../themes/${theme}/${routerConfig.noMatch.component}`), {fallback: Loading});
    return <Route component={comp} />;
};

export default () => <Switch>
    {createRoutes()}
    {createNoMatchRoute()}
</Switch>;
