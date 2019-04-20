import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {hydrate} from 'react-dom';
import {history} from 'src/engineering/hisotry';
import {Entry} from './entry';

hydrate(
    <BrowserRouter history={history} >
        <Entry />
    </BrowserRouter>,
    document.getElementById('root')
);

/* globals module:false */

if (module.hot) {
    module.hot.accept();
}
