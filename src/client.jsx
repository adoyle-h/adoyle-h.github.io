import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {hydrate} from 'react-dom';
import {loadableReady} from '@loadable/component';
import {Entry} from './entry';

loadableReady(() => hydrate(
    <BrowserRouter>
        <Entry />
    </BrowserRouter>,
    document.getElementById('root')
));

/* globals module:false */

if (module.hot) {
    module.hot.accept();
}
