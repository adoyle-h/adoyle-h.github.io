import React from 'react';
import styled from 'styled-components';
import {app} from 'app';

const BG = styled.div``;

export default () => {
    const ts = app.getTS('home');

    return <BG>
        <h2>{ts('welcome')}</h2>

        <div>
            {ts('links')}
            <ul>
                <li>
                    <a href="/blog">{ts('blog')}</a>
                </li>
            </ul>
        </div>
    </BG>;
};
