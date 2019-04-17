import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import loadable from '@loadable/component';
import siteConfig from 'src/site-config';
import i18next from 'src/i18n/i18next';
import Loading from 'components/loading';
import routerConfig from './config.yaml';

const {theme} = siteConfig;

const createRoute = (match) => (config) => {
    const {page, themePage} = config;
    const path = match.path === '/' ? '/' : `${match.path}${config.path}`;

    let importComp;
    if (themePage) {
        importComp = import(`../themes/${theme}/pages/${themePage}`);
    } else if (page) {
        /**
         * FML https://github.com/webpack/webpack/tree/HEAD@%7B2019-01-03T01:19:40Z%7D
         */
        importComp = import(`../pages/${page}`);
    } else {
        throw new Error('page or themeComp must be set');
    }

    const LoadComp = loadable(() => importComp, {fallback: <Loading />});
    return <Route key={path} exact path={path} component={LoadComp} />;
};

const createNoMatchRoute = () => {
    const LoadNoMatchComp = loadable(() => import(`../themes/${theme}/pages/${routerConfig.noMatch.themePage}`), {fallback: <Loading />});
    return <Route component={LoadNoMatchComp} />;
};

const MainRoutes = ({match}) => {
    return <Switch>
        {routerConfig.routes.map(createRoute(match))}
        {createNoMatchRoute()}
    </Switch>;
};

const I18nRouter = ({comp}) => <Switch>
    <Redirect exact from="/" to={`/${i18next.language}`} />
    <Route path="/:lang" component={comp} />
</Switch>;

export default () => <I18nRouter comp={MainRoutes} />;
