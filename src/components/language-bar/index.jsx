import React from 'react';
import {app} from 'app';

export default () => {
    const ts = app.getTS('home');

    return <div>
        <button onClick={() => app.changeLanguage('en')}>
            {ts('button.en')}
        </button>

        <button onClick={() => app.changeLanguage('zh-CN')}>
            {ts('button.zhCN')}
        </button>
    </div>;
};
