import React from 'react';
import styled from 'styled-components';
import {app} from 'app';

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

export default () => {
    const ts = app.getTS('404');

    return <BG>
        <Info>
            <h2>{ts('message')}</h2>
            <div>{ts('cur_path', {pathname: window.location.pathname})}</div>
        </Info>
    </BG>;
};
