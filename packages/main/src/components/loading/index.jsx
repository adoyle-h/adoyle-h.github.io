import React from 'react';
import styled from 'styled-components';
import {app} from 'app';
import {WhisperSpinner as Spinner} from 'react-spinners-kit';

const LoadingBG = styled.div`
    margin: 12px 0 20px 0;
`;

export default ({
    size = 30,
    color = '#FFF',
    frontColor = '#1182FF',
    backColor = '#68AFFF',
    loading = (app.status === 'loading'),
}) => <div>
    <Spinner
        size={size}
        color={color}
        frontColor={frontColor}
        backColor={backColor}
        loading={loading}
    />
    <LoadingBG>
        {app.t('component.loading.text')}
    </LoadingBG>
</div>;
