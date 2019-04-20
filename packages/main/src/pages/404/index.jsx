import React from 'react';
import styled from 'styled-components';
import siteConfig from 'src/site-config';
import {app} from 'app';

const {supportLanguages} = siteConfig;

const BG = styled.div`
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
`;

const Info = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    padding-top: 0;
`;

export default ({location}) => {
    const ts = app.getTS('404');
    const {pathname} = location;

    const found = supportLanguages.find((lang) => pathname.startsWith(`/${lang}`));
    let recommendLinks;
    if (found) {
        recommendLinks = [];
    } else {
        recommendLinks = supportLanguages
            .map((lang) => `/${lang}${pathname}`)
            .map((link) => <li key={link} >
                <a href={link}>{link}</a>
            </li>);
    }

    let RecommendLinks = null;
    if (recommendLinks.length > 0) {
        RecommendLinks = <p>
            Looking for these links?
            <ul>
                {recommendLinks}
            </ul>
        </p>;
    }

    return <BG>
        <Info>
            <h2>{ts('message')}</h2>
            <div>{ts('cur_path', {pathname})}</div>
        </Info>
        {RecommendLinks}
    </BG>;
};
