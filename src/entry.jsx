import React from 'react';
import {app} from 'app';
import 'src/i18n';
import Routers from './routers';
import Head from './components/head';
import LangBar from './components/language-bar';

const App = () => <div>
    <Head />
    <LangBar />
    <Routers />
</div>;

app.injectWindow();

export default App;
