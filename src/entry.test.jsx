import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import App from './app';

/* globals describe,test */

describe('<App />', () => {
    test('renders without exploding', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
            div
        );
    });
});
