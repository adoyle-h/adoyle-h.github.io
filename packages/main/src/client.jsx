import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {hydrate} from 'react-dom';
import {history} from 'libs/history';
import {app} from 'app';
import {Entry} from 'src/entry';

// const Entry = app.UI;
app.Entry = Entry;

hydrate(
    <BrowserRouter history={history}>
        <Entry />
    </BrowserRouter>,
    document.getElementById('root')
);

/* globals module:false */

if (module.hot) {
    module.hot.accept();
}
