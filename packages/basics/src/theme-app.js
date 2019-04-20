export class ThemeApp {
    models = {};

    async destroy() {
    }

    injectWindow() {
        if (typeof window === 'undefined') return;
        window.themeApp = this;
    }

    getUI() {
    }
}
