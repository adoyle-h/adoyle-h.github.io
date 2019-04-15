/* eslint-disable */
import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import loadable from '@loadable/component';
import siteConfig from 'src/site';
import Loading from 'components/loading';
import routerConfig from './config.yaml';

const {theme} = siteConfig;

const createRoute = (config) => {
    const {path, page, themeComp, themePage} = config;

    let importComp;
    if (themePage) {
        importComp = import(`../themes/${theme}/pages/${themePage}`);
    } else if (themeComp) {
        importComp = import(`../themes/${theme}/${themeComp}`);
    } else if (page) {
        /**
         * FML https://github.com/webpack/webpack/tree/HEAD@%7B2019-01-03T01:19:40Z%7D
         */
        importComp = import(`../pages/${page}`);
    } else {
        throw new Error('page or themeComp must be set');
    }
    const comp = loadable(() => importComp, {fallback: Loading});
    return <Route key={path} exact path={path} component={comp} />;
}

const createNoMatchRoute = () => {
    const comp = loadable(() => import(`../themes/${theme}/pages/${routerConfig.noMatch.themePage}`), {fallback: Loading});
    return <Route component={comp} />;
};

export default () => <Fragment>
    <Switch>
        {routerConfig.routes.map(createRoute)}
        {createNoMatchRoute()}
    </Switch>
</Fragment>;
