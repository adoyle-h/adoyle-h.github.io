import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {Entry} from './entry';

/* globals describe,test */

describe('<App />', () => {
    test('renders without exploding', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <Entry />
            </MemoryRouter>,
            div
        );
    });
});
