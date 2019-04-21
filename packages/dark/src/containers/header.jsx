import React from 'react';
import styled from 'styled-components';
import siteConfig from 'src/site-config';

const BG = styled.div``;
const Title = styled.h1`
    color: white;
    margin: 0;
`;

export default <BG>
    <Title>
        { siteConfig.title }
    </Title>
</BG>;
