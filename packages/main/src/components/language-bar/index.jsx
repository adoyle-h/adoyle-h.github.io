import React from 'react';
import {app} from 'app';

export default () => {
    return <div>
        <button type="button" onClick={() => app.changeLanguage('en')}>
            English
        </button>

        <button type="button" onClick={() => app.changeLanguage('zh-CN')}>
            中文
        </button>
    </div>;
};
