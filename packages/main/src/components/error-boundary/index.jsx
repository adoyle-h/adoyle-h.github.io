import ErrorBoundary from 'react-error-boundary';
import React from 'react';
import styled from 'styled-components';

const BG = styled.div`
    padding: 0px 20px;
    max-width: 80%;
`;

const onError = (error, componentStack) => {
    // @TODO replace this console with logger
    /* eslint-disable no-console */
    console.error('Error Message: %s', error.message);
    console.error('Error Stack: %s', error.stack);
    console.error('Component Stack: %s', componentStack);
};

// eslint-disable-next-line react/prop-types
const MyErrorBoundary = ({componentStack, error}) => <BG>
    <h2>Unexpected Error Caught</h2>
    <p>
        <h3>Error Message:</h3>
        <pre>{error.message}</pre>
    </p>

    <p>
        <h3>Error Stack:</h3>
        <pre>{error.stack}</pre>
    </p>

    <p>
        <h3>Component Stack:</h3>
        <pre>{componentStack}</pre>
    </p>
</BG>;

// eslint-disable-next-line react/prop-types
export default ({children}) => <ErrorBoundary
    onError={onError}
    FallbackComponent={MyErrorBoundary}
>
    {children}
</ErrorBoundary>;
