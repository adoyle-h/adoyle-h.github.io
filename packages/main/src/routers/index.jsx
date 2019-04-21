import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import loadable from '@loadable/component';
import siteConfig from 'src/site-config';
import i18next from 'src/i18n/i18next';
import NoMatch from 'pages/404';
import PageLoading from 'pages/loading';
import {app} from 'app';
import routerConfig from './config.yaml';

const {supportLanguages} = siteConfig;

const createRoute = (match) => (config) => {
    const {page, themePage} = config;
    const path = match.path === '/' ? '/' : `${match.path}${config.path}`;

    let importComp;
    if (themePage) {
        importComp = app.themeApp.getPage(themePage);
    } else if (page) {
        /**
         * FML https://github.com/webpack/webpack/tree/HEAD@%7B2019-01-03T01:19:40Z%7D
         */
        importComp = import(`../pages/${page}`);
    } else {
        throw new Error('page or themeComp must be set');
    }

    const LoadComp = loadable(() => importComp, {fallback: <PageLoading />});
    return <Route key={path} exact path={path} component={LoadComp} />;
};

const MainRoutes = ({match}) => {
    return <Switch>
        {routerConfig.routes.map(createRoute(match))}
        <NoMatch />
    </Switch>;
};

const I18nRouter = ({comp}) => <Switch>
    <Redirect key="/" exact from="/" to={`/${i18next.language}`} />
    {supportLanguages.map((lang) => <Route key={`/${lang}`} path={`/${lang}`} component={comp} />)}
    <NoMatch />
</Switch>;

export default () => <I18nRouter comp={MainRoutes} />;
