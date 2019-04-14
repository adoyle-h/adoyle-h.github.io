import React from 'react';
import siteConfig from 'src/site';
import {Helmet} from 'react-helmet';
// import {app} from 'app';

export default () => <Helmet>
    <html lang={siteConfig.language} />
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* <title itemProp="name" lang={siteConfig.language}>{app.t('site.title')}</title> */}
    <title itemProp="name" lang={siteConfig.language}>{siteConfig.title}</title>
    <link rel="canonical" href="http://mysite.com/example" />
</Helmet>;
