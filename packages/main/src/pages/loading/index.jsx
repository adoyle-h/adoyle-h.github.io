import React from 'react';
import Loading from 'components/loading';
import {Flex, Box} from 'rebass';

export default () => <Flex alignItems="center">
    <Box
        p={3}
        width={1 / 2}
    >
        <Loading />
    </Box>
</Flex>;
