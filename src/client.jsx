import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {hydrate} from 'react-dom';
import {Entry} from './entry';

hydrate(
    <BrowserRouter>
        <Entry />
    </BrowserRouter>,
    document.getElementById('root')
);

/* globals module:false */

if (module.hot) {
    module.hot.accept();
}
