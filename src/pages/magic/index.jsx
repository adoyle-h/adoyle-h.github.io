import React from 'react';
import styled from 'styled-components';

const BG = styled.div`
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
`;

const Info = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const map = {
    'doge': 'https://i.kym-cdn.com/entries/icons/original/000/013/564/doge.jpg',
    'nyancat': 'https://i.kym-cdn.com/photos/images/original/000/114/779/0002.gif',
};

export default ({location}) => {
    const name = location.pathname.slice(1);

    return <BG>
        <Info>
            <img alt={name} src={map[name]} />
        </Info>
    </BG>;
};
