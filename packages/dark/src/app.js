import {ThemeApp} from '@adoyle.me/website-basics';

export class HackerApp extends ThemeApp {
    async getPage(name) {
        if (name === 'home') {
            return import('./pages/home');
        } else {
            throw new Error(`Invalid page name "${name}"`);
        }
    }

    getUI() {
    }
}

export const themeApp = new HackerApp();
