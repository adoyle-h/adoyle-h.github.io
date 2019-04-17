import {app} from './app';

export class ThemeApp {
    app = app;
    models = {};

    injectWindow() {
        if (typeof window === 'undefined') return;
        window.themeApp = this;
    }
}
